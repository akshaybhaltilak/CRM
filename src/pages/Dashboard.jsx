import React from "react";
import { Link } from "react-router-dom";
import { 
  Building2, 
  Hammer, 
  Package, 
  Wallet, 
  Users, 
  CalendarClock, 
  LineChart, 
  Settings
} from "lucide-react";

const Dashboard = () => {
  // Sample data for quick stats
  const stats = [
    { id: 1, label: "Active Projects", value: "12", change: "+2", color: "blue" },
    { id: 2, label: "Workers Assigned", value: "48", change: "+5", color: "green" },
    { id: 3, label: "Material Orders", value: "28", change: "-3", color: "amber" },
    { id: 4, label: "Revenue This Month", value: "$128,450", change: "+8%", color: "emerald" },
  ];
  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with welcome message */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 shadow-md">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white">Construction CRM Dashboard</h1>
          <p className="text-blue-100 mt-2">Welcome back! Here's what's happening today.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Quick Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.id} className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-blue-500 hover:shadow-md transition">
              <h3 className="text-sm font-medium text-gray-500">{stat.label}</h3>
              <div className="mt-2 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                <span className={`ml-2 text-xs font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Navigation Cards */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link
            to="/projects"
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition group"
          >
            <div className="p-5 flex flex-col items-center text-center">
              <div className="p-3 bg-blue-100 rounded-full mb-4 group-hover:bg-blue-200 transition">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-900">Projects</h3>
              <p className="mt-1 text-sm text-gray-500">Manage all construction projects</p>
            </div>
            <div className="bg-blue-500 py-2 text-center text-white text-sm font-medium group-hover:bg-blue-600 transition">
              View Projects
            </div>
          </Link>

          <Link
            to="/workers"
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition group"
          >
            <div className="p-5 flex flex-col items-center text-center">
              <div className="p-3 bg-green-100 rounded-full mb-4 group-hover:bg-green-200 transition">
                <Hammer className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-900">Workers</h3>
              <p className="mt-1 text-sm text-gray-500">Manage worker assignments and details</p>
            </div>
            <div className="bg-green-500 py-2 text-center text-white text-sm font-medium group-hover:bg-green-600 transition">
              View Workers
            </div>
          </Link>

          <Link
            to="/materials"
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition group"
          >
            <div className="p-5 flex flex-col items-center text-center">
              <div className="p-3 bg-amber-100 rounded-full mb-4 group-hover:bg-amber-200 transition">
                <Package className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-medium text-gray-900">Materials</h3>
              <p className="mt-1 text-sm text-gray-500">Track inventory and material orders</p>
            </div>
            <div className="bg-amber-500 py-2 text-center text-white text-sm font-medium group-hover:bg-amber-600 transition">
              View Materials
            </div>
          </Link>

          <Link
            to="/payments"
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition group"
          >
            <div className="p-5 flex flex-col items-center text-center">
              <div className="p-3 bg-purple-100 rounded-full mb-4 group-hover:bg-purple-200 transition">
                <Wallet className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-medium text-gray-900">Payments</h3>
              <p className="mt-1 text-sm text-gray-500">Manage invoices and payments</p>
            </div>
            <div className="bg-purple-500 py-2 text-center text-white text-sm font-medium group-hover:bg-purple-600 transition">
              View Payments
            </div>
          </Link>
        </div>

        {/* Secondary Menu */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Additional Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            to="/clients"
            className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition"
          >
            <div className="p-2 bg-indigo-100 rounded-lg mr-3">
              <Users className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Clients</h3>
              <p className="text-sm text-gray-500">Manage client information</p>
            </div>
          </Link>

          <Link
            to="/schedule"
            className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition"
          >
            <div className="p-2 bg-emerald-100 rounded-lg mr-3">
              <CalendarClock className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Schedule</h3>
              <p className="text-sm text-gray-500">View project timeline</p>
            </div>
          </Link>

          <Link
            to="/reports"
            className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition"
          >
            <div className="p-2 bg-red-100 rounded-lg mr-3">
              <LineChart className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Reports</h3>
              <p className="text-sm text-gray-500">View analytics and reports</p>
            </div>
          </Link>

          <Link
            to="/settings"
            className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition"
          >
            <div className="p-2 bg-gray-100 rounded-lg mr-3">
              <Settings className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Settings</h3>
              <p className="text-sm text-gray-500">Manage system preferences</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;