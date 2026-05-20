import { Router } from 'express';
import { signup, login, logout, getProfile } from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Public Authentication Endpoints
router.post('/signup', signup);
router.post('/login', login);

// Invalidate token / sign out
router.post('/logout', logout);

// Protected Verification Endpoint
router.get('/profile', requireAuth, getProfile);

export default router;
