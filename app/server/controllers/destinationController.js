import Destination from '../models/destinationModel.js';

export const getCities = async (req, res) => {
    try {
        const cities = await Destination.findAll({ attributes: ['city_name'] });
        res.json(cities.map(city => city.city_name));
    } catch (error) {
        res.status(500).json({ error: 'Error fetching cities' });
    }
};
