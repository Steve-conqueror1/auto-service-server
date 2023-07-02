import { Router } from 'express';
import { createSchedule, deleteSchedule, updateSchedule } from '../controllers';

const router = Router();

router.post('/', createSchedule);
router.delete('/:eventId', deleteSchedule);

router.put('/:eventId', updateSchedule);

export default router;
