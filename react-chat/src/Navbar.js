import React from "react";
import "./Navbar.css";
import leftLogo from "./logo.jpg";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo-left">
        <img src={leftLogo} alt="Left Logo" />
      </div>
      <div className="navbar-item">Challenge Overview</div>
      <div className="navbar-item">Validation Challenge</div>
      <div className="navbar-item">Apply&Engage</div>
      <div className="navbar-assistance">Manual Assistance</div>
      <div className="navbar-profile">Profile</div>
    </div>
  );
};

export default Navbar;
