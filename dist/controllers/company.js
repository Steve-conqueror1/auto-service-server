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
exports.deleteCompany = exports.editCompany = exports.findCompaniesByService = exports.createCompany = exports.getCompanyByCurrentUser = exports.getCompanies = exports.getCompany = void 0;
const models_1 = require("../models");
const http_errors_1 = __importDefault(require("http-errors"));
const axios_1 = __importDefault(require("axios"));
const getLatitudes = (address) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios_1.default.get(`http://api.positionstack.com/v1/forward?access_key=${process.env.MAP_API_KEY}&limit=${1}&country=RU&query=${address}`, { maxRedirects: 0 });
    const resData = res.data;
    const { latitude, longitude } = resData.data[0];
    return [latitude, longitude];
});
const getCompany = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const companyId = params.companyId;
    try {
        const company = yield models_1.Company.findOne({ _id: companyId }).populate('services admin events');
        if (!company) {
            throw (0, http_errors_1.default)(404, 'Компания не найдена');
        }
        res.status(200).json(company);
    }
    catch (error) {
        next(error);
    }
});
exports.getCompany = getCompany;
const getCompanies = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companies = yield models_1.Company.find().populate('services admin events');
        res.status(200).json(companies);
    }
    catch (error) {
        next(error);
    }
});
exports.getCompanies = getCompanies;
const getCompanyByCurrentUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.userData;
    try {
        const company = yield models_1.Company.findOne({ admin: userId }).populate('services admin events');
        res.status(200).json(company);
    }
    catch (error) {
        next(error);
    }
});
exports.getCompanyByCurrentUser = getCompanyByCurrentUser;
const createCompany = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { userId } = req.userData;
    try {
        const [latitude, longitude] = yield getLatitudes(body.address);
        const newCompany = yield models_1.Company.create(Object.assign(Object.assign({}, body), { admin: userId, latitude, longitude }));
        res.status(201).json(newCompany);
    }
    catch (error) {
        next(error);
    }
});
exports.createCompany = createCompany;
/**
 * Get all companies offering a certain service
 * */
const findCompaniesByService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceId } = req.params;
    try {
        const companies = yield models_1.Company.find({ services: { $eq: serviceId } });
        res.status(200).json(companies);
    }
    catch (error) {
        next(error);
    }
});
exports.findCompaniesByService = findCompaniesByService;
const editCompany = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const body = req.body;
    try {
        const { companyId } = params;
        let cords = {};
        if (body.address) {
            const [latitude, longitude] = yield getLatitudes(body.address);
            cords = Object.assign(Object.assign({}, cords), { latitude, longitude });
        }
        const updatedCompany = yield models_1.Company.findByIdAndUpdate(companyId, { $set: Object.assign(Object.assign({}, body), cords) }, { new: true });
        res.status(200).json(updatedCompany);
    }
    catch (error) {
        next(error);
    }
});
exports.editCompany = editCompany;
const deleteCompany = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    try {
        const { companyId } = params;
        yield models_1.Company.findByIdAndDelete(companyId);
        res.status(200).json({ message: 'Компания удалена' });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteCompany = deleteCompany;
//# sourceMappingURL=company.js.map