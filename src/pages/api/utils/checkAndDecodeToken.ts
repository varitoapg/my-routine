import { decodeToken } from "@lib/auth/decodeToken";
import { BadRequest, InternalError } from "@lib/errors/AppError";
import { NextApiRequest } from "next";

export const checkAndDecodeToken = async (req: NextApiRequest) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new BadRequest("Authorization header missing or malformed");
  }
  try {
    const userData = await decodeToken(authorization.split(" ")[1]);
    return userData;
  } catch (err: unknown) {
    throw new InternalError();
  }
};
