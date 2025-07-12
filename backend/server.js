import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();
app.use(cors());
app.use(express.json());

// Import Routes
import userRoutes from './routes/userRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import swapRoutes from './routes/swapRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/swaps', swapRoutes);
app.use('/api/admin', adminRoutes);

// Define port from .env or default to 5000
const PORT = process.env.PORT || 5000;

// Connect to MongoDB using MONGO_URI from .env and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
