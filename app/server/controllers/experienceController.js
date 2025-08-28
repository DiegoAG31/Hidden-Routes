import Experience from '../models/experienceModel.js';

// Obtener todas las experiencias
export const getExperiences = async (req, res) => {
    try {
        const experiences = await Experience.findAll();
        res.json(experiences);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener experiencias' });
    }
};

// Obtener una experiencia por ID
export const getExperienceById = async (req, res) => {
    try {
        const experience = await Experience.findByPk(req.params.id);
        if (!experience) return res.status(404).json({ error: 'Experiencia no encontrada' });
        res.json(experience);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la experiencia' });
    }
};

// Crear una nueva experiencia
export const createExperience = async (req, res) => {
    try {
        const { Experience_title, Experience_description, Price, Capacity, user_id } = req.body;
        const newExperience = await Experience.create({
            Experience_title,
            Experience_description,
            Price,
            Capacity,
            user_id
        });
        res.status(201).json(newExperience);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la experiencia' });
    }
};

// Actualizar una experiencia
export const updateExperience = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Experience.update(req.body, { where: { Experience_id: id } });
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
        const deleted = await Experience.destroy({ where: { Experience_id: id } });
        if (!deleted) return res.status(404).json({ error: 'Experiencia no encontrada' });
        res.json({ message: 'Experiencia eliminada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la experiencia' });
    }
};
