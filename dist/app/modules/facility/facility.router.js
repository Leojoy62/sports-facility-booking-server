"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityRoutes = void 0;
const express_1 = __importDefault(require("express"));
const facility_controller_1 = require("./facility.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const facility_validation_1 = require("./facility.validation");
const router = express_1.default.Router();
router.get("/", facility_controller_1.FacilityControllers.getAllFacilities);
router.post("/", (0, validateRequest_1.default)(facility_validation_1.facilityValidationSchema), (0, auth_1.default)(user_constant_1.USER_ROLE.admin), facility_controller_1.FacilityControllers.createFacility);
router.put("/:id", (0, validateRequest_1.default)(facility_validation_1.updateFacilityValidationSchema), (0, auth_1.default)(user_constant_1.USER_ROLE.admin), facility_controller_1.FacilityControllers.updateFacility);
router.delete("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), facility_controller_1.FacilityControllers.deleteFacility);
exports.FacilityRoutes = router;
