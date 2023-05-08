"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatistics = void 0;
const models_1 = require("../models");
const getStatistics = async (req, res, next) => {
    try {
        const companies = await models_1.Company.find().countDocuments();
        const users = await models_1.User.find().countDocuments();
        const orders = await models_1.Order.find().countDocuments();
        res.status(200).json({ companies, users, orders });
    }
    catch (error) {
        next(error);
    }
};
exports.getStatistics = getStatistics;
//# sourceMappingURL=statistics.js.map