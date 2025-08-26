const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const bookingController = require('../controllers/bookingController');

router.get('/', auth, bookingController.getAllBookings);

router.post('/', auth, bookingController.createBooking);

module.exports = router;