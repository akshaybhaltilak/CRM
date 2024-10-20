import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Billing from './components/Billing';
import PaymentReview from './components/PaymentReview';
import WhatsAppReminder from './components/WhatsAppReminder';


const App = () => {
  return (
    <Router>
      <div className="p-4">
        <nav className="mb-4">
          
          <Link className="mr-4 text-blue-500" to="/">Billing</Link>
          <Link className="mr-4 text-blue-500" to="/payment">PaymentReview</Link>
          <Link className="mr-4 text-blue-500" to="/whatsapp">WhatsAppReminder</Link>
          
        </nav>
        <Routes>
          
          <Route path="/" element={<Billing/>}/>

          <Route path="/payment" element={<PaymentReview/>}/>
          <Route path="/whatsapp" element={<WhatsAppReminder/>}/>
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
