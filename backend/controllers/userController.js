import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register new user
export const registerUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
};

// Get own profile
export const getProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get profile' });
  }
};

// Update profile
export const updateProfile = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update profile' });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isPublic: true }).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
