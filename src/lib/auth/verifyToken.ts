import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET as string);

export const verifyToken = async (
  token: string | undefined,
): Promise<boolean> => {
  if (!token) return false;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return !!payload.userId;
  } catch (err) {
    console.error("Token verification failed:", err);
    return false;
  }
};
