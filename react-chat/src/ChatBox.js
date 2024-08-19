// // // import React, { useState, useEffect} from "react";
// // // import "./ChatBox.css"; // 引入CSS文件

// // // const ChatBox = () => {
// // //   const [messages, setMessages] = useState([]);
// // //   const [input, setInput] = useState("");

// // //   const handleSend = () => {
// // //     if (!input.trim()) return;

// // //     const userMessage = { sender: "user", text: input };
// // //     setMessages([...messages, userMessage]);

// // //     // 模拟AI响应
// // //     const aiResponse = "This is a simulated response from the AI.";
// // //     const aiMessage = { sender: "ai", text: aiResponse };

// // //     setMessages([...messages, userMessage, aiMessage]);
// // //     setInput("");
// // //   };

// // //   return (
// // //     <div className="chatbox">
// // //       <div className="messages">
// // //         {messages.map((msg, index) => (
// // //           <div
// // //             key={index}
// // //             className={msg.sender === "user" ? "user-message" : "ai-message"}
// // //           >
// // //             {msg.text}
// // //           </div>
// // //         ))}
// // //       </div>
// // //       <div className="input-container">
// // //         <input
// // //           type="text"
// // //           value={input}
// // //           onChange={(e) => setInput(e.target.value)}
// // //           placeholder="Type a message..."
// // //           className="chat-input"
// // //         />
// // //         <button onClick={handleSend} className="send-button">
// // //           Send
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ChatBox;

// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import ChatHistory from "./chat-his";
// // import "./ChatBox.css";

// // const ChatBox = () => {
// //   const [messages, setMessages] = useState([]);
// //   const [input, setInput] = useState("");

// //   useEffect(() => {
// //     const fetchMessages = async () => {
// //       const response = await axios.get("http://localhost:5001/messages");
// //       setMessages(response.data);
// //     };

// //     fetchMessages();
// //   }, []);

// //   const handleSend = async () => {
// //     if (!input.trim()) return;

// //     const userMessage = { sender: "user", text: input };
// //     setMessages([...messages, userMessage]);

// //     const aiResponse = "This is a simulated response from the AI.";
// //     const aiMessage = { sender: "ai", text: aiResponse };

// //     setMessages([...messages, userMessage, aiMessage]);
// //     setInput("");

// //     await axios.post("http://localhost:5001/messages", userMessage);
// //     await axios.post("http://localhost:5001/messages", aiMessage);
// //   };

// //   const handleSelectMessage = (index) => {
// //     const selectedMessage = messages[index];
// //     alert(`Selected message: ${selectedMessage.sender}: ${selectedMessage.text}`);
// //   };

// //   return (
// //     <div className="chat-container">
// //       <ChatHistory messages={messages} onSelectMessage={handleSelectMessage} />
// //       <div className="chatbox">
// //         <div className="messages">
// //           {messages.map((msg, index) => (
// //             <div
// //               key={index}
// //               className={msg.sender === "user" ? "user-message" : "ai-message"}
// //             >
// //               {msg.text}
// //             </div>
// //           ))}
// //         </div>
// //         <div className="input-container">
// //           <input
// //             type="text"
// //             value={input}
// //             onChange={(e) => setInput(e.target.value)}
// //             placeholder="Type a message..."
// //             className="chat-input"
// //           />
// //           <button onClick={handleSend} className="send-button">
// //             Send
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ChatBox;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import ChatHistory from "./chat-his";
// import "./ChatBox.css";
// import OpenAI from "openai";

// // const ChatBox = () => {
// //   const [messages, setMessages] = useState([]);
// //   const [history, setHistory] = useState([]);
// //   const [input, setInput] = useState("");

// //   useEffect(() => {
// //     const fetchMessages = async () => {
// //       try {
// //         const response = await axios.get("http://localhost:5001/messages");
// //         const allMessages = response.data;

// //         // Move all fetched messages to history
// //         setHistory(allMessages);
// //         setMessages([]); // Start with an empty chat window
// //       } catch (error) {
// //         console.error("Error fetching messages:", error);
// //       }
// //     };

// //     fetchMessages();
// //   }, []);

// //   const handleSend = async () => {
// //     if (!input.trim()) return;

// //     const userMessage = { sender: "user", text: input };
// //     const updatedMessages = [...messages, userMessage];
// //     setMessages(updatedMessages);

// //     // Simulate AI response
// //     const aiResponse = "This is a simulated response from the AI.";
// //     const aiMessage = { sender: "ai", text: aiResponse };

// //     const finalMessages = [...updatedMessages, aiMessage];
// //     setMessages(finalMessages);
// //     setInput("");

// //     try {
// //       await axios.post("http://localhost:5001/messages", userMessage);
// //       await axios.post("http://localhost:5001/messages", aiMessage);
// //     } catch (error) {
// //       console.error("Error saving message:", error);
// //     }
// //   };

