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
      totalAmount: updatedTotalAmount, // Automatically calculate the total bill amount
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
    setCustomerData({ name: '', phone: '', totalAmount: 0, paidAmount: 0, products: [] });

    // Recalculate today's amounts after generating a bill
    const today = new Date().toLocaleDateString();
    if (billData.date === today) {
      setTodayEarnings(todayEarnings + parseFloat(billData.paidAmount));
      setTodayPending(todayPending + pendingAmount);
    }

    handleSendWhatsApp(); // Automatically send WhatsApp message
    setShowReceipt(true); // Show receipt after generating the bill
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
    setSearchTerm(''); // Clear search term when modal closes
    setFilteredData(JSON.parse(localStorage.getItem('customerBillingData')) || []); // Reset filtered data
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

  // Function to print the receipt
  const handlePrintReceipt = () => {
    window.print(); // Opens the browser's print dialog
  };

  // Function to delete customer data
  const handleDeleteData = (phone) => {
    const existingData = JSON.parse(localStorage.getItem('customerBillingData')) || [];
    const updatedData = existingData.filter(data => data.phone !== phone);
    localStorage.setItem('customerBillingData', JSON.stringify(updatedData));
    setFilteredData(updatedData); // Update filtered data
    alert('Customer data deleted successfully.');
  };

  // Function to resend WhatsApp message
  const handleResendWhatsApp = (data) => {
    const message = `Hello ${data.name}, this is a reminder of your pending payment of ₹${data.pendingAmount}. Thank you!`;
    const whatsappURL = `https://wa.me/${data.phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Billing</h2>
      {/* Form for customer and products */}
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

      {/* Product Input Fields */}
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
      <input
        type="number"
        placeholder="Quantity"
        value={newProduct.quantity}
        onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
        className="border p-2 mb-2 w-full"
      />
      <button
        onClick={handleAddProduct}
        className="bg-blue-500 text-white p-2 rounded mt-2"
      >
        Add Product
      </button>

      {/* Display Total Amount */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Total Bill Amount: ₹{customerData.totalAmount}</h3>
        <input
          type="number"
          name="paidAmount"
          placeholder="Paid Amount"
          value={customerData.paidAmount}
          onChange={handleChange}
          className="border p-2 mb-2 w-full"
        />
      </div>

      {/* Buttons for generating bill and viewing data */}
      <button
        onClick={handleGenerateBill}
        className="bg-green-500 text-white p-2 rounded mt-4"
      >
        Generate Bill
      </button>
      <button
        onClick={handleViewData}
        className="bg-gray-500 text-white p-2 rounded ml-4 mt-4"
      >
        View and Download Data
      </button>

      {/* Payment Review Section */}
      {showPaymentReview && (
        <PaymentReview
          todayEarnings={todayEarnings}
          todayPending={todayPending}
          onClose={() => setShowPaymentReview(false)}
        />
      )}

      {/* Receipt for Printing */}
      {showReceipt && (
        <div ref={receiptRef} className="mt-8 border p-4">
          <h3 className="text-lg font-semibold">Receipt</h3>
          <p>Customer Name: {customerData.name}</p>
          <p>Phone: {customerData.phone}</p>
          <p>Total Amount: ₹{customerData.totalAmount}</p>
          <p>Paid Amount: ₹{customerData.paidAmount}</p>
          <p>Pending Amount: ₹{Math.max(0, customerData.totalAmount - customerData.paidAmount)}</p>
          <h4 className="text-lg font-semibold">Products:</h4>
          <ul>
            {customerData.products.map((product, index) => (
              <li key={index}>
                {product.name} - ₹{product.price} x {product.quantity}
              </li>
            ))}
          </ul>
          <button onClick={handlePrintReceipt} className="bg-blue-500 text-white p-2 rounded mt-4">
            Print Receipt
          </button>
        </div>
      )}

      {/* Modal for Viewing Data */}
      {showModal && (
        <div className="modal bg-gray-200 p-4">
          <div className="modal-content bg-white p-6 rounded">
            <h3 className="text-lg font-semibold">Customer Billing Data</h3>
            <input
              type="text"
              placeholder="Search by Name or Phone"
              value={searchTerm}
              onChange={handleSearch}
              className="border p-2 mb-4 w-full"
            />
            <table className="w-full border">
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
                        onClick={() => handleDeleteData(data.phone)}
                        className="bg-red-500 text-white p-2 rounded"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleResendWhatsApp(data)}
                        className="bg-green-500 text-white p-2 rounded ml-2"
                      >
                        Resend WhatsApp
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={handleDownloadExcel} className="bg-blue-500 text-white p-2 rounded mt-4">
              Download Excel
            </button>
            <button onClick={closeModal} className="bg-gray-500 text-white p-2 rounded mt-4 ml-4">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billing;
