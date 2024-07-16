import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-items-top">
        <div className="sidebar-item"></div>
        <div className="sidebar-item active"></div>
        <div className="sidebar-item"></div>
      </div>
      <div className="sidebar-items-bottom">
        <div className="sidebar-item"></div>
      </div>
    </div>
  );
};

export default Sidebar;
