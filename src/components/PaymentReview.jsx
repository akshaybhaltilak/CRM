// PaymentReview.jsx
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

      // Calculate weekly and monthly earnings based on your own criteria (you might want to adjust this)
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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Payment Review</h2>
      <p><strong>Total Earnings:</strong> ₹{totalEarnings.toFixed(2)}</p>
      <p><strong>Total Pending Amount:</strong> ₹{totalPending.toFixed(2)}</p>
      <p><strong>Earnings Today:</strong> ₹{dailyEarnings.toFixed(2)}</p>
      <p><strong>Earnings Last 7 Days:</strong> ₹{weeklyEarnings.toFixed(2)}</p>
      <p><strong>Earnings Last Month:</strong> ₹{monthlyEarnings.toFixed(2)}</p>
    </div>
  );
};

export default PaymentReview;
