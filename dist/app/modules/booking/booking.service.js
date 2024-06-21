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
exports.BookingServices = void 0;
const booking_model_1 = require("./booking.model");
const moment_1 = __importDefault(require("moment"));
const createBookingIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("payload", payload);
        const booking = yield booking_model_1.Booking.create(payload);
        return booking;
    }
    catch (error) {
        throw new Error(error);
    }
});
const getAllBookingsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield booking_model_1.Booking.find().populate("user").populate("facility");
        return bookings;
    }
    catch (error) {
        throw new Error(error);
    }
});
const getAllBookingsByUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield booking_model_1.Booking.find({ user: userId }).populate("facility");
        return bookings;
    }
    catch (error) {
        throw new Error(error);
    }
});
const cancelBookingIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.findByIdAndUpdate(id, { isBooked: "canceled" }, {
        new: true,
        runValidators: true,
    }).populate("facility");
    return result;
});
const TOTAL_SLOTS = [
    { startTime: "08:00", endTime: "10:00" },
    { startTime: "10:00", endTime: "12:00" },
    { startTime: "12:00", endTime: "14:00" },
    { startTime: "14:00", endTime: "16:00" },
    { startTime: "16:00", endTime: "18:00" },
];
const checkAvailability = (date) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Retrieve bookings for the specified date
        const bookings = yield booking_model_1.Booking.find({
            date: {
                $eq: (0, moment_1.default)(date).format("YYYY-MM-DD"),
            },
        });
        console.log("bookings:", bookings);
        // Find the available time slots
        const bookedSlots = bookings.map((booking) => ({
            startTime: (0, moment_1.default)(booking.startTime, "HH:mm").format("HH:mm"),
            endTime: (0, moment_1.default)(booking.endTime, "HH:mm").format("HH:mm"),
        }));
        console.log("bookedSlots:", bookedSlots);
        const availableSlots = TOTAL_SLOTS.filter((slot) => {
            return !bookedSlots.some((booked) => (slot.startTime >= booked.startTime &&
                slot.startTime < booked.endTime) ||
                (slot.endTime > booked.startTime && slot.endTime <= booked.endTime));
        });
        return availableSlots;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.BookingServices = {
    createBookingIntoDB,
    getAllBookingsFromDB,
    getAllBookingsByUserFromDB,
    cancelBookingIntoDB,
    checkAvailability,
};
