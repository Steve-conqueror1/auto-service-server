"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.get('/', controllers_1.getOrders);
router.post('/', controllers_1.createOrder);
router.get('/:orderId', controllers_1.getOrder);
router.put('/:orderId', controllers_1.editOrder);
router.put('/', controllers_1.getStatistics);
exports.default = router;
//# sourceMappingURL=order.js.map