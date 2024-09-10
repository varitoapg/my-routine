import bcrypt from "bcryptjs";

export const comparePassword = async (
  requestPassword: string,
  databasePassword: string,
) => {
  if (!(await bcrypt.compare(requestPassword, databasePassword))) {
    throw new Error("Wrong credentials");
  }
};
