"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServiceCategories = void 0;
const ServiceCategory_1 = require("../models/ServiceCategory");
const getServiceCategories = async (req, res, next) => {
    try {
        const servicesCategories = await ServiceCategory_1.ServiceCategory.find();
        res.status(200).json(servicesCategories);
    }
    catch (error) {
        next(error);
    }
};
exports.getServiceCategories = getServiceCategories;
//# sourceMappingURL=serviceCategory.js.map