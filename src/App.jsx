import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Workers from './pages/Workers';
import Materials from './pages/Materials';
import Payments from './pages/Payments';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/workers" element={<Workers />} />
        <Route path="/materials" element={<Materials />} />
        <Route path="/payments" element={<Payments />} />
      </Routes>
    </Router>
  );
};

export default App;