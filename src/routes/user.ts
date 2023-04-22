import { Router } from 'express';
import {
  getUsers,
  getUser,
  deleteUser,
  createUser,
  changeUserStatus,
  changeUserPermission,
  getAuthenticatedUser,
} from '../controllers';

const router = Router();
router.get('/', getUsers);
router.post('/', createUser);
router.get('/:userId', getUser);
router.delete('/:userId', deleteUser);
router.patch('/:userId/status', changeUserStatus);
router.patch('/:userId/permission', changeUserPermission);
router.get('/authenticated/getAuthenticatedUser', getAuthenticatedUser);

export default router;
