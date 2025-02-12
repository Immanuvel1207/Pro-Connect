const express = require("express");
const Message = require("../models/Message");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Send a message
router.post("/send", authMiddleware, async (req, res) => {
  const { receiver, content } = req.body;
  const message = new Message({ sender: req.user.id, receiver, content });
  await message.save();
  res.json({ message: "Message Sent", message });
});

// Fetch messages between two users
router.get("/:userId", authMiddleware, async (req, res) => {
  const messages = await Message.find({
    $or: [
      { sender: req.user.id, receiver: req.params.userId },
      { sender: req.params.userId, receiver: req.user.id }
    ]
  }).sort({ timestamp: 1 });

  res.json(messages);
});

module.exports = router;
