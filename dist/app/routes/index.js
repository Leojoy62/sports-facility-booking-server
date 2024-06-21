"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_router_1 = require("../modules/user/user.router");
const auth_route_1 = require("../auth/auth.route");
const facility_router_1 = require("../modules/facility/facility.router");
const booking_router_1 = require("../modules/booking/booking.router");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth/login",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/auth/signup",
        route: user_router_1.UserRoutes,
    },
    {
        path: "/facility",
        route: facility_router_1.FacilityRoutes,
    },
    {
        path: "/bookings",
        route: booking_router_1.BookingRoutes,
    },
    {
        path: "/",
        route: booking_router_1.BookingRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
