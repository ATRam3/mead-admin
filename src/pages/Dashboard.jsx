import React, { useEffect, useState } from "react";
import { getUsers, getPayments } from "../services/analyticsService";
import { calculateStats } from "../utils/calculateStats";
import StatsCard from "../components/Dashboard/StatsCard";
import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const users = await getUsers();
        const payments = await getPayments();
        const result = calculateStats(users, payments);
        setStats(result);
      } catch (error) {
        console.error("Failed to load stats:", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (!stats) return <div className="error">Failed to load data</div>;

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Overview of your nutrition platform</p>
      </div>

      <div className="stats-grid">
        <StatsCard title="Total Users" value={stats.totalUsers} icon="👥" />
        <StatsCard
          title="Active Users (30d)"
          value={stats.activeUsers}
          icon="🟢"
        />
        <StatsCard title="Pro Users" value={stats.proUsers} icon="⭐" />
        <StatsCard
          title="Total Payments"
          value={`$${stats.totalPayments}`}
          icon="💰"
        />
        <StatsCard
          title="Conversion Rate"
          value={`${stats.conversionRate}%`}
          icon="📈"
        />
      </div>
    </div>
  );
};

export default Dashboard;
