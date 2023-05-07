import { Router } from 'express';
import { getOrders, getOrder, createOrder, editOrder, getStatistics } from '../controllers';

const router = Router();

router.get('/', getOrders);
router.post('/', createOrder);
router.get('/:orderId', getOrder);
router.put('/:orderId', editOrder);
router.put('/', getStatistics);

export default router;
