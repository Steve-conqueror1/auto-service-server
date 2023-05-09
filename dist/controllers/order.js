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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editOrder = exports.createOrder = exports.getOrder = exports.getOrders = void 0;
const models_1 = require("../models");
const helpers_1 = require("../helpers");
const http_errors_1 = __importDefault(require("http-errors"));
const getOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userType, userId } = req.userData;
    const { status } = req.query;
    const filters = {};
    try {
        if (userType === 'admin') {
            const company = yield models_1.Company.findOne({ admin: userId });
            if (company) {
                filters['company'] = company._id;
            }
            else {
                filters['company'] = '6458bc6c2c91ef6efdd575cd';
            }
        }
        if (status) {
            filters['status'] = status;
        }
        const orders = yield models_1.Order.find(Object.assign({}, filters))
            .populate('service')
            .populate('createdBy')
            .populate('company')
            .populate('responses');
        res.status(200).json(orders);
    }
    catch (error) {
        next(error);
    }
});
exports.getOrders = getOrders;
const getOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    try {
        const order = yield models_1.Order.findOne({ _id: orderId });
        res.status(200).json(order);
    }
    catch (error) {
        next(error);
    }
});
exports.getOrder = getOrder;
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { userId: createdBy } = req.userData;
    const { company } = body;
    const { userType } = req.userData;
    try {
        if (userType === 'admin') {
            throw (0, http_errors_1.default)(401, 'У вас нет разрешения на создание заказа');
        }
        const newOrder = yield models_1.Order.create(Object.assign(Object.assign({}, body), { createdBy }));
        const requestedCompany = yield models_1.Company.findById(company);
        const companyEmail = requestedCompany.email;
        (0, helpers_1.notify)('newOrder', { email: companyEmail });
        res.status(201).json(newOrder);
    }
    catch (error) {
        next(error);
    }
});
exports.createOrder = createOrder;
/**
 * Need to change order status
 * */
const editOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const body = req.body;
    try {
        const editedOrder = yield models_1.Order.findByIdAndUpdate(orderId, { $set: body }, { new: true });
        res.status(200).json(editedOrder);
    }
    catch (error) {
        next(error);
    }
});
exports.editOrder = editOrder;
//# sourceMappingURL=order.js.map