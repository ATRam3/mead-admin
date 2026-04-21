import React from "react";
import { NavLink } from "react-router-dom";
import { FiPieChart, FiDatabase, FiUsers } from "react-icons/fi";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>🍽️ NutriAdmin</h2>
      </div>
      <nav className="sidebar-nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <FiPieChart className="nav-icon" /> Dashboard
        </NavLink>
        <NavLink
          to="/meals"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <FiDatabase className="nav-icon" /> Meals
        </NavLink>
        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <FiUsers className="nav-icon" /> Users
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
