import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CustomerManagement from './components/CustomerManagement';
import SalesPipeline from './components/SalesPipeline';
import TaskManagement from './components/TaskManagement';
import Billing from './components/Billing';
import PaymentReview from './components/PaymentReview';

const App = () => {
  return (
    <Router>
      <div className="p-4">
        <nav className="mb-4">
          <Link className="mr-4 text-blue-500" to="/">Customer Management</Link>
          <Link className="mr-4 text-blue-500" to="/pipeline">Sales Pipeline</Link>
          <Link className="mr-4 text-blue-500" to="/tasks">Task Management</Link>
          <Link className="mr-4 text-blue-500" to="/bill">Billing</Link>
          <Link className="mr-4 text-blue-500" to="/payment">Payment Review</Link>
        </nav>
        <Routes>
          <Route path="/" element={<CustomerManagement />} />
          <Route path="/pipeline" element={<SalesPipeline />} />
          <Route path="/tasks" element={<TaskManagement />} />
          <Route path="/bill" element={<Billing/>}/>
          <Route path="/lone" element={<PaymentReview/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
