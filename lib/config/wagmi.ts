'use client';

import { http, createStorage, cookieStorage } from 'wagmi';
import { sepolia, baseSepolia, optimismSepolia, mainnet, base, optimism, degen  } from 'wagmi/chains';
import { Chain, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { env } from '@/lib/config/env';

const projectId = `${env.NEXT_PUBLIC_WALLET_CONNECT_ID}`;

const supportedChains: Chain[] = [ sepolia, baseSepolia, optimismSepolia, mainnet, base, optimism, degen ];

export const config = getDefaultConfig({
   appName: "fundm3-app",
   projectId,
   chains: supportedChains as any,
   ssr: true,
   storage: createStorage({
    storage: cookieStorage,
   }),
   transports: supportedChains.reduce((obj, chain) => ({ ...obj, [chain.id]: http() }), {})
});
