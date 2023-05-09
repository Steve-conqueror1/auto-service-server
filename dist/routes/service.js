"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.get('/', controllers_1.getServices);
router.get('/:serviceId', controllers_1.getService);
router.post('/', controllers_1.createService);
router.put('/:serviceId', controllers_1.editService);
exports.default = router;
//# sourceMappingURL=service.js.map