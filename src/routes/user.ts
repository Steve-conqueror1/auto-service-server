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
  changePassword,
  restorePassword,
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
router.post('/password/forgot/:userId', changePassword);
router.post('/password/restore', restorePassword);

export default router;
