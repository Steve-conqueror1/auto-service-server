"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createService = exports.editService = exports.getService = exports.getServices = void 0;
const models_1 = require("../models");
const getServices = async (req, res, next) => {
    const { userId: adminId, userType } = req.userData;
    const { companyId } = req.query;
    const filters = {};
    if (userType === 'admin') {
        filters['adminId'] = adminId;
    }
    if (companyId) {
        filters['companyId'] = companyId;
    }
    try {
        const services = await models_1.Service.find({ ...filters });
        res.status(200).json(services);
    }
    catch (error) {
        next(error);
    }
};
exports.getServices = getServices;
const getService = async (req, res, next) => {
    const params = req.params;
    const serviceId = params.serviceId;
    try {
        const services = await models_1.Service.findOne({ _id: serviceId });
        res.status(200).json(services);
    }
    catch (error) {
        next(error);
    }
};
exports.getService = getService;
const editService = async (req, res, next) => {
    const params = req.params;
    const { serviceId } = params;
    const body = req.body;
    try {
        const editedService = await models_1.Service.findByIdAndUpdate(serviceId, { $set: body }, { new: true });
        res.status(200).json(editedService);
    }
    catch (error) {
        next(error);
    }
};
exports.editService = editService;
const createService = async (req, res, next) => {
    try {
        const { userId: adminId } = req.userData;
        const { name, description, companyId, categoryId, available } = req.body;
        const newService = await models_1.Service.create({ name, description, companyId, categoryId, adminId, available });
        const company = await models_1.Company.findById(companyId);
        const category = await models_1.ServiceCategory.findById(categoryId);
        await company?.services.push(newService._id);
        await company?.save();
        await company?.services.push(newService._id);
        await company?.save();
        await category?.services.push(newService._id);
        await category?.save();
        res.status(201).json(newService);
    }
    catch (error) {
        next(error);
    }
};
exports.createService = createService;
//# sourceMappingURL=service.js.map