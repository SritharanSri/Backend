import express from 'express';
import {
  createBooking,
  getAllBookings,
  getBookingById,
  cancelBooking,
} from '../controllers/bookingController.js';

const router = express.Router();

router.post('/', createBooking);
router.get('/bookings', getAllBookings);
router.get('/bookings/:id', getBookingById);
router.delete('/bookings/:id', cancelBooking);

export default router;
