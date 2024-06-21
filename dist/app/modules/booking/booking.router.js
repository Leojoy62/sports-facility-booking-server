"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_constant_1 = require("../user/user.constant");
const booking_controller_1 = require("./booking.controller");
const express_1 = __importDefault(require("express"));
const booking_validate_1 = require("./booking.validate");
const router = express_1.default.Router();
router.post("/", (0, validateRequest_1.default)(booking_validate_1.bookingValidationSchema), (0, auth_1.default)(user_constant_1.USER_ROLE.user), booking_controller_1.BookingControllers.createBooking);
router.get("/user", (0, auth_1.default)(user_constant_1.USER_ROLE.user), booking_controller_1.BookingControllers.getAllBookingsByUser);
router.delete("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.user), booking_controller_1.BookingControllers.cancelBooking);
router.get("/", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), booking_controller_1.BookingControllers.getAllBookings);
router.get("/check-availability", booking_controller_1.BookingControllers.checkAvailability);
exports.BookingRoutes = router;
