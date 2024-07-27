// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const app = express();

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// // Connect to MongoDB
// mongoose.connect("mongodb://localhost:27017/chat-app");

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//   console.log("Connected to MongoDB");
// });

// // Define schema and model
// const messageSchema = new mongoose.Schema({
//   sender: String,
//   text: String,
//   timestamp: { type: Date, default: Date.now },
// });

// const Message = mongoose.model("Message", messageSchema);

// // Routes
// app.get("/messages", async (req, res) => {
//   const messages = await Message.find();
//   res.json(messages);
// });

// app.post("/messages", async (req, res) => {
//   const newMessage = new Message(req.body);
//   await newMessage.save();
//   res.status(201).json(newMessage);
// });


// // Start the server
// const port = process.env.PORT || 5001; // Change the port to 5001
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/chat-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

// Route to delete old messages
app.post("/deleteOldMessages", async (req, res) => {
  const limit = req.body.limit || 50;
  try {
    const allMessages = await Message.find().sort({ timestamp: 1 }); // Sort by oldest first
    if (allMessages.length > limit) {
      const messagesToDelete = allMessages.slice(0, allMessages.length - limit);
      const deletePromises = messagesToDelete.map(msg => Message.findByIdAndDelete(msg._id));
      await Promise.all(deletePromises);
    }
    res.status(200).send({ message: "Old messages deleted" });
  } catch (error) {
    res.status(500).send({ error: "Error deleting old messages" });
  }
});

// Start the server
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
