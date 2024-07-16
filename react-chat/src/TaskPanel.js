import React from "react";
import "./TaskPanel.css";

const TaskPanel = () => {
  return (
    <div className="task-panel">
      <div className="task-info">
        <h2>Basic info of Task 1 Onboarding</h2>
        <textarea placeholder="Enter basic info here..."></textarea>
      </div>
      <div className="task-details">
        <div className="cto">
          <img src="cto-avatar-url" alt="CTO" />
          <h3>CTO</h3>
        </div>
        <div className="task-notes">
          <h2>Things needed to know for onboarding</h2>
          <textarea placeholder="Enter details here..."></textarea>
        </div>
      </div>
    </div>
  );
};

export default TaskPanel;
