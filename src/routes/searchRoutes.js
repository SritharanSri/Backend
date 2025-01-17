import express from 'express';
import { searchBuses } from '../controllers/searchController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     SearchRequest:
 *       type: object
 *       properties:
 *         travelDate:
 *           type: string
 *           format: date
 *           description: The date of travel
 *         startPlace:
 *           type: string
 *           description: The starting location of the journey
 *         endPlace:
 *           type: string
 *           description: The destination of the journey
 *       required:
 *         - travelDate
 *         - startPlace
 *         - endPlace
 *       example:
 *         travelDate: "2025-01-20"
 *         startPlace: "City A"
 *         endPlace: "City B"
 * 
 *     SearchResult:
 *       type: object
 *       properties:
 *         route:
 *           type: object
 *           properties:
 *             startPlace:
 *               type: string
 *             endPlace:
 *               type: string
 *         travelDate:
 *           type: string
 *           format: date
 *         availableBuses:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               busId:
 *                 type: string
 *                 description: ID of the bus
 *               number:
 *                 type: string
 *                 description: The bus number
 *               pricePerSeat:
 *                 type: number
 *                 description: The cost per seat for the bus
 *               availableSeats:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     seatNumber:
 *                       type: string
 *                     status:
 *                       type: string
 *                       enum: [available, booked]
 *       example:
 *         route:
 *           startPlace: "City A"
 *           endPlace: "City B"
 *         travelDate: "2025-01-20"
 *         availableBuses:
 *           - busId: "bus123"
 *             number: "AB123"
 *             pricePerSeat: 25.5
 *             availableSeats:
 *               - seatNumber: "1A"
 *                 status: "available"
 *               - seatNumber: "2B"
 *                 status: "available"
 */

/**
 * @swagger
 * /search/:
 *   post:
 *     summary: Search for buses based on travel date and route
 *     tags: [Search]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SearchRequest'
 *     responses:
 *       200:
 *         description: Search results returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SearchResult'
 *       404:
 *         description: No buses found for the specified criteria
 *       500:
 *         description: Internal server error
 */


router.post('/', searchBuses);

export default router;
