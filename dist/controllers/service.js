"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createService = exports.editService = exports.getService = exports.getServices = void 0;
const models_1 = require("../models");
const getServices = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId: adminId, userType } = req.userData;
    const { companyId, categoryId } = req.query;
    const filters = {};
    if (userType === 'admin') {
        filters['adminId'] = adminId;
    }
    if (companyId) {
        filters['companyId'] = companyId;
    }
    if (categoryId) {
        filters['categoryId'] = categoryId;
    }
    try {
        const services = yield models_1.Service.find(Object.assign({}, filters));
        res.status(200).json(services);
    }
    catch (error) {
        next(error);
    }
});
exports.getServices = getServices;
const getService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const serviceId = params.serviceId;
    try {
        const services = yield models_1.Service.findOne({ _id: serviceId });
        res.status(200).json(services);
    }
    catch (error) {
        next(error);
    }
});
exports.getService = getService;
const editService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const { serviceId } = params;
    const body = req.body;
    try {
        const editedService = yield models_1.Service.findByIdAndUpdate(serviceId, { $set: body }, { new: true });
        res.status(200).json(editedService);
    }
    catch (error) {
        next(error);
    }
});
exports.editService = editService;
const createService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId: adminId } = req.userData;
        const { name, description, companyId, categoryId, available } = req.body;
        const newService = yield models_1.Service.create({ name, description, companyId, categoryId, adminId, available });
        const company = yield models_1.Company.findById(companyId);
        const category = yield models_1.ServiceCategory.findById(categoryId);
        yield (company === null || company === void 0 ? void 0 : company.services.push(newService._id));
        yield (company === null || company === void 0 ? void 0 : company.save());
        yield (company === null || company === void 0 ? void 0 : company.services.push(newService._id));
        yield (company === null || company === void 0 ? void 0 : company.save());
        yield (category === null || category === void 0 ? void 0 : category.services.push(newService._id));
        yield (category === null || category === void 0 ? void 0 : category.save());
        res.status(201).json(newService);
    }
    catch (error) {
        next(error);
    }
});
exports.createService = createService;
//# sourceMappingURL=service.js.map