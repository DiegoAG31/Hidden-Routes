import Experience from '../models/experienceModel.js';
import path from 'path';

// Obtener todas las experiencias
export const getExperiences = async (req, res) => {
    try {
        const experiences = await Experience.findAll({
            include: [{
                association: 'destination',
                attributes: ['destination_name']
            }]
        });
        res.json(experiences);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener experiencias' });
    }
};

// Obtener una experiencia por ID
export const getExperienceById = async (req, res) => {
    try {
        const experience = await Experience.findOne({ where: { Experience_id: req.params.id } });
        if (!experience) return res.status(404).json({ error: 'Experiencia no encontrada' });
        res.json(experience);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la experiencia' });
    }
};

// Crear una nueva experiencia
export const createExperience = async (req, res) => {
    try {
        const { Experience_title, Experience_description, Price, Capacity, destination_id } = req.body;

        if (!Experience_title || !Experience_description || !Price || !Capacity || !destination_id) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        // Asignar user_id fijo para pruebas temporales
        const user_id = 1;

        // Si se subió imagen, guardar la ruta relativa
        let experience_img = null;
        if (req.file) {
            experience_img = `/assets/img/experiences/${req.file.filename}`;
        }

        const newExperience = await Experience.create({
            Experience_title,
            Experience_description,
            Price,
            Capacity,
            destination_id,
            user_id,
            experience_img
        });

        res.status(201).json(newExperience);
    } catch (error) {
        console.error('Error en createExperience:', error);
        res.status(500).json({ error: 'Error al crear la experiencia' });
    }
};

// Actualizar una experiencia
export const updateExperience = async (req, res) => {
    try {
        const { id } = req.params;
        // Forzar user_id = 1 temporalmente
        const user_id = 1;
        const [updated] = await Experience.update({ ...req.body, user_id }, { where: { Experience_id: id } });
        if (!updated) return res.status(404).json({ error: 'Experiencia no encontrada' });
        const updatedExperience = await Experience.findByPk(id);
        res.json(updatedExperience);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la experiencia' });
    }
};

// Eliminar una experiencia
export const deleteExperience = async (req, res) => {
    try {
        const { id } = req.params;
        // Buscar la experiencia para obtener la ruta de la imagen
        const experience = await Experience.findByPk(id);
        if (!experience) return res.status(404).json({ error: 'Experiencia no encontrada' });
        // Eliminar la imagen física si existe
        if (experience.experience_img) {
            const fs = await import('fs');
            const imgPath = path.resolve('app/public', experience.experience_img.replace(/^\/+/, ''));
            fs.unlink(imgPath, (err) => {
                // Si hay error al borrar la imagen, solo loguea
                if (err) console.error('Error al eliminar imagen:', err);
            });
        }
        // Eliminar la experiencia de la base de datos
        await Experience.destroy({ where: { Experience_id: id } });
        res.json({ message: 'Experiencia eliminada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la experiencia' });
    }
};
