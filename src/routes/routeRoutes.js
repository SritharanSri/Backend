import express from 'express';
import {
  createRoute,
  getRoutes,
  getRouteById,
  updateRoute,
  deleteRoute,
} from '../controllers/routeController.js';

const router = express.Router();

// Create a new route
router.post('/', createRoute);

// Get all routes
router.get('/', getRoutes);

// Get a specific route by ID
router.get('/:id', getRouteById);

// Update a route by ID
router.put('/:id', updateRoute);

// Delete a route by ID
router.delete('/:id', deleteRoute);

export default router;
