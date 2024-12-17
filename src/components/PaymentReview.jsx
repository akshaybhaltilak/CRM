import React, { useEffect, useState } from "react";

const PaymentReview = () => {
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalPending, setTotalPending] = useState(0);
  const [dailyEarnings, setDailyEarnings] = useState(0);
  const [weeklyEarnings, setWeeklyEarnings] = useState(0);
  const [monthlyEarnings, setMonthlyEarnings] = useState(0);

  useEffect(() => {
    const customerData = JSON.parse(localStorage.getItem("customerBillingData")) || [];

    // Exit early if customerData is invalid
    if (!Array.isArray(customerData)) {
      console.error("Invalid data in localStorage:", customerData);
      return;
    }

    const today = new Date();
    const currentDateString = today.toLocaleDateString();

    let totalPaid = 0,
      totalPendingAmount = 0,
      dailyTotal = 0,
      weeklyTotal = 0,
      monthlyTotal = 0;

    customerData.forEach((data) => {
      const { paidAmount = 0, pendingAmount = 0, date = "" } = data;

      // Convert to float for safety
      const paid = parseFloat(paidAmount);
      const pending = parseFloat(pendingAmount);

      totalPaid += paid;
      totalPendingAmount += pending;

      // Parse billing date
      const billingDate = new Date(date);

      // Daily earnings
      if (date === currentDateString) {
        dailyTotal += paid;
      }

      // Weekly earnings (last 7 days)
      const timeDiff = (today - billingDate) / (1000 * 60 * 60 * 24);
      if (timeDiff <= 7 && timeDiff >= 0) {
        weeklyTotal += paid;
      }

      // Monthly earnings
      if (
        today.getMonth() === billingDate.getMonth() &&
        today.getFullYear() === billingDate.getFullYear()
      ) {
        monthlyTotal += paid;
      }
    });

    // Update state at once
    setTotalEarnings(totalPaid);
    setTotalPending(totalPendingAmount);
    setDailyEarnings(dailyTotal);
    setWeeklyEarnings(weeklyTotal);
    setMonthlyEarnings(monthlyTotal);
  }, []);

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg shadow-lg text-white">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center animate-pulse">
        Payment Review
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card Component */}
        <StatCard title="Total Earnings" value={totalEarnings} />
        <StatCard title="Total Pending Amount" value={totalPending} color="text-red-400" />
        <StatCard title="Earnings Today" value={dailyEarnings} />
        <StatCard title="Earnings Last 7 Days" value={weeklyEarnings} />
        <StatCard title="Earnings Last Month" value={monthlyEarnings} />
      </div>
    </div>
  );
};

// Reusable StatCard Component
const StatCard = ({ title, value, color = "text-white" }) => {
  return (
    <div className="p-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-md hover:bg-opacity-20 transition-all duration-300 ease-in-out">
      <p className="text-lg font-semibold">{title}:</p>
      <p className={`text-2xl font-bold ${color} animate-bounce`}>₹{value.toFixed(2)}</p>
    </div>
  );
};

export default PaymentReview;
