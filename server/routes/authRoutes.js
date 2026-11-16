
import express from 'express';

import {
    registerUser,
    loginUser,
    adminLogin,
    getCurrentUser
} from '../controllers/authController.js';

import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Customer authentication
router.post('/register', registerUser);
router.post('/login', loginUser);

// Dedicated admin authentication
router.post('/admin/login', adminLogin);

// Protected account information
router.get('/me', protect, getCurrentUser);

export default router;
