import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./NewPage.css";

const NewPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/main");
  };

  return (
    <div>
      <Navbar />
      <div className="new-page-content">
        <button className="go-back-button" onClick={handleGoBack}>
          Start the Challenge
        </button>
      </div>
    </div>
  );
};

export default NewPage;
