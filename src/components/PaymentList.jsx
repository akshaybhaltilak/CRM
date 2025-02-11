import React from 'react';

const PaymentList = ({ payments }) => {
  return (
    <div className="space-y-4">
      {payments.map(payment => (
        <div key={payment.id} className="p-4 bg-white shadow rounded">
          <h2 className="text-xl font-bold">{payment.projectName}</h2>
          <p>{payment.amount}</p>
          <p>{payment.date}</p>
        </div>
      ))}
    </div>
  );
};

export default PaymentList;