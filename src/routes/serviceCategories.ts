import { Router } from 'express';
import { getServiceCategories } from '../controllers';

const router = Router();

router.get('/', getServiceCategories);

export default router;
