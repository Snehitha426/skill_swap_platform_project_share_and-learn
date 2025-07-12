import express from 'express';
import { banUser, getSwapStats, broadcastMessage, rejectSkill } from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.put('/ban-user/:id', protect, adminOnly, banUser);
router.get('/swap-stats', protect, adminOnly, getSwapStats);
router.post('/broadcast', protect, adminOnly, broadcastMessage);
router.delete('/reject-skill/:id', protect, adminOnly, rejectSkill);

export default router;
