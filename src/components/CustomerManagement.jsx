import React, { useState } from 'react';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const addCustomer = () => {
    setCustomers([...customers, newCustomer]);
    setNewCustomer({ name: '', email: '', phone: '' });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Customer Management</h2>
      <input
        className="border p-2 mb-2 w-full"
        type="text"
        placeholder="Name"
        value={newCustomer.name}
        onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
      />
      <input
        className="border p-2 mb-2 w-full"
        type="email"
        placeholder="Email"
        value={newCustomer.email}
        onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
      />
      <input
        className="border p-2 mb-2 w-full"
        type="text"
        placeholder="Phone"
        value={newCustomer.phone}
        onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
      />
      <button className="bg-blue-500 text-white p-2 rounded" onClick={addCustomer}>
        Add Customer
      </button>

      <ul className="mt-4">
        {customers.map((customer, index) => (
          <li key={index} className="border p-2 mb-2">
            {customer.name} - {customer.email} - {customer.phone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerManagement;
