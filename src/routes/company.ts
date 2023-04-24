import { Router } from 'express';
import {
  getCompanies,
  getCompany,
  createCompany,
  findCompaniesByService,
  editCompany,
  deleteCompany,
  getCompanyByCurrentUser,
} from '../controllers';

const router = Router();

router.get('/', getCompanies);
router.post('/', createCompany);
router.get('/:companyId', getCompany);
router.get('/myCompany/info', getCompanyByCurrentUser);
router.put('/:companyId', editCompany);
router.delete('/:companyId', deleteCompany);
router.get('/services/:serviceId', findCompaniesByService);

export default router;
