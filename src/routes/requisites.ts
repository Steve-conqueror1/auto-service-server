import { Router } from 'express';
import {
  createCompanyRequisite,
  deleteCompanyRequisite,
  editCompanyRequisite,
  getCompanyRequisites,
} from '../controllers';

const router = Router();

router.get('/', getCompanyRequisites);
router.put('/:requisiteId', editCompanyRequisite);
router.post('/:companyId', createCompanyRequisite);
router.delete('/:requisiteId', deleteCompanyRequisite);

export default router;
