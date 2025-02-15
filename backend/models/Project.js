const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  skillsRequired: [String],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
    createdAt: { type: Date, default: Date.now }
  }],
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);