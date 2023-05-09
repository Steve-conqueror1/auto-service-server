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
exports.getStatistics = void 0;
const models_1 = require("../models");
const getStatistics = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companies = yield models_1.Company.find().countDocuments();
        const users = yield models_1.User.find().countDocuments();
        const orders = yield models_1.Order.find().countDocuments();
        res.status(200).json({ companies, users, orders });
    }
    catch (error) {
        next(error);
    }
});
exports.getStatistics = getStatistics;
//# sourceMappingURL=statistics.js.map