// routes/skills.js
const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');

// GET all skills
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find({});
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST add new skill
router.post('/', async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Skill name required' });

  try {
    let skill = await Skill.findOne({ name });
    if (skill) return res.status(400).json({ message: 'Skill already exists' });

    skill = new Skill({ name });
    await skill.save();
    res.status(201).json(skill);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
