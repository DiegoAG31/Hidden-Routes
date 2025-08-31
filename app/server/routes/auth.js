import { Router } from 'express';
import { register, login, getProfile, updateProfile } from '../controllers/authController.js';
import uploadProfile from '../middleware/uploadProfileImg.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
// Obtener perfil del usuario logeado
router.get('/profile', getProfile);
// Actualizar perfil del usuario logeado
router.put('/profile', uploadProfile.single('user_img'), updateProfile);

export default router;