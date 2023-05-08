"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.get('/', controllers_1.getCompanies);
router.post('/', controllers_1.createCompany);
router.get('/:companyId', controllers_1.getCompany);
router.get('/myCompany/info', controllers_1.getCompanyByCurrentUser);
router.put('/:companyId', controllers_1.editCompany);
router.delete('/:companyId', controllers_1.deleteCompany);
router.get('/services/:serviceId', controllers_1.findCompaniesByService);
exports.default = router;
//# sourceMappingURL=company.js.map