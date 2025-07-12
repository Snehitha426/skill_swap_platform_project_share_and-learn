import express from 'express';
import { createSkill, getSkills, deleteSkill } from '../controllers/skillController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getSkills);
router.post('/', protect, createSkill);
router.delete('/:id', protect, adminOnly, deleteSkill);

export default router;
