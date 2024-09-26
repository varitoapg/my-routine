import { SignJWT } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET as string);
export interface TokenInformation {
  groupId: string | null;
  userId: string;
}

export async function generateToken(
  payload: TokenInformation,
): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("2d")
    .setProtectedHeader({ alg: "HS256" })
    .sign(JWT_SECRET);
}
