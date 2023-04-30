import { Router } from 'express';
import { getServices, getService, createService, editService } from '../controllers';

const router = Router();

router.get('/', getServices);
router.get('/:serviceId', getService);
router.post('/', createService);
router.put('/:serviceId', editService);

export default router;
