"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderResponse = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const models_1 = require("../models");
const helpers_1 = require("../helpers");
const createOrderResponse = async (req, res, next) => {
    const body = req.body;
    const { order, status } = body;
    const { userType } = req.userData;
    try {
        if (userType !== 'admin') {
            throw (0, http_errors_1.default)(401, 'У вас нет разрешения на создание заказа');
        }
        const newResponse = await models_1.OrderResponse.create(body);
        const respondingOrder = await models_1.Order.findById(order).populate('createdBy').populate('company');
        await respondingOrder?.responses.push(newResponse._id);
        await respondingOrder?.updateOne({ status });
        await respondingOrder?.save();
        const orderCreator = respondingOrder.createdBy;
        const orderCompany = respondingOrder.company;
        const creatorEmail = orderCreator.email;
        (0, helpers_1.notify)('orderResponse', { email: creatorEmail, companyName: orderCompany.name });
        res.status(201).json(newResponse);
    }
    catch (error) {
        next(error);
    }
};
exports.createOrderResponse = createOrderResponse;
//# sourceMappingURL=orderResponse.js.map