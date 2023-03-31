import { Router } from 'express';
import { getServices, getService, createService } from '../controllers/service';

const router = Router();

router.get('/', getServices);
router.get('/:serviceId', getService);
router.post('/', createService);

export default router;
