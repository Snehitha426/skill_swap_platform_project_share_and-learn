import Skill from '../models/Skill.js';

// Create a new skill
export const createSkill = async (req, res) => {
  const { name, description } = req.body;
  const skill = new Skill({
    name,
    description,
    createdBy: req.user._id,
  });
  await skill.save();
  res.status(201).json(skill);
};

// Get all skills (for browsing)
export const getSkills = async (req, res) => {
  const skills = await Skill.find().populate('createdBy', 'name');
  res.json(skills);
};

// Delete a skill (admin only)
export const deleteSkill = async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.json({ message: 'Skill deleted' });
};
