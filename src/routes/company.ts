import { Router } from 'express';
import {
  getCompanies,
  getCompany,
  createCompany,
  findCompaniesByService,
  editCompany,
  deleteCompany,
} from '../controllers';

const router = Router();

router.get('/', getCompanies);
router.post('/', createCompany);
router.get('/:companyId', getCompany);
router.put('/:companyId', editCompany);
router.delete('/:companyId', deleteCompany);
router.get('/services/:serviceId', findCompaniesByService);

export default router;
