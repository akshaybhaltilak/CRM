import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Workers from './pages/Workers';
import Materials from './pages/Materials';
import Payments from './pages/Payments';
import New from './pages/New';
import { Home } from 'lucide-react';

const App = () => {
  return (
    <Router>
        

      
      <Routes>
      <Route path="/" element={<New />} />


      <Route path="/dashboard/:projectId" element={<Dashboard />} /> 
        <Route path="/projects" element={<Projects />} />
        <Route path="/workers" element={<Workers />} />
        <Route path="/materials" element={<Materials />} />
        <Route path="/payments" element={<Payments />} />
      </Routes>
    </Router>
  );
};

export default App;