import express from 'express';
import {
  createBus,
  getBuses,
  getBusById,
  updateBus,
  deleteBus,
} from '../controllers/busController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';  // Import the middlewares

const router = express.Router();

// Protect all bus routes and allow only admin users
router.use(protect);  // Protect all the routes below

// Create a new bus (only accessible by admin)
router.post('/', authorizeRoles('admin'), createBus);

// Get all buses (only accessible by admin)
router.get('/', authorizeRoles('admin'), getBuses);

// Get a specific bus by ID (only accessible by admin)
router.get('/:id', authorizeRoles('admin'), getBusById);

// Update a bus by ID (only accessible by admin)
router.put('/:id', authorizeRoles('admin'), updateBus);

// Delete a bus by ID (only accessible by admin)
router.delete('/:id', authorizeRoles('admin'), deleteBus);

export default router;
