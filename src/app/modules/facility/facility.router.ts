import express from "express";
import { FacilityControllers } from "./facility.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post("/", auth(USER_ROLE.admin), FacilityControllers.createFacility);
router.put("/:id", auth(USER_ROLE.admin), FacilityControllers.updateFacility);

export const FacilityRoutes = router;
