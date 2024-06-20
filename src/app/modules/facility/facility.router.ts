import express from "express";
import { FacilityControllers } from "./facility.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.get("/", FacilityControllers.getAllFacilities);
router.post("/", auth(USER_ROLE.admin), FacilityControllers.createFacility);
router.put("/:id", auth(USER_ROLE.admin), FacilityControllers.updateFacility);
router.delete(
  "/:id",
  auth(USER_ROLE.admin),
  FacilityControllers.deleteFacility
);

export const FacilityRoutes = router;
