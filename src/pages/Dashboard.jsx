import React, { useEffect, useState } from "react";
import { getUsers, getPayments } from "../services/analyticsService";
import { calculateStats } from "../utils/calculateStats";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const load = async () => {
      const users = await getUsers();
      const payments = await getPayments();

      const result = calculateStats(users, payments);
      setStats(result);
    };

    load();
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div>
      <h1>Dashboard</h1>

      <div>
        <h3>Total Users: {stats.totalUsers}</h3>
        <h3>Pro Users: {stats.proUsers}</h3>
        <h3>Total Payments: {stats.totalPayments}</h3>
        <h3>Conversion Rate: {stats.conversionRate}%</h3>
      </div>
    </div>
  );
};

export default Dashboard;
