// // import React, { useState, useEffect} from "react";
// // import "./ChatBox.css"; // 引入CSS文件

// // const ChatBox = () => {
// //   const [messages, setMessages] = useState([]);
// //   const [input, setInput] = useState("");

// //   const handleSend = () => {
// //     if (!input.trim()) return;

// //     const userMessage = { sender: "user", text: input };
// //     setMessages([...messages, userMessage]);

// //     // 模拟AI响应
// //     const aiResponse = "This is a simulated response from the AI.";
// //     const aiMessage = { sender: "ai", text: aiResponse };

// //     setMessages([...messages, userMessage, aiMessage]);
// //     setInput("");
// //   };

// //   return (
// //     <div className="chatbox">
// //       <div className="messages">
// //         {messages.map((msg, index) => (
// //           <div
// //             key={index}
// //             className={msg.sender === "user" ? "user-message" : "ai-message"}
// //           >
// //             {msg.text}
// //           </div>
// //         ))}
// //       </div>
// //       <div className="input-container">
// //         <input
// //           type="text"
// //           value={input}
// //           onChange={(e) => setInput(e.target.value)}
// //           placeholder="Type a message..."
// //           className="chat-input"
// //         />
// //         <button onClick={handleSend} className="send-button">
// //           Send
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ChatBox;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import ChatHistory from "./chat-his";
// import "./ChatBox.css";

// const ChatBox = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   useEffect(() => {
//     const fetchMessages = async () => {
//       const response = await axios.get("http://localhost:5001/messages");
//       setMessages(response.data);
//     };

//     fetchMessages();
//   }, []);

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     const userMessage = { sender: "user", text: input };
//     setMessages([...messages, userMessage]);

//     const aiResponse = "This is a simulated response from the AI.";
//     const aiMessage = { sender: "ai", text: aiResponse };

//     setMessages([...messages, userMessage, aiMessage]);
//     setInput("");

//     await axios.post("http://localhost:5001/messages", userMessage);
//     await axios.post("http://localhost:5001/messages", aiMessage);
//   };

//   const handleSelectMessage = (index) => {
//     const selectedMessage = messages[index];
//     alert(`Selected message: ${selectedMessage.sender}: ${selectedMessage.text}`);
//   };

//   return (
//     <div className="chat-container">
//       <ChatHistory messages={messages} onSelectMessage={handleSelectMessage} />
//       <div className="chatbox">
//         <div className="messages">
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={msg.sender === "user" ? "user-message" : "ai-message"}
//             >
//               {msg.text}
//             </div>
//           ))}
//         </div>
//         <div className="input-container">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Type a message..."
//             className="chat-input"
//           />
//           <button onClick={handleSend} className="send-button">
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatBox;

import React, { useState, useEffect } from "react";
import axios from "axios";
import ChatHistory from "./chat-his";
import "./ChatBox.css";
import OpenAI from "openai";

// const ChatBox = () => {
//   const [messages, setMessages] = useState([]);
//   const [history, setHistory] = useState([]);
//   const [input, setInput] = useState("");

//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const response = await axios.get("http://localhost:5001/messages");
//         const allMessages = response.data;

//         // Move all fetched messages to history
//         setHistory(allMessages);
//         setMessages([]); // Start with an empty chat window
//       } catch (error) {
//         console.error("Error fetching messages:", error);
//       }
//     };

//     fetchMessages();
//   }, []);

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     const userMessage = { sender: "user", text: input };
//     const updatedMessages = [...messages, userMessage];
//     setMessages(updatedMessages);

//     // Simulate AI response
//     const aiResponse = "This is a simulated response from the AI.";
//     const aiMessage = { sender: "ai", text: aiResponse };

//     const finalMessages = [...updatedMessages, aiMessage];
//     setMessages(finalMessages);
//     setInput("");

//     try {
//       await axios.post("http://localhost:5001/messages", userMessage);
//       await axios.post("http://localhost:5001/messages", aiMessage);
//     } catch (error) {
//       console.error("Error saving message:", error);
//     }
//   };

//   const handleSelectMessage = (index) => {
//     const selectedMessage = history[index];
//     alert(`Selected message: ${selectedMessage.sender}: ${selectedMessage.text}`);
//   };

//   return (
//     <div className="chat-container">
//       <ChatHistory messages={history} onSelectMessage={handleSelectMessage} />
//       <div className="chatbox">
//         <div className="messages">
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={msg.sender === "user" ? "user-message" : "ai-message"}
//             >
//               {msg.text}
//             </div>
//           ))}
//         </div>
//         <div className="input-container">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Type a message..."
//             className="chat-input"
//           />
//           <button onClick={handleSend} className="send-button">
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatBox;

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:5001/messages");
        const allMessages = response.data;

        // Move all fetched messages to history
        setHistory(allMessages);
        setMessages([]); // Start with an empty chat window
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    // Simulate AI response
    // const aiResponse = "This is a simulated response from the AI.";
    // const aiMessage = { sender: "ai", text: aiResponse };

    // const finalMessages = [...updatedMessages, aiMessage];
    // setMessages(finalMessages);
    // setInput("");

    try {
      const aiResponse = await getAIResponse(input);

      const aiMessage = { sender: "ai", text: aiResponse };
      const finalMessages = [...updatedMessages, aiMessage];
      setMessages(finalMessages);
      setInput("");
      await axios.post("http://localhost:5001/messages", userMessage);
      // await axios.post("http://localhost:5001/messages", aiMessage);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  };

  const getAIResponse = async (userInput) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "gpt-3.5-turbo",
        prompt: userInput,
        max_tokens:3,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer sk-proj-3q3CisgsV15D6zgv8gjkT3BlbkFJat8VXkts4n1rI1iqO8MJ`,
        },
      }
    );
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error getting AI response:", error.response ? error.response.data : error.message);
    return "Sorry, I couldn't understand that.";
  }
};


  const handleSelectMessage = (index) => {
    const selectedMessage = history[index];
    alert(`Selected message: ${selectedMessage.sender}: ${selectedMessage.text}`);
  };

  // const handleDeleteOldHistory = () => {
  //   // Keep only the most recent 50 messages in the history
  //   const newHistory = history.slice(15);
  //   setHistory(newHistory);

  //   // Optionally, you can also send a request to delete old messages from the backend
  //   // await axios.post("http://localhost:5001/deleteOldMessages", { limit: 50 });
  // };

  const handleDeleteOldHistory = async () => {
    try {
      await axios.post("http://localhost:5001/deleteOldMessages", { limit: 1 });
      const response = await axios.get("http://localhost:5001/messages");
      setHistory(response.data);
    } catch (error) {
      console.error("Error deleting old messages:", error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <ChatHistory messages={history} onSelectMessage={handleSelectMessage} />
        {/* this is only for convinience */}
        <button onClick={handleDeleteOldHistory} className="delete-button">
          Delete Old History
        </button>
      </div>
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