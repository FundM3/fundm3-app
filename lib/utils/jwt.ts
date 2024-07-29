import { sign, SignOptions, JwtPayload } from "jsonwebtoken";

export function generateJWT(
  payload: string | Buffer | object,
  secret: string | Buffer,
  expiresIn: string | number = "4h"
): string {
  const options: SignOptions = { expiresIn };
  return sign(payload, secret, options);
}