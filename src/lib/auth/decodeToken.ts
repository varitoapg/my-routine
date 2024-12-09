import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET as string);

export const decodeToken = async (
  token: string | undefined,
): Promise<{ groupId: string; userId: string }> => {
  if (!token) {
    throw new Error("Missing token");
  }
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { groupId: string; userId: string };
  } catch (err: unknown) {
    throw new Error((err as Error).message);
  }
};
