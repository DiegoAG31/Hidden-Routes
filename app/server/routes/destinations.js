import { Router } from 'express';
import { getCities } from '../controllers/destinationController.js';

const router = Router();

router.get('/cities', getCities);

export default router;
