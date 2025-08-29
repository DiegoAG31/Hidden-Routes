import Destination from '../models/destinationModel.js';

export const getCities = async (req, res) => {
    try {
        const cities = await Destination.findAll({ attributes: ['destination_id', 'destination_name'] });
        res.json(cities);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching cities' });
    }
};
