import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    IRON_SESSION_PASSWORD: z.string().min(32),
    JWT_SECRET_KEY: z.string().min(32)
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    NEXT_PUBLIC_APP_BASE_URL: z.string().min(1),
    NEXT_PUBLIC_WALLET_CONNECT_ID: z.string().min(1),
    NEXT_PUBLIC_BACKEND_URL: z.string().min(1)
  },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    NEXT_PUBLIC_APP_BASE_URL: process.env.NEXT_PUBLIC_APP_BASE_URL,
    NEXT_PUBLIC_WALLET_CONNECT_ID: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID,
    IRON_SESSION_PASSWORD: process.env.IRON_SESSION_PASSWORD,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL
  }
});
