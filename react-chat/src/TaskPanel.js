import React from "react";
import "./TaskPanel.css";
import gameImage from "./game.png";

const TaskPanel = () => {
  return (
    <div className="task-panel">
      <img src={gameImage} alt="Game Illustration" className="game-image" />
    </div>
  );
};

export default TaskPanel;
