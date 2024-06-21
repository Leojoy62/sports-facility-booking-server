import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FacilityService } from "./facility.service";

const createFacility = catchAsync(async (req, res) => {
  const result = await FacilityService.createFacilityIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Facility is created succesfully",
    data: result,
  });
});

const getAllFacilities = catchAsync(async (req, res) => {
  const result = await FacilityService.getAllFacilitiesFromDB();

  if (!result.length) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No Data Found",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Facilities are retrieved successfully",
    data: result,
  });
});

const getSingleFacility = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacilityService.getSingleFacilityFromDB(id);

  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No Data Found",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Facility is retrieved succesfully",
    data: result,
  });
});

const updateFacility = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await FacilityService.updateFacilityIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Facility is updated succesfully",
    data: result,
  });
});

const deleteFacility = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacilityService.deleteFacilityFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Facility is deleted succesfully",
    data: result,
  });
});

export const FacilityControllers = {
  createFacility,
  updateFacility,
  deleteFacility,
  getAllFacilities,
  getSingleFacility,
};
