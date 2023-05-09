"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.get('/', controllers_1.getUsers);
router.post('/', controllers_1.createUser);
router.get('/:userId', controllers_1.getUser);
router.delete('/:userId', controllers_1.deleteUser);
router.patch('/:userId/status', controllers_1.changeUserStatus);
router.patch('/:userId/permission', controllers_1.changeUserPermission);
router.get('/authenticated/getAuthenticatedUser', controllers_1.getAuthenticatedUser);
exports.default = router;
//# sourceMappingURL=user.js.map