import React from "react";
import "./Navbar.css";
import leftLogo from "./logo.jpg"; // Assuming logo.png is directly under src folder
import rightLogo from "./logo.jpg"; // You can use different images as needed

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo-left">
        <img src={leftLogo} alt="Left Logo" />
      </div>
      <div className="navbar-item">Challenge Overview</div>
      <div className="navbar-item">Validation Challenge</div>
      <div className="navbar-item">Feedback & Referrals</div>
      <div className="navbar-group">
        <div className="navbar-item">1</div>
        <div className="navbar-item">2</div>
        <div className="navbar-item">3</div>
        <div className="navbar-item">4</div>
        <div className="navbar-item">5</div>
      </div>
      <div className="navbar-logo-right">
        <img src={rightLogo} alt="Right Logo" />
      </div>
    </div>
  );
};

export default Navbar;
