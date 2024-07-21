import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ChatBox from "./ChatBox";
import TaskPanel from "./TaskPanel";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="content">
          <TaskPanel />
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

export default App;
