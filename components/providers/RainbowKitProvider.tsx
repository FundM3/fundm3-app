'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { useAccount } from 'wagmi';
import {
  RainbowKitProvider as NextRainbowKitProvider,
  RainbowKitAuthenticationProvider, darkTheme
} from '@rainbow-me/rainbowkit';
import { ReactNode, useState, useEffect } from 'react';
import { config } from '@/lib/config/wagmi';
import { authenticationAdapter } from '@/lib/utils/authenticationAdapter';
import useAsyncEffect from '@/lib/hooks/useAsyncEffect';
import { isAuthAction } from '@/lib/actions/auth';
import { Optional } from '@/lib/types/common';
import { eventEmitter } from '@/lib/config/eventEmitter';
import { EMITTER_EVENTS } from '@/lib/constants';
import { useAuth } from './AuthProvider'; 

type RainbowKitProviderProps = {
  children: ReactNode;
};

export default function RainbowKitProvider({
  children,
}: RainbowKitProviderProps) {
  const { isAuth, isAuthLoading } = useAuth();

  const status = isAuthLoading
    ? 'loading'
    : isAuth
    ? 'authenticated'
    : 'unauthenticated';

  return (
    <RainbowKitAuthenticationProvider
      adapter={authenticationAdapter}
      status={status}
    >
      <NextRainbowKitProvider 
        theme={darkTheme({
          accentColor: "#0E76FD",
          accentColorForeground: "white",
          borderRadius: "large",
          fontStack: "system",
          overlayBlur: "small",
        })} 
        coolMode
      >
        {children}
      </NextRainbowKitProvider>
    </RainbowKitAuthenticationProvider>
  );
}
