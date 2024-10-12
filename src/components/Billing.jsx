import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import PaymentReview from './PaymentReview'; // Import the PaymentReview component

const Billing = () => {
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    totalAmount: '',
    paidAmount: '',
    products: [], // Array to hold products purchased by the customer
  });

  const [showModal, setShowModal] = useState(false);
  const [todayEarnings, setTodayEarnings] = useState(0);
  const [todayPending, setTodayPending] = useState(0);
  const [showPaymentReview, setShowPaymentReview] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [filteredData, setFilteredData] = useState([]); // State for filtered data
  const [newProduct, setNewProduct] = useState({ name: '', price: '' }); // State for new product

  useEffect(() => {
    // Calculate today's earnings and pending amounts when the component mounts
    const calculateTodayAmounts = () => {
      const existingData = JSON.parse(localStorage.getItem('customerBillingData')) || [];
      const today = new Date().toLocaleDateString();

      const todayData = existingData.filter(data => data.date === today);
      const earnings = todayData.reduce((total, data) => total + (parseFloat(data.paidAmount) || 0), 0);
      const pending = todayData.reduce((total, data) => total + (parseFloat(data.pendingAmount) || 0), 0);

      setTodayEarnings(earnings);
      setTodayPending(pending);
    };

    calculateTodayAmounts();
  }, []);

  const handleChange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  const handleGenerateBill = () => {
    const { name, phone, totalAmount, paidAmount, products } = customerData;

    if (!name || !phone || !totalAmount || !paidAmount || products.length === 0) {
      alert('Please fill in all fields and add at least one product before generating a bill.');
      return;
    }

    const pendingAmount = Math.max(0, totalAmount - paidAmount);
    const billData = { ...customerData, pendingAmount, date: new Date().toLocaleDateString() };

    let existingData = JSON.parse(localStorage.getItem('customerBillingData')) || [];
    
    // Check if customer already exists
    const existingCustomerIndex = existingData.findIndex(data => data.phone === phone);
    
    if (existingCustomerIndex !== -1) {
      // Update existing customer data
      existingData[existingCustomerIndex] = { ...existingData[existingCustomerIndex], ...billData };
    } else {
      // Add new customer data
      existingData.push(billData);
    }
    
    localStorage.setItem('customerBillingData', JSON.stringify(existingData));
    alert('Bill generated successfully!');
    setCustomerData({ name: '', phone: '', totalAmount: '', paidAmount: '', products: [] });
    setNewProduct({ name: '', price: '' }); // Reset new product

    // Recalculate today's amounts after generating a bill
    const today = new Date().toLocaleDateString();
    if (billData.date === today) {
      setTodayEarnings(todayEarnings + parseFloat(billData.paidAmount));
      setTodayPending(todayPending + pendingAmount);
    }
  };

  const handleSendWhatsApp = () => {
    const message = `Thank you for shopping, ${customerData.name}! Your total bill is ₹${customerData.totalAmount}.`;
    const whatsappURL = `https://wa.me/${customerData.phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  const handleViewData = () => {
    setShowModal(true);
    const existingData = JSON.parse(localStorage.getItem('customerBillingData')) || [];
    setFilteredData(existingData); // Initialize filtered data
  };

  const handleDownloadExcel = () => {
    const billData = JSON.parse(localStorage.getItem('customerBillingData'));
    const ws = XLSX.utils.json_to_sheet(billData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Billing Data');
    XLSX.writeFile(wb, 'customer_billing_data.xlsx');
  };

  const closeModal = () => {
    setShowModal(false);
    setSearchTerm(''); // Clear search term when modal closes
    setFilteredData(JSON.parse(localStorage.getItem('customerBillingData')) || []); // Reset filtered data
  };

  const togglePaymentReview = () => {
    setShowPaymentReview(!showPaymentReview);
  };

  // Calculate the total amount (cash earnings + pending amount)
  const totalAmount = todayEarnings + todayPending;

  const handleDeleteCustomerData = (index) => {
    const existingData = JSON.parse(localStorage.getItem('customerBillingData')) || [];
    existingData.splice(index, 1);
    localStorage.setItem('customerBillingData', JSON.stringify(existingData));
    alert('Customer data deleted successfully!');
    // Recalculate today's amounts
    calculateTodayAmounts(); // Recalculate amounts to update today's earnings and pending
    // Update filtered data
    setFilteredData(existingData);
  };

  // Function to filter customer data based on search term
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const existingData = JSON.parse(localStorage.getItem('customerBillingData')) || [];
    
    // Filter data based on name or phone
    const filtered = existingData.filter(data =>
      data.name.toLowerCase().includes(value.toLowerCase()) ||
      data.phone.includes(value)
    );
    setFilteredData(filtered);
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      alert('Please enter both product name and price.');
      return;
    }

    const updatedProducts = [...customerData.products, newProduct];
    setCustomerData({ ...customerData, products: updatedProducts });
    setNewProduct({ name: '', price: '' }); // Reset new product input
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Billing</h2>
      <input
        type="text"
        name="name"
        placeholder="Customer Name"
        value={customerData.name}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="text"
        name="phone"
        placeholder="Customer Phone"
        value={customerData.phone}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="number"
        name="totalAmount"
        placeholder="Total Amount"
        value={customerData.totalAmount}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="number"
        name="paidAmount"
        placeholder="Paid Amount"
        value={customerData.paidAmount}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
      />

      {/* New Product Input Fields */}
      <h3 className="text-lg font-semibold mt-4">Add Products</h3>
      <input
        type="text"
        placeholder="Product Name"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="number"
        placeholder="Product Price"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        className="border p-2 mb-2 w-full"
      />
      <button
        onClick={handleAddProduct}
        className="bg-blue-500 text-white p-2 rounded mt-2"
      >
        Add Product
      </button>

      <button
        onClick={handleGenerateBill}
        className="bg-blue-500 text-white p-2 rounded mt-2 mr-2"
      >
        Generate Bill
      </button>
      <button
        onClick={handleSendWhatsApp}
        className="bg-green-500 text-white p-2 rounded mt-2"
      >
        Send WhatsApp Message
      </button>
      <button
        onClick={handleViewData}
        className="bg-yellow-500 text-white p-2 rounded mt-2 ml-2"
      >
        View and Download Data
      </button>

      {/* Earnings, Pending, and Total Amount Sections */}
      <div className="mt-4">
        <h3 className="text-xl font-semibold">Today's Cash Earnings</h3>
        <p className="text-lg">₹{todayEarnings}</p>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold">Today's Pending Amount</h3>
        <p className="text-lg">₹{todayPending}</p>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold">Total Amount</h3>
        <p className="text-lg">₹{totalAmount}</p>
      </div>

      {/* View Data Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-md w-1/2">
            <h2 className="text-2xl font-bold mb-2">Customer Billing Data</h2>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="border p-2 mb-2 w-full"
            />
            <table className="table-auto w-full mb-2">
              <thead>
                <tr>
                  <th className="border">Name</th>
                  <th className="border">Phone</th>
                  <th className="border">Total Amount</th>
                  <th className="border">Paid Amount</th>
                  <th className="border">Pending Amount</th>
                  <th className="border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((data, index) => (
                  <tr key={index}>
                    <td className="border">{data.name}</td>
                    <td className="border">{data.phone}</td>
                    <td className="border">{data.totalAmount}</td>
                    <td className="border">{data.paidAmount}</td>
                    <td className="border">{data.pendingAmount}</td>
                    <td className="border">
                      <button
                        onClick={() => handleDeleteCustomerData(index)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={handleDownloadExcel} className="bg-blue-500 text-white p-2 rounded mt-2">
              Download Excel
            </button>
            <button onClick={closeModal} className="bg-gray-500 text-white p-2 rounded mt-2 ml-2">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Payment Review Section */}
      {showPaymentReview && (
        <PaymentReview 
          togglePaymentReview={togglePaymentReview} 
          todayEarnings={todayEarnings} 
          todayPending={todayPending} 
          totalAmount={totalAmount} 
        />
      )}
    </div>
  );
};

export default Billing;
