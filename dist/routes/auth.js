"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post('/login', controllers_1.login);
router.put('/:userId', controllers_1.editUser);
router.put('/password/forgot/:userId', controllers_1.changePassword);
router.post('/password/restore', controllers_1.restorePassword);
exports.default = router;
//# sourceMappingURL=auth.js.map