'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { State, WagmiProvider, cookieToInitialState } from 'wagmi';
import {
  RainbowKitProvider as NextRainbowKitProvider,
  RainbowKitAuthenticationProvider, darkTheme
} from '@rainbow-me/rainbowkit';
import { ReactNode, useState } from 'react';
import ReactQueryProvider from './ReactQueryProvider';
import { config } from '@/lib/config/wagmi';
import { authenticationAdapter } from '@/lib/utils/authenticationAdapter';
import useAsyncEffect from '@/lib/hooks/useAsyncEffect';
import { isAuthAction } from '@/lib/actions/auth';
import { Optional } from '@/lib/types/common';
import { eventEmitter } from '@/lib/config/eventEmitter';
import { EMITTER_EVENTS } from '@/lib/constants';

type RainbowKitProviderProps = {
  children: ReactNode;
  cookie?: string | null;
};

export default function RainbowKitProvider({
  children,
  cookie
}: RainbowKitProviderProps) {
  const initialState = cookieToInitialState(config, cookie);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState<Optional<boolean>>();

  useAsyncEffect(async () => {
    const { isAuth } = await isAuthAction();

    setIsAuth(isAuth);
    setIsLoading(false);

    eventEmitter.on(EMITTER_EVENTS.SIGN_IN, () => setIsAuth(true));

    eventEmitter.on(EMITTER_EVENTS.SIGN_OUT, () => setIsAuth(false));

    return () => {
      eventEmitter.removeListener(EMITTER_EVENTS.SIGN_IN);
    };
  }, []);

  const status = isLoading
    ? 'loading'
    : isAuth
    ? 'authenticated'
    : 'unauthenticated';

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <ReactQueryProvider>
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
      </ReactQueryProvider>
    </WagmiProvider>
  );
}
