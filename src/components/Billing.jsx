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
  const [showReceipt, setShowReceipt] = useState(true); // State to control receipt visibility
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
    <div className="p-4 md:p-8 bg-gradient-to-b from-purple-50 to-purple-100">
      <h2 className="text-2xl font-bold mb-4 text-purple-700 animate-pulse">Billing</h2>
      <input
        type="text"
        name="name"
        placeholder="Customer Name"
        value={customerData.name}
        onChange={handleChange}
        className="border p-2 mb-2 w-full md:w-1/2 rounded-lg focus:ring-2 focus:ring-purple-300 transition"
      />
      <input
        type="text"
        name="phone"
        placeholder="Customer Phone"
        value={customerData.phone}
        onChange={handleChange}
        className="border p-2 mb-2 w-full md:w-1/2 rounded-lg focus:ring-2 focus:ring-purple-300 transition"
      />

      <h3 className="text-lg font-semibold mt-4 text-purple-700">Add Products</h3>
      <input
        type="text"
        placeholder="Product Name"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        className="border p-2 mb-2 w-full md:w-1/3 rounded-lg focus:ring-2 focus:ring-purple-300 transition"
      />
      <input
        type="number"
        placeholder="Product Price"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        className="border p-2 mb-2 w-full md:w-1/3 rounded-lg focus:ring-2 focus:ring-purple-300 transition"
      />
      <input
        type="number"
        placeholder="Quantity"
        value={newProduct.quantity}
        onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
        className="border p-2 mb-2 w-full md:w-1/3 rounded-lg focus:ring-2 focus:ring-purple-300 transition"
      />
      <button
        onClick={handleAddProduct}
        className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded mt-2 transition-transform transform hover:scale-105 animate-bounce"
      >
        Add Product
      </button>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-purple-700">Total Bill Amount: ₹{customerData.totalAmount}</h3>
        <input
          type="number"
          name="paidAmount"
          placeholder="Paid Amount"
          value={customerData.paidAmount}
          onChange={handleChange}
          className="border p-2 mb-2 w-full md:w-1/2 rounded-lg focus:ring-2 focus:ring-purple-300 transition"
        />
        <button
          onClick={handleGenerateBill}
          className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded mt-2 transition-transform transform hover:scale-105"
        >
          Generate Bill
        </button>
        </div>

<div className="flex flex-col sm:flex-row gap-4 mt-4">
  <button
    onClick={handleViewData}
    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition-transform transform hover:scale-105 w-full sm:w-auto"
  >
    View Data
  </button>
  <button
    onClick={handleDownloadExcel}
    className="bg-green-500 hover:bg-green-600 text-white p-2 rounded transition-transform transform hover:scale-105 w-full sm:w-auto"
  >
    Download Data
  </button>
</div>

{showModal && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg max-w-lg w-full">
      <h3 className="text-lg font-bold mb-2">Customer Data</h3>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="border p-2 mb-2 w-full rounded-lg focus:ring-2 focus:ring-purple-300 transition"
      />
     <div className="overflow-x-auto">
  <table className="min-w-full border-collapse border border-gray-200">
    <thead>
      <tr className="bg-purple-100">
        <th className="border border-gray-300 p-2 text-xs sm:text-sm">Name</th>
        <th className="border border-gray-300 p-2 text-xs sm:text-sm">Phone</th>
        <th className="border border-gray-300 p-2 text-xs sm:text-sm">Total Amount</th>
        <th className="border border-gray-300 p-2 text-xs sm:text-sm">Pending Amount</th>
        <th className="border border-gray-300 p-2 text-xs sm:text-sm">Actions</th>
      </tr>
    </thead>
    <tbody>
      {filteredData.map((data, index) => (
        <tr key={index} className="hover:bg-gray-100">
          <td className="border border-gray-300 p-2 text-xs sm:text-sm">{data.name}</td>
          <td className="border border-gray-300 p-2 text-xs sm:text-sm">{data.phone}</td>
          <td className="border border-gray-300 p-2 text-xs sm:text-sm">₹{data.totalAmount}</td>
          <td className="border border-gray-300 p-2 text-xs sm:text-sm">₹{data.pendingAmount}</td>
          <td className="border border-gray-300 p-2 text-xs sm:text-sm">
            <button
              onClick={() => handleDeleteData(data.phone)}
              className="text-red-500 hover:text-red-600 mr-2 text-xs sm:text-sm"
            >
              Delete
            </button>
            <button
              onClick={() => handleResendWhatsApp(data)}
              className="text-blue-500 hover:text-blue-600 text-xs sm:text-sm"
            >
              Resend
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      <button onClick={closeModal} className="mt-4 bg-gray-400 hover:bg-gray-500 text-white p-2 rounded">Close</button>
    </div>
  </div>
)}

{showReceipt && (
  <div ref={receiptRef} className="p-4 mt-4 bg-white border rounded shadow-md">
    <h3 className="text-lg font-bold mb-2">Receipt</h3>
    <p>Name: {customerData.name}</p>
    <p>Phone: {customerData.phone}</p>
    <p>Total Amount: ₹{customerData.totalAmount}</p>
    <p>Paid Amount: ₹{customerData.paidAmount}</p>
    <p>Pending Amount: ₹{Math.max(0, customerData.totalAmount - customerData.paidAmount)}</p>
    <h4 className="font-semibold mt-2">Products:</h4>
    <ul>
      {customerData.products.map((product, index) => (
        <li key={index}>{product.name} - ₹{product.price} x {product.quantity}</li>
      ))}
    </ul>
    <button onClick={handlePrintReceipt} className="mt-4 bg-gray-600 hover:bg-gray-700 text-white p-2 rounded">Print Receipt</button>
  </div>
)}

{showPaymentReview && <PaymentReview totalEarnings={todayEarnings} totalPending={todayPending} closeReview={() => setShowPaymentReview(false)} />}
</div>

  );
};

export default Billing;
