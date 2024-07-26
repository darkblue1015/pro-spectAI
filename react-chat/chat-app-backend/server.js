const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/chat-app");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define schema and model
const messageSchema = new mongoose.Schema({
  sender: String,
  text: String,
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

// Routes
app.get("/messages", async (req, res) => {
  const messages = await Message.find();
  res.json(messages);
});

app.post("/messages", async (req, res) => {
  const newMessage = new Message(req.body);
  await newMessage.save();
  res.status(201).json(newMessage);
});

// Start the server
const port = process.env.PORT || 5001; // Change the port to 5001
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});