import React, { useState, useEffect } from 'react';

const WhatsAppReminder = () => {
  const [customerData, setCustomerData] = useState([]); // State to hold customer data
  const [selectedCustomers, setSelectedCustomers] = useState([]); // State to hold selected customers
  const [messageType, setMessageType] = useState('wishes'); // State to hold message type
  const [customMessage, setCustomMessage] = useState(''); // State to hold custom message

  // Fetch data from localStorage on component load
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('customerBillingData')) || [];
    setCustomerData(storedData);
  }, []);

  // Handle selecting/deselecting customers
  const handleCustomerSelection = (customer) => {
    if (selectedCustomers.includes(customer)) {
      setSelectedCustomers(selectedCustomers.filter((c) => c !== customer));
    } else {
      setSelectedCustomers([...selectedCustomers, customer]);
    }
  };

  // Generate WhatsApp message link based on message type
  const generateWhatsAppLink = (customer) => {
    const { phone, name, pendingAmount } = customer;
    let message = '';

    if (messageType === 'wishes') {
      message = `Hello ${name}, sending you warm wishes!`;
    } else if (messageType === 'payment') {
      message = `Dear ${name}, kindly note that your pending payment of ₹${pendingAmount} is due. Please make the payment at your earliest convenience.`;
    } else {
      message = customMessage;
    }

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  // Send bulk WhatsApp messages
  const sendBulkMessages = () => {
    selectedCustomers.forEach((customer) => {
      const link = generateWhatsAppLink(customer);
      window.open(link, '_blank');
    });
  };

  return (
    <div className="p-4 md:p-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 animate-pulse">
        WhatsApp Reminder
      </h2>

      {/* Select Message Type */}
      <div className="mb-4">
        <label className="block text-lg font-semibold">Select Message Type:</label>
        <select
          value={messageType}
          onChange={(e) => setMessageType(e.target.value)}
          className="w-full mt-2 p-2 rounded-md text-black"
        >
          <option value="wishes">Wishes</option>
          <option value="payment">Pending Payment Reminder</option>
          <option value="custom">Custom Message</option>
        </select>
      </div>

      {/* Custom Message Textarea */}
      {messageType === 'custom' && (
        <div className="mb-4">
          <label className="block text-lg font-semibold">Custom Message:</label>
          <textarea
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            className="w-full mt-2 p-2 rounded-md text-black"
            placeholder="Type your custom message here..."
          />
        </div>
      )}

      {/* Customer Selection */}
      <h3 className="text-lg font-semibold mb-2">Select Customers:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {customerData.map((customer, index) => (
          <div
            key={index}
            className={`p-4 bg-white bg-opacity-10 rounded-lg shadow-md hover:bg-opacity-20 transition-all duration-300 ease-in-out cursor-pointer ${
              selectedCustomers.includes(customer) ? 'bg-green-300 text-black' : ''
            }`}
            onClick={() => handleCustomerSelection(customer)}
          >
            <p><strong>{customer.name}</strong></p>
            <p>Contact: {customer.phone}</p>
            {messageType === 'payment' && <p>Pending Amount: ₹{customer.pendingAmount}</p>}
          </div>
        ))}
      </div>

      {/* Bulk Message Section */}
      <div className="mt-6 text-center">
        {selectedCustomers.map((customer, index) => (
          <a
            key={index}
            href={generateWhatsAppLink(customer)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 mx-2 px-4 py-2 bg-green-500 hover:bg-green-700 rounded-full text-white transition-colors duration-300"
          >
            Send to {customer.name}
          </a>
        ))}

        {/* Send Bulk Message Button */}
        {selectedCustomers.length > 0 && (
          <button
            onClick={sendBulkMessages}
            className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-700 rounded-full text-white transition-colors duration-300"
          >
            Send Bulk Message
          </button>
        )}
      </div>
    </div>
  );
};

export default WhatsAppReminder;
