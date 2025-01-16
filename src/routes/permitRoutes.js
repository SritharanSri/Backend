import express from 'express';
import {
  createPermit,
  getPermits,
} from '../controllers/permitController.js';

const router = express.Router();

router.post('/', createPermit);

router.get('/', getPermits);

export default router;