// //   const handleSelectMessage = (index) => {
// //     const selectedMessage = history[index];
// //     alert(`Selected message: ${selectedMessage.sender}: ${selectedMessage.text}`);
// //   };

// //   return (
// //     <div className="chat-container">
// //       <ChatHistory messages={history} onSelectMessage={handleSelectMessage} />
// //       <div className="chatbox">
// //         <div className="messages">
// //           {messages.map((msg, index) => (
// //             <div
// //               key={index}
// //               className={msg.sender === "user" ? "user-message" : "ai-message"}
// //             >
// //               {msg.text}
// //             </div>
// //           ))}
// //         </div>
// //         <div className="input-container">
// //           <input
// //             type="text"
// //             value={input}
// //             onChange={(e) => setInput(e.target.value)}
// //             placeholder="Type a message..."
// //             className="chat-input"
// //           />
// //           <button onClick={handleSend} className="send-button">
// //             Send
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ChatBox;

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
//     // const aiResponse = "This is a simulated response from the AI.";
//     // const aiMessage = { sender: "ai", text: aiResponse };

//     // const finalMessages = [...updatedMessages, aiMessage];
//     // setMessages(finalMessages);
//     // setInput("");

//     try {
//       const aiResponse = await getAIResponse(input);

//       const aiMessage = { sender: "ai", text: aiResponse };
//       const finalMessages = [...updatedMessages, aiMessage];
//       setMessages(finalMessages);
//       setInput("");
//       await axios.post("http://localhost:5001/messages", userMessage);
//       // await axios.post("http://localhost:5001/messages", aiMessage);
//     } catch (error) {
//       console.error("Error saving message:", error);
//     }
//   };

//   //   const getAIResponse = async (userInput) => {
//   //   try {
//   //     const response = await axios.post(
//   //       "https://api.openai.com/v1/chat/completions",
//   //       {
//   //         model: "gpt-3.5-turbo",
//   //         messages: [{ role: "user", content: userInput }],
//   //         // prompt: userInput,
//   //         max_tokens:3,
//   //       },
//   //       {
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //           Authorization: `Bearer sk-proj-PCP27N5CwFeuOKswYlIOT3BlbkFJg2anMyA2UP772sC6Gh3n`,
//   //         },
//   //       }
//   //     );
//   //     return response.data.choices[0].text.trim();
//   //   } catch (error) {
//   //     console.error("Error getting AI response:", error.response ? error.response.data : error.message);
//   //     return "Sorry, I couldn't understand that.";
//   //   }
//   // };
//   const getAIResponse = async (userInput) => {
//     try {
//       const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
//       console.log("OpenAI API Key:", apiKey); // Verify the API key is being loaded

//       if (!apiKey) {
//         throw new Error(
//           "OpenAI API key is not defined. Please check your .env file."
//         );
//       }

