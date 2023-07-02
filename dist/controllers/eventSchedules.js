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
exports.deleteSchedule = exports.updateSchedule = exports.createSchedule = void 0;
const EventSchedule_1 = require("../models/EventSchedule");
const models_1 = require("../models");
const createSchedule = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userType, userId } = req.userData;
    const body = req.body;
    let companyId;
    let company;
    try {
        if (userType === 'admin') {
            company = yield models_1.Company.findOne({ admin: userId });
            companyId = company === null || company === void 0 ? void 0 : company._id;
        }
        const eventSchedules = yield EventSchedule_1.EventSchedule.create(Object.assign(Object.assign({}, body), { companyId: companyId }));
        yield (company === null || company === void 0 ? void 0 : company.events.push(eventSchedules._id));
        yield (company === null || company === void 0 ? void 0 : company.save());
        res.status(200).json(eventSchedules);
    }
    catch (error) {
        next(error);
    }
});
exports.createSchedule = createSchedule;
const updateSchedule = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { eventId } = req.params;
    const body = req.body;
    try {
        const editedEvent = yield EventSchedule_1.EventSchedule.findByIdAndUpdate(eventId, { $set: body }, { new: true });
        res.status(200).json(editedEvent);
    }
    catch (error) {
        next(error);
    }
});
exports.updateSchedule = updateSchedule;
const deleteSchedule = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { eventId } = req.params;
    try {
        yield EventSchedule_1.EventSchedule.findByIdAndDelete(eventId);
        res.status(200).json({ message: 'Time deleted' });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteSchedule = deleteSchedule;
//# sourceMappingURL=eventSchedules.js.map