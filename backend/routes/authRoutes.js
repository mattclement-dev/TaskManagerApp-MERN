import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUserProfile } from '../controllers/authController.js'; 
import protect from '../middleware/authMiddleware.js'; // Middleware to protect routes

const router = express.Router();

//Authentication routes
router.post('/register', registerUser); // Register a new user
router.post('/login', loginUser); // Login a user
router.get('/profile', protect, getUserProfile); // Get user profile
router.put('/profile', protect, updateUserProfile); // Update user profile

export default router;
