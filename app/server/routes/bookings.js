import { Router } from 'express';
import {
	getBookings,
	getBookingById,
	createBooking,
	updateBooking,
	deleteBooking
} from '../controllers/bookingController.js';

const router = Router();

// Obtener todas las reservas
router.get('/', getBookings);

// Obtener una reserva por ID
router.get('/:id', getBookingById);

// Crear una nueva reserva
router.post('/', createBooking);

// Actualizar una reserva
router.put('/:id', updateBooking);

// Eliminar una reserva
router.delete('/:id', deleteBooking);

export default router;
