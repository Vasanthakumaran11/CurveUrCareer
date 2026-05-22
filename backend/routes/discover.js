import { Router } from 'express';
import { saveProgress, completeDiscovery, getDiscoveryResults } from '../controllers/discoverController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Gated Discovery Routes (require active authenticated user session)
router.post('/progress', requireAuth, saveProgress);
router.post('/complete', requireAuth, completeDiscovery);
router.get('/results', requireAuth, getDiscoveryResults);

export default router;
