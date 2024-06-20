import { TFacility } from "./facility.interface";
import { Facility } from "./facility.model";

const createFacilityIntoDB = async (payload: TFacility) => {
  try {
    const facility = await Facility.create(payload);

    return facility;
  } catch (error: any) {
    throw new Error(error);
  }
};
const getAllFacilitiesFromDB = async () => {
  try {
    const facilities = await Facility.find({ isDeleted: false });

    return facilities;
  } catch (error: any) {
    throw new Error(error);
  }
};

const getSingleFacilityFromDB = async (id: string) => {
  const result = await Facility.findById(id);

  return result;
};

const updateFacilityIntoDB = async (
  id: string,
  payload: Partial<TFacility>
) => {
  const { ...updatedFacilityData } = payload;

  const result = await Facility.findByIdAndUpdate(id, updatedFacilityData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteFacilityFromDB = async (id: string) => {
  const result = await Facility.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    }
  );
  return result;
};

export const FacilityService = {
  createFacilityIntoDB,
  updateFacilityIntoDB,
  deleteFacilityFromDB,
  getAllFacilitiesFromDB,
  getSingleFacilityFromDB,
};
