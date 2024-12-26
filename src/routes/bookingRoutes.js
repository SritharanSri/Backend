const express = require('express');
const { createBooking, getBookings } = require('../controllers/bookingController');
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authenticate, createBooking);
router.get('/', authenticate, getBookings);

module.exports = router;
