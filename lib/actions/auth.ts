'use server';

import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { getAddress } from 'viem';
import { COOKIE_KEYS } from '../constants';
import { env } from '@/lib/config/env';

export async function setJwtToken(jwt: string) {
  cookies().set(COOKIE_KEYS.JWT, jwt, { secure: true });
}

export async function signInAction(address: string, jwtToken: string) {
  try {
    const response = await fetch(`${env.BACKEND_URL}/user/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`
      },
      body: JSON.stringify({ address }),
    });

    if (!response.ok) {
      throw new Error('Sign in failed');
    }

    return true;
  } catch (error) {
    console.error('Signin error:', error);
    return false;
  }
}

export async function signOutAction() {
  cookies().delete(COOKIE_KEYS.JWT);
}

export async function isAuthAction(address: string) {
  const jwtToken = cookies().get(COOKIE_KEYS.JWT)?.value;

  if (!address) {
    console.log("Address is undefined or empty.");
    return { isAuth: false };
  }

  if (!jwtToken) {
    return { isAuth: false };
  }

  try {
    const decoded = jwt.verify(jwtToken, env.JWT_SECRET_KEY) as { sub: string };
    const isAddressMatch = getAddress(decoded.sub) === getAddress(address);
    return { isAuth: isAddressMatch };
  } catch (error) {
    console.error('JWT verification failed:', error);
    return { isAuth: false };
  }
}
