import User from '../models/User.js';
import SwapRequest from '../models/SwapRequest.js';
import Skill from '../models/Skill.js';

// Ban a user
export const banUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { isBanned: true }, { new: true });
  res.json(user);
};

// View all swap stats
export const getSwapStats = async (req, res) => {
  const totalSwaps = await SwapRequest.countDocuments();
  const pending = await SwapRequest.countDocuments({ status: 'pending' });
  const accepted = await SwapRequest.countDocuments({ status: 'accepted' });
  res.json({ totalSwaps, pending, accepted });
};

// Broadcast message (for demo, just log)
export const broadcastMessage = async (req, res) => {
  console.log(`📢 Message to all: ${req.body.message}`);
  res.json({ message: 'Message broadcasted' });
};

// Reject a skill (delete it)
export const rejectSkill = async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.json({ message: 'Skill rejected' });
};



// Get all users (excluding password)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // exclude passwords
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};