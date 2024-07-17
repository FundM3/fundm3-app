import { IRON_OPTIONS } from '@/lib/config/session';
import { env } from '@/lib/config/env';
import { generateJWT } from '@/lib/utils/jwt';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { SiweMessage } from 'siwe';

export async function POST(request: Request) {
  const session = await getIronSession<{ nonce: string }>(
    cookies(),
    IRON_OPTIONS
  );

  const { message, signature } = await request.json();

  const siweMessage = new SiweMessage(message);
  const { data: fields } = await siweMessage.verify({ signature });

  if (fields.nonce !== session.nonce) {
    return NextResponse.json({ message: 'Invalid nonce.' }, { status: 422 });
  }

  const jwtToken = generateJWT({ sub: fields.address }, env.JWT_SECRET_KEY);

  return NextResponse.json({ jwt: jwtToken });
}
