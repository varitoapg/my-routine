import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

interface DecodedToken {
  userId: string;
}

export const verifyToken = async (
  token: string | undefined,
): Promise<boolean> => {
  if (!token) return false;

  try {
    const decoded = jwt.verify(token, JWT_SECRET as string) as DecodedToken;

    return !!decoded.userId;
  } catch (err) {
    console.error("Token verification failed:", err);
    return false;
  }
};
