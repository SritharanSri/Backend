import express from 'express';
import {
  createBus,
  getBuses,
  getBusById,
  updateBus,
  deleteBus,
} from '../controllers/busController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';  

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Bus:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the bus
 *         number:
 *           type: string
 *           description: The unique bus number
 *         capacity:
 *           type: number
 *           description: The total seating capacity of the bus
 *         route:
 *           type: string
 *           description: ID of the route assigned to the bus
 *       required:
 *         - number
 *         - capacity
 *         - route
 *       example:
 *         number: "AB123"
 *         capacity: 50
 *         route: "route456"
 */

/**
 * @swagger
 * /buses/:
 *   post:
 *     summary: Create a new bus
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bus'
 *     responses:
 *       201:
 *         description: Bus created successfully
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Forbidden (only admins can access this route)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /buses/:
 *   get:
 *     summary: Get a list of all buses
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all buses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bus'
 *       403:
 *         description: Forbidden (only admins can access this route)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /buses/{id}:
 *   get:
 *     summary: Get a bus by ID
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the bus
 *     responses:
 *       200:
 *         description: Bus details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bus'
 *       404:
 *         description: Bus not found
 *       403:
 *         description: Forbidden (only admins can access this route)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /buses/{id}:
 *   put:
 *     summary: Update a bus by ID
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the bus
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bus'
 *     responses:
 *       200:
 *         description: Bus updated successfully
 *       404:
 *         description: Bus not found
 *       403:
 *         description: Forbidden (only admins can access this route)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /buses/{id}:
 *   delete:
 *     summary: Delete a bus by ID
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the bus
 *     responses:
 *       200:
 *         description: Bus deleted successfully
 *       404:
 *         description: Bus not found
 *       403:
 *         description: Forbidden (only admins can access this route)
 *       500:
 *         description: Internal server error
 */


router.use(protect);

router.post('/', authorizeRoles('admin'), createBus);

router.get('/', authorizeRoles('admin'), getBuses);

router.get('/:id', authorizeRoles('admin'), getBusById);

router.put('/:id', authorizeRoles('admin'), updateBus);

router.delete('/:id', authorizeRoles('admin'), deleteBus);

export default router;
