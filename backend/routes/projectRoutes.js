const express = require("express");
const Project = require("../models/Project");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// ✅ Create a new project
router.post("/create", authMiddleware, async (req, res) => {
  const { title, description, githubLink, requiredSkills } = req.body;

  if (!title || !description || !githubLink || !requiredSkills) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const project = new Project({
      title,
      description,
      githubLink,
      requiredSkills: requiredSkills.split(","), // Convert skills into an array
      postedBy: req.user.id,
    });

    await project.save();
    res.status(201).json({ message: "Project Created Successfully", project });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// ✅ Fetch all projects
router.get("/all", async (req, res) => {
  try {
    const projects = await Project.find().populate("postedBy", "name email githubID");
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects", error });
  }
});

module.exports = router;
