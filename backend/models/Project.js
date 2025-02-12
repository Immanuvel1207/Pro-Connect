const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  githubLink: { type: String, required: true },
  requiredSkills: { type: [String], required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Project", ProjectSchema);
