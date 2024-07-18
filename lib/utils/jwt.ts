import { sign } from 'jsonwebtoken';

export function generateJWT(payload: any, secret: any, expiresIn = '4h') {
  return sign(payload, secret, { expiresIn });
}
