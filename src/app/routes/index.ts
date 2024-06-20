import { Router } from "express";
import { UserRoutes } from "../modules/user/user.router";
import { AuthRoutes } from "../auth/auth.route";
import { FacilityRoutes } from "../modules/facility/facility.router";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
