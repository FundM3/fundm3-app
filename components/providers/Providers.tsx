'use client';

import { ReactNode } from 'react';
import { WagmiProvider, cookieToInitialState } from 'wagmi';
import { config } from '@/lib/config/wagmi';
import RainbowKitProvider from './RainbowKitProvider';
import ReactQueryProvider from './ReactQueryProvider';
import AuthProvider from './AuthProvider'; 

type ProvidersProps = {
  children: ReactNode;
  cookie?: string | null;
};

export default function Providers({ children, cookie }: ProvidersProps) {
  const initialState = cookieToInitialState(config, cookie);

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <ReactQueryProvider>
        <AuthProvider>
          <RainbowKitProvider>
            {children}
          </RainbowKitProvider>
        </AuthProvider>
      </ReactQueryProvider>
    </WagmiProvider>
  );
}
