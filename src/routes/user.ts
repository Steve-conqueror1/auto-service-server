import { Router } from 'express';
import { getUsers, getUser, editUser, deleteUser, createUser } from '../controllers';

const router = Router();
router.get('/', getUsers);
router.post('/', createUser);
router.get('/:userId', getUser);
router.put('/:userId', editUser);
router.delete('/:userId', deleteUser);

export default router;
