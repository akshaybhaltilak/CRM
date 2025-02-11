import React, { useState } from "react";

const Workers = () => {
  const [workers, setWorkers] = useState([
    { id: 1, name: "Rajesh Kumar", role: "Mason", paymentType: "Daily", wage: "$50/day" },
    { id: 2, name: "Amit Sharma", role: "Electrician", paymentType: "Contract", wage: "$2000/project" },
    { id: 3, name: "Sunil Yadav", role: "Laborer", paymentType: "Hourly", wage: "$10/hour" },
  ]);

  const [newWorker, setNewWorker] = useState({
    name: "",
    role: "",
    paymentType: "",
    wage: "",
  });

  const [loggedInWorker, setLoggedInWorker] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (newWorker.name) {
      setLoggedInWorker(newWorker.name);
    }
  };

  const handleChange = (e) => {
    setNewWorker({ ...newWorker, [e.target.name]: e.target.value });
  };

  const addWorker = (e) => {
    e.preventDefault();
    if (newWorker.name && newWorker.role && newWorker.paymentType && newWorker.wage) {
      setWorkers([...workers, { id: workers.length + 1, ...newWorker }]);
      setNewWorker({ name: loggedInWorker, role: "", paymentType: "", wage: "" });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Worker Management</h2>

      {!loggedInWorker ? (
        <form onSubmit={handleLogin} className="mb-4">
          <input
            type="text"
            name="name"
            value={newWorker.name}
            onChange={handleChange}
            placeholder="Enter your name to log in"
            className="border p-2 mr-2"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2">
            Log In
          </button>
        </form>
      ) : (
        <>
          <p className="mb-2">Logged in as: <strong>{loggedInWorker}</strong></p>
          <form onSubmit={addWorker} className="mb-4 flex gap-2">
            <input
              type="text"
              name="role"
              value={newWorker.role}
              onChange={handleChange}
              placeholder="Worker Role"
              className="border p-2"
            />
            <input
              type="text"
              name="paymentType"
              value={newWorker.paymentType}
              onChange={handleChange}
              placeholder="Payment Type"
              className="border p-2"
            />
            <input
              type="text"
              name="wage"
              value={newWorker.wage}
              onChange={handleChange}
              placeholder="Wage"
              className="border p-2"
            />
            <button type="submit" className="bg-green-500 text-white px-4 py-2">
              Add Work
            </button>
          </form>
        </>
      )}

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Worker Name</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Payment Type</th>
            <th className="border p-2">Wage</th>
          </tr>
        </thead>
        <tbody>
          {workers.map((worker) => (
            <tr key={worker.id} className="border">
              <td className="border p-2">{worker.name}</td>
              <td className="border p-2">{worker.role}</td>
              <td className="border p-2">{worker.paymentType}</td>
              <td className="border p-2">{worker.wage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Workers;