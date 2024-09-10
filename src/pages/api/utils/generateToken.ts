import jwt from "jsonwebtoken";
import { TokenInformation } from "../types/token";

export function generateToken(payload: TokenInformation): string {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "2d",
  });
}