//       const response = await axios.post(
//         "https://api.openai.com/v1/chat/completions",
//         {
//           model: "gpt-3.5-turbo",
//           messages: [{ role: "user", content: userInput }],
//           max_tokens: 50, // Reduce the number of tokens to lower the cost
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${apiKey}`,
//           },
//         }
//       );
//       console.log("Full API Response:", response.data); // Log the full response for debugging

//       if (
//         response.data &&
//         response.data.choices &&
//         response.data.choices[0] &&
//         response.data.choices[0].message &&
//         response.data.choices[0].message.content
//       ) {
//         return response.data.choices[0].message.content.trim();
//       } else {
//         console.error("Unexpected API response format:", response.data);
//         throw new Error("Invalid response format");
//       }
//     } catch (error) {
//       console.error(
//         "Error getting AI response:",
//         error.response ? error.response.data : error.message
//       );
//       return "Sorry, I couldn't understand that.";
//     }
//   };

//   const handleSelectMessage = (index) => {
//     const selectedMessage = history[index];
//     alert(
//       `Selected message: ${selectedMessage.sender}: ${selectedMessage.text}`
//     );
//   };

//   // const handleDeleteOldHistory = () => {
//   //   // Keep only the most recent 50 messages in the history
//   //   const newHistory = history.slice(15);
//   //   setHistory(newHistory);

//   //   // Optionally, you can also send a request to delete old messages from the backend
//   //   // await axios.post("http://localhost:5001/deleteOldMessages", { limit: 50 });
//   // };

//   const handleDeleteOldHistory = async () => {
//     try {
//       await axios.post("http://localhost:5001/deleteOldMessages", { limit: 1 });
//       const response = await axios.get("http://localhost:5001/messages");
//       setHistory(response.data);
//     } catch (error) {
//       console.error("Error deleting old messages:", error);
//     }
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-sidebar">
//         <ChatHistory messages={history} onSelectMessage={handleSelectMessage} />
//         {/* this is only for convinience */}
//         <button onClick={handleDeleteOldHistory} className="delete-button">
//           Delete Old History
//         </button>
//       </div>

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
import "./ChatBox.css";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [nextPromptIndex, setNextPromptIndex] = useState(0);

  const defaultQuestions = [
  "Please give a short bio about yourself - 1 short paragraph",
  "Where are you right now? - 1 word",
  "When did you graduate from college? - 1 number",
  "Why do you interested in this position? - 1 short paragraph ",
  "Please give a short paragraph about your previous experience that align with this position",
  // Add more questions as needed
];

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:5001/messages");
        const existingMessages = response.data;
        console.log(existingMessages.length)
        if (existingMessages.length === 0) {
          // Send the first question if no messages are present
          const firstQuestion = { sender: "ai", text: defaultQuestions[0] };
          setNextPromptIndex(1); // Set the next prompt index to the second question
          setMessages([firstQuestion]);
          // await axios.post("http://localhost:5001/messages", firstQuestion); // Ensure this is awaited
          console.log(nextPromptIndex)
        } else {
          setMessages(existingMessages); // Set existing messages if there are any
        }
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
    setNextPromptIndex(1)
    console.log(nextPromptIndex)

    try {
      const aiResponse = await getAIResponse(input);
      const aiMessage = { sender: "ai", text: aiResponse };

      const finalMessages = [...updatedMessages, aiMessage];
      setMessages(finalMessages);
      setInput("");

      await axios.post("http://localhost:5001/messages", userMessage);
      await axios.post("http://localhost:5001/messages", aiMessage);
      // Check if there are more questions to ask
      if (nextPromptIndex < defaultQuestions.length) {
        const nextQuestion = { sender: "ai", text: defaultQuestions[nextPromptIndex] };
        updatedMessages.push(nextQuestion); // Add next question to message list
        setMessages(updatedMessages);
        setNextPromptIndex(nextPromptIndex + 1); // Increment to the next question index

        await axios.post("http://localhost:5001/messages", nextQuestion); // Store AI question
      }
    } catch (error) {
      console.error("Error saving message:", error);
    }
  };

  const getAIResponse = async (userInput, previousMessages) => {
    try {
      const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
      console.log("OpenAI API Key:", apiKey);

      if (!apiKey) {
        throw new Error(
          "OpenAI API key is not defined. Please check your .env file."
        );
      }

      // const conversationHistory = previousMessages.map(msg => `${msg.sender === 'user' ? 'Candidate' : 'CEO'}: ${msg.text}`).join('\n');

      // const prompts = `
      // Role: You are the CEO of PRO-spect AI.
      // Situation: You are engaging with a Product Management Candidate who is interested in joining the company in the future.
      // Engagement Style: Visionary, candid, straightforward.
      // Task: Respond to the candidate's messages, provide information about the company, answer their questions, and guide the conversation towards assessing their fit for the company.


      // Candidate: ${userInput}

      // CEO Response:
      // `;
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          // prompt: prompts,
          
          messages: [
            {
              role: "system",
              content: `# Company Introduction: 
      # Current Company Structure:
      ## CEO[CEO] --> CTO[CTO]
      ## CEO --> PMM[Product Marketing Manager]
      ## CEO --> UX[UX Designer]
      ## CTO --> FE[Frontend Engineer]
      ## CTO --> BE[Backend Engineer]
      # Company Industry: Human Resource
      # Company Stage: Pre-seed
      # Key Questions in Mind 
      ## What is the product you are building: Early Talent Engagement & Validation Platform for Startups
      ## Why are you building it: Post-PMF Startups need streamlined skill-based assessment and culture fit for volume hiring to retain accuracy & increase speed, Post-PMF Startups need streamlined skill-based assessment and culture fit for volume hiring to retain accuracy & increase speed
      ## How are you building it: Tailored validation challenge using Multiple multimodal AI Agent
      ## Why is the team the one for building the product: In-depth personal experience resource in the field + strong team with execution
      ## Why now building the product: AI Agent development enables tailored accurate skill-based talent validation at scale
      ## What is the current traction: Developing DEMO for Investor & Potential Customers`,
            },

            { role: "user", content: userInput },
          ],
          max_tokens: 150,
          temperature: 0.5,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      console.log("Full API Response:", response.data);

      if (
        response.data &&
        response.data.choices &&
        response.data.choices[0] &&
        response.data.choices[0].message &&
        response.data.choices[0].message.content
      ) {
        console.log(response.data.choices[0].message.content);
        return response.data.choices[0].message.content.trim();
      } else {
        console.error("Unexpected API response format:", response.data);
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error(
        "Error getting AI response:",
        error.response ? error.response.data : error.message
      );
      return "Sorry, I couldn't understand that.";
    }
  };
  
  const handleDeleteOldHistory = async () => {
  try {
    // Call the deleteOldMessages API
    await axios.post("http://localhost:5001/deleteOldMessages", { limit: 1 }); 
    // Fetch the updated messages list after deletion
    const response = await axios.get("http://localhost:5001/messages");
    
    // Update the state with the new messages list
    setMessages(response.data);
  } catch (error) {
    console.error("Error deleting old messages:", error);
  }
};
  return (
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
        <button onClick={handleDeleteOldHistory}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
