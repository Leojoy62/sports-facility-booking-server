import httpStatus from "http-status";
import AppError from "../errors/AppError";
import { User } from "../modules/user/user.model";
import { TLoginUser } from "./auth.interface";
import { createToken } from "./auth.utils";
import config from "../config";

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  // const user = await User.isUserExistsByEmail(payload.email);

  const user = await User.findOne({ email: payload.email }).lean();

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");

  //create token and sent to the  client

  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires as string
  );

  const userObject = user as { [key: string]: any; password?: string };
  delete userObject.password;

  return {
    user: userObject,
    accessToken,
  };
};

export const AuthServices = {
  loginUser,
};
