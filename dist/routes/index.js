"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRoutes = exports.statisticsRoutes = exports.orderResponseRoutes = exports.authRoutes = exports.serviceCategories = exports.orderRoutes = exports.serviceRoutes = exports.companyRoutes = exports.userRoutes = void 0;
var user_1 = require("./user");
Object.defineProperty(exports, "userRoutes", { enumerable: true, get: function () { return __importDefault(user_1).default; } });
var company_1 = require("./company");
Object.defineProperty(exports, "companyRoutes", { enumerable: true, get: function () { return __importDefault(company_1).default; } });
var service_1 = require("./service");
Object.defineProperty(exports, "serviceRoutes", { enumerable: true, get: function () { return __importDefault(service_1).default; } });
var order_1 = require("./order");
Object.defineProperty(exports, "orderRoutes", { enumerable: true, get: function () { return __importDefault(order_1).default; } });
var serviceCategories_1 = require("./serviceCategories");
Object.defineProperty(exports, "serviceCategories", { enumerable: true, get: function () { return __importDefault(serviceCategories_1).default; } });
var auth_1 = require("./auth");
Object.defineProperty(exports, "authRoutes", { enumerable: true, get: function () { return __importDefault(auth_1).default; } });
var orderResponse_1 = require("./orderResponse");
Object.defineProperty(exports, "orderResponseRoutes", { enumerable: true, get: function () { return __importDefault(orderResponse_1).default; } });
var statistics_1 = require("./statistics");
Object.defineProperty(exports, "statisticsRoutes", { enumerable: true, get: function () { return __importDefault(statistics_1).default; } });
var eventSchedule_1 = require("./eventSchedule");
Object.defineProperty(exports, "eventRoutes", { enumerable: true, get: function () { return __importDefault(eventSchedule_1).default; } });
//# sourceMappingURL=index.js.map