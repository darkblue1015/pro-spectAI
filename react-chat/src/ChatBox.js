// import React, { useState, useEffect} from "react";
// import "./ChatBox.css"; // 引入CSS文件

// const ChatBox = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   const handleSend = () => {
//     if (!input.trim()) return;

//     const userMessage = { sender: "user", text: input };
//     setMessages([...messages, userMessage]);

//     // 模拟AI响应
//     const aiResponse = "This is a simulated response from the AI.";
//     const aiMessage = { sender: "ai", text: aiResponse };

//     setMessages([...messages, userMessage, aiMessage]);
//     setInput("");
//   };

//   return (
//     <div className="chatbox">
//       <div className="messages">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={msg.sender === "user" ? "user-message" : "ai-message"}
//           >
//             {msg.text}
//           </div>
//         ))}
//       </div>
//       <div className="input-container">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type a message..."
//           className="chat-input"
//         />
//         <button onClick={handleSend} className="send-button">
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatBox;

import React, { useState, useEffect } from "react";
import axios from "axios";
import ChatHistory from "./chat-his";
import "./ChatBox.css";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axios.get("http://localhost:5001/messages");
      setMessages(response.data);
    };

    fetchMessages();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    const aiResponse = "This is a simulated response from the AI.";
    const aiMessage = { sender: "ai", text: aiResponse };

    setMessages([...messages, userMessage, aiMessage]);
    setInput("");

    await axios.post("http://localhost:5001/messages", userMessage);
    await axios.post("http://localhost:5001/messages", aiMessage);
  };

  const handleSelectMessage = (index) => {
    const selectedMessage = messages[index];
    alert(`Selected message: ${selectedMessage.sender}: ${selectedMessage.text}`);
  };

  return (
    <div className="chat-container">
      <ChatHistory messages={messages} onSelectMessage={handleSelectMessage} />
      <div className="chatbox">
        <div className="messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={msg.sender === "user" ? "user-message" : "ai-message"}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="chat-input"
          />
          <button onClick={handleSend} className="send-button">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;