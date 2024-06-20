import { Router } from "express";
import { UserRoutes } from "../modules/user/user.router";
import { AuthRoutes } from "../auth/auth.route";
import { FacilityRoutes } from "../modules/facility/facility.router";
import { BookingRoutes } from "../modules/booking/booking.router";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth/login",
    route: AuthRoutes,
  },
  {
    path: "/auth/signup",
    route: UserRoutes,
  },
  {
    path: "/facility",
    route: FacilityRoutes,
  },
  {
    path: "/bookings",
    route: BookingRoutes,
  },
  {
    path: "/",
    route: BookingRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
