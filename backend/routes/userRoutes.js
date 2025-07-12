import express from 'express';
import { 
  registerUser, loginUser, getProfile, updateProfile, getAllUsers 
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getProfile);
router.put('/me', protect, updateProfile);

// New public route to get all users
router.get('/', getAllUsers);

export default router;
