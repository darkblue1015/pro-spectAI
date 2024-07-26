import React from "react";
import "./chat-his.css";

const ChatHistory = ({ messages, onSelectMessage }) => {
  return (
    <div className="chat-history">
      <h3>Chat History</h3>
      {messages.map((msg, index) => (
        <div
          key={index}
          className="history-message"
          onClick={() => onSelectMessage(index)}
        >
          {msg.sender}: {msg.text}
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;