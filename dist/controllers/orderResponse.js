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
exports.createOrderResponse = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const models_1 = require("../models");
const helpers_1 = require("../helpers");
const createOrderResponse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { order, status } = body;
    const { userType } = req.userData;
    try {
        if (userType !== 'admin') {
            throw (0, http_errors_1.default)(401, 'У вас нет разрешения на создание заказа');
        }
        const newResponse = yield models_1.OrderResponse.create(body);
        const respondingOrder = yield models_1.Order.findById(order).populate('createdBy').populate('company');
        yield (respondingOrder === null || respondingOrder === void 0 ? void 0 : respondingOrder.responses.push(newResponse._id));
        yield (respondingOrder === null || respondingOrder === void 0 ? void 0 : respondingOrder.updateOne({ status }));
        yield (respondingOrder === null || respondingOrder === void 0 ? void 0 : respondingOrder.save());
        const orderCreator = respondingOrder.createdBy;
        const orderCompany = respondingOrder.company;
        const creatorEmail = orderCreator.email;
        (0, helpers_1.notify)('orderResponse', { email: creatorEmail, companyName: orderCompany.name });
        res.status(201).json(newResponse);
    }
    catch (error) {
        next(error);
    }
});
exports.createOrderResponse = createOrderResponse;
//# sourceMappingURL=orderResponse.js.map