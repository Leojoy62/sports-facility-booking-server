import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";
import { Facility } from "../facility/facility.model";
import { User } from "../user/user.model";
import { string } from "zod";
import { Types } from "mongoose";
import { Request, Response } from "express";
import moment from "moment";

const createBooking = catchAsync(async (req, res) => {
  const bookingData = req.body;

  const bookedFacility = await Facility.findOne({
    _id: bookingData.facility,
  });

  if (!bookedFacility) {
    throw new Error("Facility not found");
  }
  const totalPayableAmount =
    (parseInt(bookingData.endTime) - parseInt(bookingData.startTime)) *
    bookedFacility.pricePerHour;

  const user = await User.findOne({ email: req.user.userEmail });
  bookingData.user = user?._id;

  bookingData.payableAmount = totalPayableAmount;
  bookingData.isBooked = "confirmed";
  const result = await BookingServices.createBookingIntoDB(bookingData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking is created succesfully",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookings are retrieved successfully",
    data: result,
  });
});

const cancelBooking = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await BookingServices.cancelBookingIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking cancelled successfully",
    data: result,
  });
});

const getAllBookingsByUser = catchAsync(async (req, res) => {
  const user = await User.findOne({ email: req.user.userEmail });
  const userId = user?._id as Types.ObjectId;
  const result = await BookingServices.getAllBookingsByUserFromDB(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookings are retrieved successfully",
    data: result,
  });
});

const checkAvailability = catchAsync(async (req: Request, res: Response) => {
  const dateQuery = req.query.date as string;

  const date = dateQuery
    ? moment(dateQuery, "YYYY-MM-DD").toDate()
    : new Date();
  const availableSlots = await BookingServices.checkAvailability(date);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Availability checked successfully",
    data: availableSlots,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBookings,
  getAllBookingsByUser,
  cancelBooking,
  checkAvailability,
};
