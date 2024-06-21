"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validatioon_1 = require("./user.validatioon");
const router = express_1.default.Router();
router.post("/", (0, validateRequest_1.default)(user_validatioon_1.UserValidation.createUserValidationSchema), user_controller_1.UserControllers.createUser);
exports.UserRoutes = router;
