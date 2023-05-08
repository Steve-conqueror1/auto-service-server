"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthenticatedUser = exports.changeUserPermission = exports.changeUserStatus = exports.deleteUser = exports.getUser = exports.createUser = exports.getUsers = void 0;
const mongoose_1 = require("mongoose");
const http_errors_1 = __importDefault(require("http-errors"));
const models_1 = require("../models");
const helpers_1 = require("../helpers");
const getUsers = async (req, res, next) => {
    try {
        const users = await models_1.User.find();
        res.status(200).json(users);
    }
    catch (error) {
        next(error);
    }
};
exports.getUsers = getUsers;
const createUser = async (req, res, next) => {
    const body = req.body;
    try {
        const { email, userPermission } = body;
        const existingEmail = await models_1.User.findOne({ email: email });
        if (existingEmail) {
            throw (0, http_errors_1.default)(409, 'Пользователь с этим адресом электронной почты уже существует');
        }
        if (!userPermission) {
            throw (0, http_errors_1.default)(409, 'Пожалуйста, укажите права пользователя');
        }
        const newUser = await models_1.User.create(body);
        res.status(201).json(newUser);
        (0, helpers_1.notify)('registration', { email, userId: newUser._id });
    }
    catch (error) {
        next(error);
    }
};
exports.createUser = createUser;
const getUser = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const user = await models_1.User.findOne({ _id: new mongoose_1.Types.ObjectId(userId) });
        if (!user) {
            throw (0, http_errors_1.default)(404, 'Пользователь не найден');
        }
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
};
exports.getUser = getUser;
const deleteUser = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const user = await models_1.User.findOne({ _id: new mongoose_1.Types.ObjectId(userId) });
        if (!user) {
            throw (0, http_errors_1.default)(409, 'Пользователь не найден');
        }
        await models_1.User.findByIdAndDelete(userId);
        res.status(200).json({ message: 'Пользователь успешно удален' });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteUser = deleteUser;
const changeUserStatus = async (req, res, next) => {
    const { userId } = req.params;
    const body = req.body;
    const { userStatus } = body;
    try {
        const user = await models_1.User.findOne({ _id: new mongoose_1.Types.ObjectId(userId) });
        if (!user) {
            throw (0, http_errors_1.default)(404, 'Пользователь не найден');
        }
        if (!userStatus) {
            throw (0, http_errors_1.default)(422, 'Пожалуйста, укажите статус');
        }
        const updatedUser = await models_1.User.findByIdAndUpdate(userId, { $set: body }, { new: true });
        res.status(200).json(updatedUser);
    }
    catch (error) {
        next(error);
    }
};
exports.changeUserStatus = changeUserStatus;
const changeUserPermission = async (req, res, next) => {
    const { userId } = req.params;
    const body = req.body;
    const { userPermission } = body;
    try {
        const user = await models_1.User.findOne({ _id: new mongoose_1.Types.ObjectId(userId) });
        if (!user) {
            throw (0, http_errors_1.default)(404, 'Пользователь не найден');
        }
        if (!userPermission) {
            throw (0, http_errors_1.default)(422, 'Пожалуйста, укажите право пользователь');
        }
        const updatedUser = await models_1.User.findByIdAndUpdate(userId, { $set: body }, { new: true });
        res.status(200).json(updatedUser);
    }
    catch (error) {
        next(error);
    }
};
exports.changeUserPermission = changeUserPermission;
const getAuthenticatedUser = async (req, res, next) => {
    const { userId } = req.userData;
    try {
        const user = await models_1.User.findOne({ _id: new mongoose_1.Types.ObjectId(userId) });
        if (!user) {
            throw (0, http_errors_1.default)(401, 'Нет аутентифицированного пользователя');
        }
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
};
exports.getAuthenticatedUser = getAuthenticatedUser;
//# sourceMappingURL=user.js.map