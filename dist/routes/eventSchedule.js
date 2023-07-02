"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post('/', controllers_1.createSchedule);
router.delete('/:eventId', controllers_1.deleteSchedule);
router.put('/:eventId', controllers_1.updateSchedule);
exports.default = router;
//# sourceMappingURL=eventSchedule.js.map