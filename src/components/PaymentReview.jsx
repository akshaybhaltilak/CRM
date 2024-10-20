import React, { useEffect, useState } from 'react';

const PaymentReview = () => {
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalPending, setTotalPending] = useState(0);
  const [dailyEarnings, setDailyEarnings] = useState(0);
  const [weeklyEarnings, setWeeklyEarnings] = useState(0);
  const [monthlyEarnings, setMonthlyEarnings] = useState(0);

  useEffect(() => {
    const customerData = JSON.parse(localStorage.getItem('customerBillingData')) || [];

    // Ensure customerData is an array
    if (!Array.isArray(customerData)) {
      console.error("customerData is not an array", customerData);
      return; // Exit early if data is not valid
    }

    const today = new Date();
    const currentDateString = today.toLocaleDateString();

    let dailyTotal = 0;
    let weeklyTotal = 0;
    let monthlyTotal = 0;
    let pendingTotal = 0;

    customerData.forEach((data) => {
      const { paidAmount, totalAmount, pendingAmount, date } = data;

      // Update totals
      setTotalEarnings((prev) => prev + parseFloat(paidAmount || 0));
      setTotalPending((prev) => prev + parseFloat(pendingAmount || 0));

      // Check if the billing date matches today
      if (date === currentDateString) {
        dailyTotal += parseFloat(paidAmount || 0);
      }

      const billingDate = new Date(date);
      const weekDiff = Math.ceil((today - billingDate) / (1000 * 60 * 60 * 24 * 7));
      const monthDiff = today.getMonth() === billingDate.getMonth() && today.getFullYear() === billingDate.getFullYear();

      if (weekDiff <= 1) {
        weeklyTotal += parseFloat(paidAmount || 0);
      }
      if (monthDiff) {
        monthlyTotal += parseFloat(paidAmount || 0);
      }
    });

    // Update state
    setDailyEarnings(dailyTotal);
    setWeeklyEarnings(weeklyTotal);
    setMonthlyEarnings(monthlyTotal);
  }, []);

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center animate-pulse">
        Payment Review
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-md hover:bg-opacity-20 transition-all duration-300 ease-in-out">
          <p className="text-lg font-semibold">Total Earnings:</p>
          <p className="text-2xl font-bold animate-bounce">₹{totalEarnings.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-md hover:bg-opacity-20 transition-all duration-300 ease-in-out">
          <p className="text-lg font-semibold">Total Pending Amount:</p>
          <p className="text-2xl font-bold text-red-400 animate-pulse">₹{totalPending.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-md hover:bg-opacity-20 transition-all duration-300 ease-in-out">
          <p className="text-lg font-semibold">Earnings Today:</p>
          <p className="text-2xl font-bold animate-bounce">₹{dailyEarnings.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-md hover:bg-opacity-20 transition-all duration-300 ease-in-out">
          <p className="text-lg font-semibold">Earnings Last 7 Days:</p>
          <p className="text-2xl font-bold animate-bounce">₹{weeklyEarnings.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-md hover:bg-opacity-20 transition-all duration-300 ease-in-out">
          <p className="text-lg font-semibold">Earnings Last Month:</p>
          <p className="text-2xl font-bold animate-bounce">₹{monthlyEarnings.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentReview;
