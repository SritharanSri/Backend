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

router.use(protect);

router.post('/', authorizeRoles('admin'), createBus);

router.get('/', authorizeRoles('admin'), getBuses);

router.get('/:id', authorizeRoles('admin'), getBusById);

router.put('/:id', authorizeRoles('admin'), updateBus);

router.delete('/:id', authorizeRoles('admin'), deleteBus);

export default router;
