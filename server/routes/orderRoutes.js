
import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';

import {
  createOrder,
  getMyOrders,
  getOrderById
} from '../controllers/orderController.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', createOrder);
router.get('/my-orders', getMyOrders);
router.get('/:id', getOrderById);

export default router;
