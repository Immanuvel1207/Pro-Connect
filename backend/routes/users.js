const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/profile', auth, async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'bio', 'skills'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ error: 'Invalid updates' });
    }

    updates.forEach(update => req.user[update] = req.body[update]);
    await req.user.save();
    res.json(req.user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password').populate('projects');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API endpoint to fetch user profile
router.get('/', async (req, res) => {
  try {
    const user = req.user;
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Error fetching user profile' });
  }
});

// API endpoint to fetch user's projects
router.get('/:userId/projects', async (req, res) => {
  try {
    const userId = req.params.userId;
    const userProjects = await Project.find({ userId });
    res.json(userProjects);
  } catch (error) {
    console.error('Error fetching user projects:', error);
    res.status(500).json({ message: 'Error fetching user projects' });
  }
});

module.exports = router;