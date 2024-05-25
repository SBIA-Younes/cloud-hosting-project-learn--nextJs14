import jwt from "jsonwebtoken";
import { JWTPayload } from "./types";

export function generateJWT(JwtPayload: JWTPayload): string {
  const privateKey = process.env.JWT_SECRET as string;
  const token = jwt.sign(JwtPayload, privateKey, { expiresIn: "30d" });
  return token;
}
