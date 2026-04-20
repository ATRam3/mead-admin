import React from "react";
import { NavLink } from "react-router-dom";
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
          📊 Dashboard
        </NavLink>
        <NavLink
          to="/meals"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          🍕 Meals
        </NavLink>
        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          👥 Users
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
