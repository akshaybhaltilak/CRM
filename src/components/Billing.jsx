import React, { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';
import PaymentReview from './PaymentReview'; // Import the PaymentReview component

const Billing = () => {
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    totalAmount: 0,
    paidAmount: 0,
    products: [], // Array to hold products purchased by the customer
  });

  const [showModal, setShowModal] = useState(false);
  const [todayEarnings, setTodayEarnings] = useState(0);
  const [todayPending, setTodayPending] = useState(0);
  const [showPaymentReview, setShowPaymentReview] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false); // State to control receipt visibility
  const receiptRef = useRef(); // Reference for printing

  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [filteredData, setFilteredData] = useState([]); // State for filtered data
  const [newProduct, setNewProduct] = useState({ name: '', price: '', quantity: 1 }); // State for new product with quantity

  useEffect(() => {
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

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.quantity) {
      alert('Please enter product name, price, and quantity.');
      return;
    }

    const updatedProducts = [...customerData.products, newProduct];
    const updatedTotalAmount = updatedProducts.reduce(
      (sum, product) => sum + parseFloat(product.price) * product.quantity,
      0
    );

    setCustomerData({ 
      ...customerData, 
      products: updatedProducts,
      totalAmount: updatedTotalAmount,
    });
    setNewProduct({ name: '', price: '', quantity: 1 }); // Reset new product input
  };

  const handleGenerateBill = () => {
    const { name, phone, totalAmount, paidAmount, products } = customerData;

    if (!name || !phone || products.length === 0) {
      alert('Please fill in all fields and add at least one product before generating a bill.');
      return;
    }

    const pendingAmount = Math.max(0, totalAmount - paidAmount);
    const billData = { ...customerData, pendingAmount, date: new Date().toLocaleDateString() };

    let existingData = JSON.parse(localStorage.getItem('customerBillingData')) || [];
    
    const existingCustomerIndex = existingData.findIndex(data => data.phone === phone);
    
    if (existingCustomerIndex !== -1) {
      existingData[existingCustomerIndex] = { ...existingData[existingCustomerIndex], ...billData };
    } else {
      existingData.push(billData);
    }
    
    localStorage.setItem('customerBillingData', JSON.stringify(existingData));
    alert('Bill generated successfully!');
    setCustomerData({ name: '', phone: '', totalAmount: 0, paidAmount: 0, products: [] });

    const today = new Date().toLocaleDateString();
    if (billData.date === today) {
      setTodayEarnings(todayEarnings + parseFloat(billData.paidAmount));
      setTodayPending(todayPending + pendingAmount);
    }

    handleSendWhatsApp();
    setShowReceipt(true);
  };

  const handleSendWhatsApp = () => {
    const message = `Thank you for shopping, ${customerData.name}! Your total bill is ₹${customerData.totalAmount}, and you've paid ₹${customerData.paidAmount}.`;
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
    setSearchTerm('');
    setFilteredData(JSON.parse(localStorage.getItem('customerBillingData')) || []);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const existingData = JSON.parse(localStorage.getItem('customerBillingData')) || [];
    
    const filtered = existingData.filter(data =>
      data.name.toLowerCase().includes(value.toLowerCase()) ||
      data.phone.includes(value)
    );
    setFilteredData(filtered);
  };

  const handlePrintReceipt = () => {
    window.print(); 
  };

  const handleDeleteData = (phone) => {
    const existingData = JSON.parse(localStorage.getItem('customerBillingData')) || [];
    const updatedData = existingData.filter(data => data.phone !== phone);
    localStorage.setItem('customerBillingData', JSON.stringify(updatedData));
    setFilteredData(updatedData);
    alert('Customer data deleted successfully.');
  };

  const handleResendWhatsApp = (data) => {
    const message = `Hello ${data.name}, this is a reminder of your pending payment of ₹${data.pendingAmount}. Thank you!`;
    const whatsappURL = `https://wa.me/${data.phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Billing</h2>
      <input
        type="text"
        name="name"
        placeholder="Customer Name"
        value={customerData.name}
        onChange={handleChange}
        className="border p-2 mb-2 w-full md:w-1/2"
      />
      <input
        type="text"
        name="phone"
        placeholder="Customer Phone"
        value={customerData.phone}
        onChange={handleChange}
        className="border p-2 mb-2 w-full md:w-1/2"
      />

      <h3 className="text-lg font-semibold mt-4 text-blue-700">Add Products</h3>
      <input
        type="text"
        placeholder="Product Name"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        className="border p-2 mb-2 w-full md:w-1/3"
      />
      <input
        type="number"
        placeholder="Product Price"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        className="border p-2 mb-2 w-full md:w-1/3"
      />
      <input
        type="number"
        placeholder="Quantity"
        value={newProduct.quantity}
        onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
        className="border p-2 mb-2 w-full md:w-1/3"
      />
      <button
        onClick={handleAddProduct}
        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded mt-2"
      >
        Add Product
      </button>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-blue-700">Total Bill Amount: ₹{customerData.totalAmount}</h3>
        <input
          type="number"
          name="paidAmount"
          placeholder="Paid Amount"
          value={customerData.paidAmount}
          onChange={handleChange}
          className="border p-2 mb-2 w-full md:w-1/3"
        />
      </div>

      <button
        onClick={handleGenerateBill}
        className="bg-green-600 hover:bg-green-700 text-white p-2 rounded mt-4"
      >
        Generate Bill
      </button>
      <button
        onClick={handleViewData}
        className="bg-yellow-600 hover:bg-yellow-700 text-white p-2 rounded mt-4 ml-4"
      >
        View & Download Data
      </button>

      {showReceipt && (
        <div ref={receiptRef} className="mt-8 border p-4 w-full md:w-2/3">
          <h2 className="text-xl font-bold">Receipt</h2>
          <p>Customer Name: {customerData.name}</p>
          <p>Phone: {customerData.phone}</p>
          <p>Total Amount: ₹{customerData.totalAmount}</p>
          <p>Paid Amount: ₹{customerData.paidAmount}</p>
          <button onClick={handlePrintReceipt} className="bg-blue-600 text-white p-2 rounded mt-4">Print Receipt</button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg w-3/4">
            <h2 className="text-xl font-bold mb-4">Customer Billing Data</h2>
            <input
              type="text"
              placeholder="Search by name or phone"
              value={searchTerm}
              onChange={handleSearch}
              className="border p-2 w-full mb-4"
            />
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Phone</th>
                  <th className="border p-2">Total Amount</th>
                  <th className="border p-2">Paid Amount</th>
                  <th className="border p-2">Pending Amount</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((data, index) => (
                  <tr key={index}>
                    <td className="border p-2">{data.name}</td>
                    <td className="border p-2">{data.phone}</td>
                    <td className="border p-2">₹{data.totalAmount}</td>
                    <td className="border p-2">₹{data.paidAmount}</td>
                    <td className="border p-2">₹{data.pendingAmount}</td>
                    <td className="border p-2">
                      <button
                        onClick={() => handleResendWhatsApp(data)}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded mr-2"
                      >
                        Resend WhatsApp
                      </button>
                      <button
                        onClick={() => handleDeleteData(data.phone)}
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4">
              <button onClick={closeModal} className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded mr-4">
                Close
              </button>
              <button onClick={handleDownloadExcel} className="bg-green-600 hover:bg-green-700 text-white p-2 rounded">
                Download Excel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billing;
