import { sign } from 'jsonwebtoken';

export function generateJWT(payload, secret, expiresIn = '4h') {
  return sign(payload, secret, { expiresIn });
}
