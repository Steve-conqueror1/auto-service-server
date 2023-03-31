import { Router } from 'express';
import { getCompanies, getCompany, createCompany, findCompaniesByService } from '../controllers';

const router = Router();

router.get('/', getCompanies);
router.post('/', createCompany);
router.get('/:companyId', getCompany);
router.get('/services/:serviceId', findCompaniesByService);

export default router;
