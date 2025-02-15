const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Search users
router.get("/search", async (req, res) => {
  try {
    const searchTerm = req.query.term;
    const users = await User.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { college: { $regex: searchTerm, $options: 'i' } }
      ]
    }).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error searching users", error });
  }
});

// Get user profile
router.get("/profile/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile", error });
  }
});

module.exports = router;