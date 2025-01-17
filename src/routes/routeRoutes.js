import express from 'express';
import {
  createRoute,
  getRoutes,
  getRouteById,
  updateRoute,
  deleteRoute,
} from '../controllers/routeController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Route:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the route
 *         startLocation:
 *           type: string
 *           description: The starting location of the route
 *         endLocation:
 *           type: string
 *           description: The ending location of the route
 *         pricePerSeat:
 *           type: number
 *           description: Price per seat for the route
 *       required:
 *         - startLocation
 *         - endLocation
 *         - pricePerSeat
 *       example:
 *         startLocation: "City A"
 *         endLocation: "City B"
 *         pricePerSeat: 25.5
 */

/**
 * @swagger
 * /routes/:
 *   post:
 *     summary: Create a new route
 *     tags: [Routes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Route'
 *     responses:
 *       201:
 *         description: Route created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /routes/:
 *   get:
 *     summary: Get all routes
 *     tags: [Routes]
 *     responses:
 *       200:
 *         description: List of all routes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Route'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /routes/{id}:
 *   get:
 *     summary: Get a route by ID
 *     tags: [Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the route
 *     responses:
 *       200:
 *         description: Route details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Route'
 *       404:
 *         description: Route not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /routes/{id}:
 *   put:
 *     summary: Update a route by ID
 *     tags: [Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the route
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Route'
 *     responses:
 *       200:
 *         description: Route updated successfully
 *       404:
 *         description: Route not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /routes/{id}:
 *   delete:
 *     summary: Delete a route by ID
 *     tags: [Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the route
 *     responses:
 *       200:
 *         description: Route deleted successfully
 *       404:
 *         description: Route not found
 *       500:
 *         description: Internal server error
 */


router.post('/', createRoute);

router.get('/', getRoutes);

router.get('/:id', getRouteById);

router.put('/:id', updateRoute);

router.delete('/:id', deleteRoute);

export default router;
