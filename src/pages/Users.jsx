import React, { useState } from "react";
import { useUsers } from "../hooks/useUsers";
import "./Users.css";

const Users = () => {
  const { users, loading } = useUsers();
  const [searchTerm, setSearchTerm] = useState("");
  const [proFilter, setProFilter] = useState("all");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPro =
      proFilter === "all" ||
      (proFilter === "pro" && user.isPro) ||
      (proFilter === "regular" && !user.isPro);
    return matchesSearch && matchesPro;
  });

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) return <div className="loading">Loading users...</div>;

  return (
    <div className="users-page">
      <div className="page-header">
        <h1>User Management</h1>
        <p>Total: {users.length} users</p>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={proFilter}
          onChange={(e) => setProFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Users</option>
          <option value="pro">Pro Users</option>
          <option value="regular">Regular Users</option>
        </select>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Join Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="4" className="no-data">
                  No users found
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name || "—"}</td>
                  <td>{user.email}</td>
                  <td>{formatDate(user.createdAt)}</td>
                  <td>
                    <span
                      className={`status-badge ${user.isPro ? "pro" : "regular"}`}
                    >
                      {user.isPro ? "Pro" : "Regular"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
