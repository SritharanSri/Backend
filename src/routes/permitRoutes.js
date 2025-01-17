import express from 'express';
import {
  createPermit,
  getPermits,
} from '../controllers/permitController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Permit:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the permit
 *         route:
 *           type: string
 *           description: The ID of the route for which the permit is issued
 *         bus:
 *           type: string
 *           description: The ID of the bus associated with the permit
 *         expiryDate:
 *           type: string
 *           format: date
 *           description: The expiry date of the permit
 *       required:
 *         - route
 *         - bus
 *         - expiryDate
 *       example:
 *         route: "route123"
 *         bus: "bus456"
 *         expiryDate: "2025-12-31"
 */

/**
 * @swagger
 * /permits/:
 *   post:
 *     summary: Create a new permit
 *     tags: [Permits]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Permit'
 *     responses:
 *       201:
 *         description: Permit created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /permits/:
 *   get:
 *     summary: Get all permits
 *     tags: [Permits]
 *     responses:
 *       200:
 *         description: List of all permits
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Permit'
 *       500:
 *         description: Internal server error
 */


router.post('/', createPermit);

router.get('/', getPermits);

export default router;
