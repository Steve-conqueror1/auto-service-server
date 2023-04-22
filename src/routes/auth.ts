import { Router } from 'express';
import { login, editUser, changePassword, restorePassword } from '../controllers';

const router = Router();

router.post('/login', login);
router.put('/:userId', editUser);
router.put('/password/forgot/:userId', changePassword);
router.post('/password/restore', restorePassword);

export default router;
