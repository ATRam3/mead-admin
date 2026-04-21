import React, { useEffect, useState } from "react";
import { useUsersStorage } from "../storage/useUsersStorage";
import { FiSearch, FiRefreshCw } from "react-icons/fi";
import { toggleProStatus } from "../services/userServices";
import "./Users.css";

const Users = () => {
  const { users, loading, fetchUsers, refreshUsers } = useUsersStorage();
  const [searchTerm, setSearchTerm] = useState("");
  const [proFilter, setProFilter] = useState("all");
  const [togglingUserId, setTogglingUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleTogglePro = async (id, currentStatus) => {
    setTogglingUserId(id);
    try {
      await toggleProStatus(id, currentStatus);
      await refreshUsers();
    } catch (error) {
      console.error("Failed to toggle pro status:", error);
      alert("Error updating user status");
    } finally {
      setTogglingUserId(null);
    }
  };

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
        <div>
          <h1>User Management</h1>
          <p>Total: {users.length} users</p>
        </div>
        <button className="refresh-users" onClick={refreshUsers}>
          <FiRefreshCw size={20} />
        </button>
      </div>

      <div className="filters">
        <div className="search-wrapper">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-data">
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
                  <td>
                    <button
                      className={`toggle-pro-btn ${user.isPro ? "pro" : "regular"}`}
                      onClick={() => handleTogglePro(user.id, user.isPro)}
                      disabled={togglingUserId === user.id}
                    >
                      {togglingUserId === user.id
                        ? "Updating..."
                        : user.isPro
                          ? "Remove Pro"
                          : "Make Pro"}
                    </button>
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
