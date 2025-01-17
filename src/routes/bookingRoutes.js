import express from 'express';
import {
  createBooking,
  getAllBookings,
  getBookingById,
  cancelBooking,
  processPayment,
} from '../controllers/bookingController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the booking
 *         userId:
 *           type: string
 *           description: ID of the user making the booking
 *         busId:
 *           type: string
 *           description: ID of the bus for the booking
 *         seatNumbers:
 *           type: array
 *           items:
 *             type: string
 *           description: List of seat numbers booked
 *         totalPrice:
 *           type: number
 *           description: Total price for the booking
 *       required:
 *         - userId
 *         - busId
 *         - seatNumbers
 *         - totalPrice
 *       example:
 *         userId: "user123"
 *         busId: "bus456"
 *         seatNumbers: ["1A", "1B"]
 *         totalPrice: 50.0
 */

/**
 * @swagger
 * /booking/:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       201:
 *         description: Booking successfully created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /booking/bookings:
 *   get:
 *     summary: Get all bookings
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: List of all bookings
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /booking/bookings/{id}:
 *   get:
 *     summary: Get a booking by ID
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The booking ID
 *     responses:
 *       200:
 *         description: Booking details
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /booking/{id}:
 *   delete:
 *     summary: Cancel a booking
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The booking ID
 *     responses:
 *       200:
 *         description: Booking successfully canceled
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /booking/payment:
 *   post:
 *     summary: Process a payment for a booking
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookingId:
 *                 type: string
 *                 description: ID of the booking to process payment for
 *               amount:
 *                 type: number
 *                 description: Amount to be paid
 *             required:
 *               - bookingId
 *               - amount
 *             example:
 *               bookingId: "booking123"
 *               amount: 50.0
 *     responses:
 *       200:
 *         description: Payment processed successfully
 *       400:
 *         description: Invalid payment details
 *       500:
 *         description: Internal server error
 */


router.post('/', createBooking);
router.get('/bookings', getAllBookings);
router.get('/bookings/:id', getBookingById);
router.delete('/:id', cancelBooking);
router.post('/payment', processPayment);


export default router;
