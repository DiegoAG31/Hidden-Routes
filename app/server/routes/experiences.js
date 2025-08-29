
import { Router } from 'express';
import {
    getExperiences,
    getExperienceById,
    createExperience,
    updateExperience,
    deleteExperience
} from '../controllers/experienceController.js';
import upload from '../middleware/uploadExperienceImg.js';

const router = Router();

// Obtener todas las experiencias
router.get('/', getExperiences);

// Obtener una experiencia por ID
router.get('/:id', getExperienceById);

// Crear una nueva experiencia con imagen
router.post('/', upload.single('experience_img'), createExperience);

// Actualizar una experiencia (solo host)
router.put('/:id', updateExperience);

// Eliminar una experiencia (solo host)
router.delete('/:id', deleteExperience);

export default router;
