"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restorePassword = exports.changePassword = exports.editUser = exports.login = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const models_1 = require("../models");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = require("mongoose");
const helpers_1 = require("../helpers");
const login = async (req, res, next) => {
    const body = req.body;
    const { email, password } = body;
    try {
        if (!email || !password) {
            throw (0, http_errors_1.default)(400, 'Заполните все поля');
        }
        const user = await models_1.User.findOne({ email: email }).select('+password');
        if (!user) {
            throw (0, http_errors_1.default)(401, 'Недействительные учетные данные');
        }
        if (user.userStatus === 'blocked') {
            throw (0, http_errors_1.default)(403, 'Вы не авторизованы для входа, обратитесь к администратору');
        }
        const passwordMatch = await bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            throw (0, http_errors_1.default)(401, 'Недействительные учетные данные');
        }
        let token;
        try {
            token = jsonwebtoken_1.default.sign({ userId: user._id, userType: user.userPermission }, `${process.env.SECRET}`, {
                expiresIn: '1h',
            });
        }
        catch (error) {
            next(error);
        }
        res.status(200).json({ userId: user._id, userPermission: user.userPermission, token: token });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
const editUser = async (req, res, next) => {
    const { userId } = req.params;
    const body = req.body;
    try {
        const existingUser = await models_1.User.findOne({ _id: new mongoose_1.Types.ObjectId(userId) });
        const { firstName, secondName, password, surName } = body;
        if (!firstName || !secondName || !password || !surName) {
            throw (0, http_errors_1.default)(422, 'Заполните все поля');
        }
        if (!existingUser) {
            throw (0, http_errors_1.default)(404, 'Пользователь не найден');
        }
        const passwordHashed = await bcrypt_1.default.hash(password, 10);
        const editedUser = await models_1.User.findByIdAndUpdate(userId, { $set: { ...body, password: passwordHashed } }, { new: true });
        if (!editedUser) {
            throw (0, http_errors_1.default)(404, 'Пользователь не найден');
        }
        let token;
        try {
            token = jsonwebtoken_1.default.sign({ userId: editedUser._id, userType: editedUser.userPermission }, `${process.env.SECRET}`, {
                expiresIn: '1h',
            });
        }
        catch (error) {
            next(error);
        }
        res.status(200).json({ userId: editedUser._id, userPermission: editedUser.userPermission, token: token });
    }
    catch (error) {
        next(error);
    }
};
exports.editUser = editUser;
const changePassword = async (req, res, next) => {
    const { userId } = req.params;
    const body = req.body;
    const { password, repeatPassword } = body;
    try {
        if (password !== repeatPassword) {
            throw (0, http_errors_1.default)(400, 'Пароли должны совпадать');
        }
        const user = await models_1.User.findOne({ _id: new mongoose_1.Types.ObjectId(userId) });
        if (!user || user.userStatus === 'blocked') {
            throw (0, http_errors_1.default)(401, 'Ошибка - Связаться с администратором');
        }
        const passwordHashed = await bcrypt_1.default.hash(password, 10);
        user.password = passwordHashed;
        user.save();
        res.status(200).json({ message: 'Пароль успешно изменен' });
    }
    catch (error) {
        next(error);
    }
};
exports.changePassword = changePassword;
const restorePassword = async (req, res, next) => {
    const body = req.body;
    const { email } = body;
    try {
        const user = await models_1.User.findOne({ email });
        if (!user) {
            throw (0, http_errors_1.default)(401, 'Пользователь с таким E-mail не существует');
        }
        if (user.userStatus === 'blocked') {
            throw (0, http_errors_1.default)(401, 'Ошибка - Связаться с администратором');
        }
        const userId = user._id;
        const useEmail = user.email;
        (0, helpers_1.notify)('restorePassword', { userId: userId, email: useEmail });
        res.status(200).json({ message: 'Ссылка для смены пароля была отправлена на вашу E-mail' });
    }
    catch (error) {
        next(error);
    }
};
exports.restorePassword = restorePassword;
//# sourceMappingURL=auth.js.map