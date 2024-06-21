import express from "express";
import { AuthControllers } from "./auth.controller";
import validateRequest from "../middlewares/validateRequest";
import { userLoginValidationSchema } from "./auth.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(userLoginValidationSchema),
  AuthControllers.loginUser
);

export const AuthRoutes = router;
