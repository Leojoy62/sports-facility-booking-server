import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../user/user.constant";
import { BookingControllers } from "./booking.controller";
import express from "express";
import { bookingValidationSchema } from "./booking.validate";

const router = express.Router();

router.post(
  "/",
  validateRequest(bookingValidationSchema),
  auth(USER_ROLE.user),
  BookingControllers.createBooking
);
router.get(
  "/user",
  auth(USER_ROLE.user),
  BookingControllers.getAllBookingsByUser
);
router.delete("/:id", auth(USER_ROLE.user), BookingControllers.cancelBooking);
router.get("/", auth(USER_ROLE.admin), BookingControllers.getAllBookings);
router.get("/check-availability", BookingControllers.checkAvailability);

export const BookingRoutes = router;
