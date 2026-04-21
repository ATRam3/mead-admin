import React, { useEffect } from "react";
import { useDashboardStorage } from "../storage/useDashboardStorage";
import StatsCard from "../components/Dashboard/StatsCard";
import {
  FiUsers,
  FiUserCheck,
  FiStar,
  FiDollarSign,
  FiTrendingUp,
  FiRefreshCw,
} from "react-icons/fi";
import "./Dashboard.css";

const Dashboard = () => {
  const { stats, loading, fetchStats, refreshStats } = useDashboardStorage();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (!stats) return <div className="error">Failed to load data</div>;

  return (
    <div className="dashboard">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Overview of your nutrition platform</p>
        </div>
        <button className="refresh-button" onClick={refreshStats}>
          <FiRefreshCw size={24} />
        </button>
      </div>

      <div className="stats-grid">
        <StatsCard
          title="Total Users"
          value={stats.totalUsers}
          icon={FiUsers}
        />
        <StatsCard
          title="Active Users (30d)"
          value={stats.activeUsers}
          icon={FiUserCheck}
        />
        <StatsCard title="Pro Users" value={stats.proUsers} icon={FiStar} />
        <StatsCard
          title="Total Payments"
          value={`${stats.totalPayments} birr`}
          icon={FiDollarSign}
        />
        <StatsCard
          title="Conversion Rate"
          value={`${stats.conversionRate}%`}
          icon={FiTrendingUp}
        />
      </div>
    </div>
  );
};

export default Dashboard;
