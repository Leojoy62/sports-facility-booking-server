import { Types } from "mongoose";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import moment from "moment";

const createBookingIntoDB = async (payload: TBooking) => {
  try {
    console.log("payload", payload);
    const booking = await Booking.create(payload);

    return booking;
  } catch (error: any) {
    throw new Error(error);
  }
};

const getAllBookingsFromDB = async () => {
  try {
    const bookings = await Booking.find().populate("user").populate("facility");

    return bookings;
  } catch (error: any) {
    throw new Error(error);
  }
};
const getAllBookingsByUserFromDB = async (userId: Types.ObjectId) => {
  try {
    const bookings = await Booking.find({ user: userId }).populate("facility");

    return bookings;
  } catch (error: any) {
    throw new Error(error);
  }
};

const cancelBookingIntoDB = async (id: string) => {
  const result = await Booking.findByIdAndUpdate(
    id,
    { isBooked: "canceled" },
    {
      new: true,
      runValidators: true,
    }
  ).populate("facility");
  return result;
};

const TOTAL_SLOTS = [
  { startTime: "08:00", endTime: "10:00" },
  { startTime: "10:00", endTime: "12:00" },
  { startTime: "12:00", endTime: "14:00" },
  { startTime: "14:00", endTime: "16:00" },
  { startTime: "16:00", endTime: "18:00" },
];

const checkAvailability = async (date: Date) => {
  try {
    // Retrieve bookings for the specified date
    const bookings = await Booking.find({
      date: {
        $eq: moment(date).format("YYYY-MM-DD"),
      },
    });
    console.log("bookings:", bookings);

    // Find the available time slots
    const bookedSlots = bookings.map((booking) => ({
      startTime: moment(booking.startTime, "HH:mm").format("HH:mm"),
      endTime: moment(booking.endTime, "HH:mm").format("HH:mm"),
    }));
    console.log("bookedSlots:", bookedSlots);

    const availableSlots = TOTAL_SLOTS.filter((slot) => {
      return !bookedSlots.some(
        (booked) =>
          (slot.startTime >= booked.startTime &&
            slot.startTime < booked.endTime) ||
          (slot.endTime > booked.startTime && slot.endTime <= booked.endTime)
      );
    });

    return availableSlots;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getAllBookingsByUserFromDB,
  cancelBookingIntoDB,
  checkAvailability,
};
