import express from "express";
import { FacilityControllers } from "./facility.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import validateRequest from "../../middlewares/validateRequest";
import {
  facilityValidationSchema,
  updateFacilityValidationSchema,
} from "./facility.validation";

const router = express.Router();

router.get("/", FacilityControllers.getAllFacilities);
router.post(
  "/",
  validateRequest(facilityValidationSchema),
  auth(USER_ROLE.admin),
  FacilityControllers.createFacility
);
router.put(
  "/:id",
  validateRequest(updateFacilityValidationSchema),
  auth(USER_ROLE.admin),
  FacilityControllers.updateFacility
);
router.delete(
  "/:id",
  auth(USER_ROLE.admin),
  FacilityControllers.deleteFacility
);

export const FacilityRoutes = router;
