import express from 'express';
import {
  createBooking,
  getAllBookings,
  getBookingById,
  cancelBooking,
  processPayment,
} from '../controllers/bookingController.js';

const router = express.Router();

router.post('/', createBooking);
router.get('/bookings', getAllBookings);
router.get('/bookings/:id', getBookingById);
router.delete('/bookings/:id', cancelBooking);
router.post('/payment', processPayment);


export default router;
