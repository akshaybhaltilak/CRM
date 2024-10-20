import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Billing from './components/Billing';
import PaymentReview from './components/PaymentReview';
import WhatsAppReminder from './components/WhatsAppReminder';
import Footer from './components/Footer'; // Import the Footer component

const App = () => {
  return (
    <Router>
      <div className="min-h-screen p-4 bg-gray-100 flex flex-col">
        
        {/* Navbar */}
        <nav className="mb-4 bg-white shadow-md rounded-lg p-4 flex justify-center items-center">
          <h1 className="text-xl font-bold text-blue-600 mr-8">My App</h1>
          <div className="flex space-x-4">
            <Link
              className="text-blue-500 hover:text-blue-700 transition-colors duration-300 transform hover:scale-105"
              to="/"
            >
              Billing
            </Link>
            <Link
              className="text-blue-500 hover:text-blue-700 transition-colors duration-300 transform hover:scale-105"
              to="/payment"
            >
              Payment Review
            </Link>
            <Link
              className="text-blue-500 hover:text-blue-700 transition-colors duration-300 transform hover:scale-105"
              to="/whatsapp"
            >
              WhatsApp Reminder
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center">
          <Routes>
            <Route path="/" element={<Billing />} />
            <Route path="/payment" element={<PaymentReview />} />
            <Route path="/whatsapp" element={<WhatsAppReminder />} />
          </Routes>
        </div>

        {/* Footer (always visible) */}
        <Footer /> {/* Ensure the footer is outside the Routes */}
        
      </div>
    </Router>
  );
};

export default App;
