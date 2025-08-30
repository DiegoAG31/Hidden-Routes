import { Router } from 'express';
import { register, login, getProfile, updateProfile } from '../controllers/authController.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
// Obtener perfil del usuario logeado
router.get('/profile', getProfile);
// Actualizar perfil del usuario logeado
router.put('/profile', updateProfile);

export default router;