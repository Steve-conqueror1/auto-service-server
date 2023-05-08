"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCompany = exports.editCompany = exports.findCompaniesByService = exports.createCompany = exports.getCompanyByCurrentUser = exports.getCompanies = exports.getCompany = void 0;
const models_1 = require("../models");
const http_errors_1 = __importDefault(require("http-errors"));
const axios_1 = __importDefault(require("axios"));
const getLatitudes = async (address) => {
    const res = await axios_1.default.get(`http://api.positionstack.com/v1/forward?access_key=${process.env.MAP_API_KEY}&limit=${1}&country=RU&query=${address}`, { maxRedirects: 0 });
    const resData = res.data;
    const { latitude, longitude } = resData.data[0];
    return [latitude, longitude];
};
const getCompany = async (req, res, next) => {
    const params = req.params;
    const companyId = params.companyId;
    try {
        const company = await models_1.Company.findOne({ _id: companyId }).populate('services').populate('admin');
        if (!company) {
            throw (0, http_errors_1.default)(404, 'Компания не найдена');
        }
        res.status(200).json(company);
    }
    catch (error) {
        next(error);
    }
};
exports.getCompany = getCompany;
const getCompanies = async (req, res, next) => {
    try {
        const companies = await models_1.Company.find().populate('services').populate('admin');
        res.status(200).json(companies);
    }
    catch (error) {
        next(error);
    }
};
exports.getCompanies = getCompanies;
const getCompanyByCurrentUser = async (req, res, next) => {
    const { userId } = req.userData;
    try {
        const company = await models_1.Company.findOne({ admin: userId }).populate('services').populate('admin');
        res.status(200).json(company);
    }
    catch (error) {
        next(error);
    }
};
exports.getCompanyByCurrentUser = getCompanyByCurrentUser;
const createCompany = async (req, res, next) => {
    const body = req.body;
    const { userId } = req.userData;
    try {
        const [latitude, longitude] = await getLatitudes(body.address);
        const newCompany = await models_1.Company.create({ ...body, admin: userId, latitude, longitude });
        res.status(201).json(newCompany);
    }
    catch (error) {
        next(error);
    }
};
exports.createCompany = createCompany;
/**
 * Get all companies offering a certain service
 * */
const findCompaniesByService = async (req, res, next) => {
    const { serviceId } = req.params;
    try {
        const companies = await models_1.Company.find({ services: { $eq: serviceId } });
        res.status(200).json(companies);
    }
    catch (error) {
        next(error);
    }
};
exports.findCompaniesByService = findCompaniesByService;
const editCompany = async (req, res, next) => {
    const params = req.params;
    const body = req.body;
    try {
        const { companyId } = params;
        let cords = {};
        if (body.address) {
            const [latitude, longitude] = await getLatitudes(body.address);
            cords = { ...cords, latitude, longitude };
        }
        const updatedCompany = await models_1.Company.findByIdAndUpdate(companyId, { $set: { ...body, ...cords } }, { new: true });
        res.status(200).json(updatedCompany);
    }
    catch (error) {
        next(error);
    }
};
exports.editCompany = editCompany;
const deleteCompany = async (req, res, next) => {
    const params = req.params;
    try {
        const { companyId } = params;
        await models_1.Company.findByIdAndDelete(companyId);
        res.status(200).json({ message: 'Компания удалена' });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteCompany = deleteCompany;
//# sourceMappingURL=company.js.map