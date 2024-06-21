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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const booking_service_1 = require("./booking.service");
const facility_model_1 = require("../facility/facility.model");
const user_model_1 = require("../user/user.model");
const moment_1 = __importDefault(require("moment"));
const createBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingData = req.body;
    if (!bookingData.facility) {
        throw new Error("Facility ID is required");
    }
    const bookedFacility = yield facility_model_1.Facility.findOne({
        _id: bookingData.facility,
    });
    if (!bookedFacility) {
        throw new Error("Facility not found");
    }
    const totalPayableAmount = (parseInt(bookingData.endTime) - parseInt(bookingData.startTime)) *
        bookedFacility.pricePerHour;
    const user = yield user_model_1.User.findOne({ email: req.user.userEmail });
    bookingData.user = user === null || user === void 0 ? void 0 : user._id;
    bookingData.payableAmount = totalPayableAmount;
    bookingData.isBooked = "confirmed";
    const result = yield booking_service_1.BookingServices.createBookingIntoDB(bookingData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Booking is created succesfully",
        data: result,
    });
}));
const getAllBookings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_service_1.BookingServices.getAllBookingsFromDB();
    if (!result.length) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.NOT_FOUND,
            success: false,
            message: "No Data Found",
            data: [],
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Bookings are retrieved successfully",
        data: result,
    });
}));
const cancelBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield booking_service_1.BookingServices.cancelBookingIntoDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Booking cancelled successfully",
        data: result,
    });
}));
const getAllBookingsByUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: req.user.userEmail });
    const userId = user === null || user === void 0 ? void 0 : user._id;
    const result = yield booking_service_1.BookingServices.getAllBookingsByUserFromDB(userId);
    if (!result.length) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.NOT_FOUND,
            success: false,
            message: "No Data Found",
            data: [],
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Bookings are retrieved successfully",
        data: result,
    });
}));
const checkAvailability = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dateQuery = req.query.date;
    const date = dateQuery
        ? (0, moment_1.default)(dateQuery, "YYYY-MM-DD").toDate()
        : new Date();
    const availableSlots = yield booking_service_1.BookingServices.checkAvailability(date);
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Availability checked successfully",
        data: availableSlots,
    });
}));
exports.BookingControllers = {
    createBooking,
    getAllBookings,
    getAllBookingsByUser,
    cancelBooking,
    checkAvailability,
};
