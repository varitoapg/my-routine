import bcrypt from "bcryptjs";
import { Unauthorized } from "@lib/errors/AppError";

export const comparePassword = async (
  requestPassword: string,
  databasePassword: string,
) => {
  if (!(await bcrypt.compare(requestPassword, databasePassword))) {
    throw new Unauthorized("Invalid username or password");
  }
};
