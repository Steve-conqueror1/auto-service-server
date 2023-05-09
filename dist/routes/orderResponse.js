"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderResponse_1 = require("../controllers/orderResponse");
const router = (0, express_1.Router)();
router.post('/', orderResponse_1.createOrderResponse);
exports.default = router;
//# sourceMappingURL=orderResponse.js.map