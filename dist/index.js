"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = require("./routes");
const http_errors_1 = __importStar(require("http-errors"));
const checkAuth_1 = require("./middleware/checkAuth");
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    credentials: true,
}));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use('/api/auth', routes_1.authRoutes);
app.use(checkAuth_1.checkAuth);
app.use('/api/companies', routes_1.companyRoutes);
app.use('/api/services', routes_1.serviceRoutes);
app.use('/api/orders', routes_1.orderRoutes);
app.use('/api/users', routes_1.userRoutes);
app.use('/api/serviceCategories', routes_1.serviceCategories);
app.use('/api/order/response', routes_1.orderResponseRoutes);
app.use('/api/statistics', routes_1.statisticsRoutes);
app.use('/api/schedule', routes_1.eventRoutes);
app.use((req, res, next) => {
    next((0, http_errors_1.default)(404, '404 - endpoint не существует'));
});
app.use((error, req, res, next) => {
    let errorMessage = 'Что-то пошло не так!';
    let statusCode = 500;
    if ((0, http_errors_1.isHttpError)(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    return res.status(statusCode).json({
        message: errorMessage,
    });
});
const PORT = process.env.PORT || 5000;
mongoose_1.default
    .connect(`${process.env.MONGO_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server connected at PORT ${PORT}`);
    });
})
    .catch((err) => {
    console.log(err.message);
});
//# sourceMappingURL=index.js.map