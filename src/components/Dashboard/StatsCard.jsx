import React from "react";

const StatsCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="stats-card">
      <div className="stats-icon">
        <Icon size={28} />{" "}
      </div>
      <div className="stats-content">
        <h3>{title}</h3>
        <p className="stats-value">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
