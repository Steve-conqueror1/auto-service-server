import { Router } from 'express';
import { getCompanies, getCompany } from '../controllers';

const router = Router();

router.get('/', getCompanies);
router.get('/:companyId', getCompany);

export default router;
