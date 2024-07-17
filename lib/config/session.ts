import { SessionOptions } from 'iron-session';
import { env } from '@/lib/config/env';

export const IRON_OPTIONS: SessionOptions = {
  cookieName: 'siwe',
  password: env.IRON_SESSION_PASSWORD,
  ttl: 60 * 60 * 24,
  cookieOptions: {
    secure: true, // Change this to false when locally testing on Safari
    sameSite: 'none'
  }
};
