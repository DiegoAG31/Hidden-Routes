import express from 'express';
import auth from '../middleware/auth.js';
import bookingController from '../controllers/bookingController.js';

const router = express.Router();

router.get('/', auth, bookingController.getAllBookings);
router.post('/', auth, bookingController.createBooking);

export default router;
