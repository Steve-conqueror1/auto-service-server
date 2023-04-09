import { Router } from 'express';
import {
  getUsers,
  getUser,
  editUser,
  deleteUser,
  createUser,
  changeUserStatus,
  changeUserPermission,
  login,
  logout,
} from '../controllers';

const router = Router();
router.get('/', getUsers);
router.post('/', createUser);
router.get('/:userId', getUser);
router.put('/:userId', editUser);
router.delete('/:userId', deleteUser);
router.patch('/:userId/status', changeUserStatus);
router.patch('/:userId/permission', changeUserPermission);
router.post('/login', login);
router.post('/logout', logout);

export default router;
