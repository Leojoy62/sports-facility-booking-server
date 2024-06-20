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

const updateFacilityIntoDB = async (
  id: string,
  payload: Partial<TFacility>
) => {
  const { ...updatedFacilityData } = payload;
  console.log("service:", updateFacilityIntoDB);

  // const modifiedUpdatedData: Record<string, unknown> = {
  //   ...remainingFacilityData,
  // };

  // if (name && Object.keys(name).length) {
  //   for (const [key, value] of Object.entries(name)) {
  //     modifiedUpdatedData[`name.${key}`] = value;
  //   }
  // }

  const result = await Facility.findByIdAndUpdate(id, updatedFacilityData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const FacilityService = {
  createFacilityIntoDB,
  updateFacilityIntoDB,
};
