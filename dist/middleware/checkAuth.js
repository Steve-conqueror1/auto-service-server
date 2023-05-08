"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw (0, http_errors_1.default)(401, 'Ошибка аутентификации');
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, `${process.env.SECRET}`);
        req.userData = { userId: decodedToken.userId, userType: decodedToken.userType };
        next();
    }
    catch (error) {
        return next(error);
    }
};
exports.checkAuth = checkAuth;
//# sourceMappingURL=checkAuth.js.map