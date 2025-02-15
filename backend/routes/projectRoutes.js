const express = require("express");
const Project = require("../models/Project");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Create a new project
router.post("/create", authMiddleware, async (req, res) => {
  const { title, description, githubLink, requiredSkills } = req.body;

  try {
    const project = new Project({
      title,
      description,
      githubLink,
      requiredSkills: requiredSkills.split(","),
      postedBy: req.user.id,
    });

    await project.save();
    res.status(201).json({ message: "Project Created Successfully", project });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// Search projects
router.get("/search", async (req, res) => {
  try {
    const searchTerm = req.query.term;
    const projects = await Project.find({
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
        { requiredSkills: { $regex: searchTerm, $options: 'i' } }
      ]
    }).populate("postedBy", "name email githubID");
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error searching projects", error });
  }
});

// Get user's projects
router.get("/user/:userId", async (req, res) => {
  try {
    const projects = await Project.find({ postedBy: req.params.userId })
      .populate("postedBy", "name email githubID");
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user projects", error });
  }
});

// Get all projects
router.get("/all", async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("postedBy", "name email githubID")
      .sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects", error });
  }
});

module.exports = router;