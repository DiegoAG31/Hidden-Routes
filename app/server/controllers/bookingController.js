import Booking from '../models/bookingModel.js';

// Obtener todas las reservas
export const getBookings = async (req, res) => {
	try {
		const bookings = await Booking.findAll();
		res.json(bookings);
	} catch (error) {
		res.status(500).json({ error: 'Error al obtener reservas' });
	}
};

// Obtener una reserva por ID
export const getBookingById = async (req, res) => {
	try {
		const booking = await Booking.findOne({ where: { Booking_id: req.params.id } });
		if (!booking) return res.status(404).json({ error: 'Reserva no encontrada' });
		res.json(booking);
	} catch (error) {
		res.status(500).json({ error: 'Error al obtener la reserva' });
	}
};

// Crear una nueva reserva
export const createBooking = async (req, res) => {
	try {
		const { User_id, Experience_id, Quotes, booking_status_id } = req.body;

		if (!User_id || !Experience_id || !Quotes || !booking_status_id) {
			return res.status(400).json({ error: 'Todos los campos son obligatorios' });
		}

		const newBooking = await Booking.create({
			User_id,
			Experience_id,
			Quotes,
			booking_status_id
		});

		res.status(201).json(newBooking);
	} catch (error) {
		res.status(500).json({ error: 'Error al crear la reserva' });
	}
};

// Actualizar una reserva
export const updateBooking = async (req, res) => {
	try {
		const { id } = req.params;
		const [updated] = await Booking.update(req.body, { where: { Booking_id: id } });
		if (!updated) return res.status(404).json({ error: 'Reserva no encontrada' });
		const updatedBooking = await Booking.findByPk(id);
		res.json(updatedBooking);
	} catch (error) {
		res.status(500).json({ error: 'Error al actualizar la reserva' });
	}
};

// Eliminar una reserva
export const deleteBooking = async (req, res) => {
	try {
		const { id } = req.params;
		const deleted = await Booking.destroy({ where: { Booking_id: id } });
		if (!deleted) return res.status(404).json({ error: 'Reserva no encontrada' });
		res.json({ message: 'Reserva eliminada' });
	} catch (error) {
		res.status(500).json({ error: 'Error al eliminar la reserva' });
	}
};
