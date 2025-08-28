import { Router } from 'express';
import {
    getExperiences,
    getExperienceById,
    createExperience,
    updateExperience,
    deleteExperience
} from '../controllers/experienceController.js';
import authMiddleware from '../middleware/auth.js';
import isHost from '../middleware/isHost.js';

const router = Router();

// Obtener todas las experiencias
router.get('/', getExperiences);

// Obtener una experiencia por ID
router.get('/:id', getExperienceById);

// Crear una nueva experiencia (solo host)
router.post('/', authMiddleware, isHost, createExperience);

// Actualizar una experiencia (solo host)
router.put('/:id', authMiddleware, isHost, updateExperience);

// Eliminar una experiencia (solo host)
router.delete('/:id', authMiddleware, isHost, deleteExperience);

export default router;
