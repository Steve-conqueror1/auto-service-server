import { Router } from 'express';
import { createOrderResponse } from '../controllers/orderResponse';

const router = Router();

router.post('/', createOrderResponse);

export default router;
