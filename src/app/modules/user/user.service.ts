import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (payload: TUser) => {
  try {
    const user = await User.create(payload);

    const { password, ...userWithoutPassword } = user.toObject();

    return userWithoutPassword;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const UserService = {
  createUserIntoDB,
};
