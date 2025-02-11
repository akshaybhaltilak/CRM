import React, { useState } from "react";

const Payments = () => {
  const [payments, setPayments] = useState([
    { id: 1, description: "Worker Salaries", amount: "$5000", date: "2024-02-10" },
    { id: 2, description: "Material Purchase", amount: "$3000", date: "2024-02-08" },
  ]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Payment Records</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Description</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id} className="border">
              <td className="border p-2">{payment.description}</td>
              <td className="border p-2">{payment.amount}</td>
              <td className="border p-2">{payment.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Payments;
