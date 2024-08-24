import React from "react";
import "./Navbar.css";
import leftLogo from "./logo.jpg";
import CropFreeIcon from "@mui/icons-material/CropFree";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo-left">
        <img src={leftLogo} alt="Left Logo" />
      </div>
      <div className="navbar-items">
        <div className="navbar-item">
          {" "}
          <CropFreeIcon />
          Challenge Overview
        </div>
        <div className="navbar-item">
          {" "}
          <CropFreeIcon />
          Validation Challenge
        </div>
        <div className="navbar-item">
          {" "}
          <CropFreeIcon />
          Apply&Engage
        </div>
      </div>
      <div className="navbar-assistance">Manual Assistance</div>
      <div className="navbar-profile">Profile</div>
    </div>
  );
};

export default Navbar;
