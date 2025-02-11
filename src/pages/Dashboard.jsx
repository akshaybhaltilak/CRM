import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Construction CRM Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          to="/projects"
          className="p-4 bg-blue-500 text-white text-center rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Manage Projects
        </Link>
        <Link
          to="/workers"
          className="p-4 bg-green-500 text-white text-center rounded-lg shadow-md hover:bg-green-600 transition"
        >
          Manage Workers
        </Link>
        <Link
          to="/materials"
          className="p-4 bg-yellow-500 text-white text-center rounded-lg shadow-md hover:bg-yellow-600 transition"
        >
          Manage Materials
        </Link>
        <Link
          to="/payments"
          className="p-4 bg-red-500 text-white text-center rounded-lg shadow-md hover:bg-red-600 transition"
        >
          Manage Payments
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
