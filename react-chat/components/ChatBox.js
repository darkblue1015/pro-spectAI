import React, { useState } from "react";
import { OpenAIApi, Configuration } from "openai";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
// const openai = new OpenAIApi({
//   apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
// });

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");

    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `User: ${input}\nAI:`,
        max_tokens: 150,
      });

      const aiMessage = {
        sender: "ai",
        text: response.data.choices[0].text.trim(),
      };
      setMessages([...messages, userMessage, aiMessage]);
    } catch (error) {
      console.error("Error fetching response from OpenAI:", error);
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.sender === "user" ? "user-message" : "ai-message"}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatBox;
