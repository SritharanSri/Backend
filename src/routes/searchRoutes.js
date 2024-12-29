import express from 'express';
import { searchBuses } from '../controllers/searchController.js';

const router = express.Router();

router.post('/', searchBuses);

export default router;
