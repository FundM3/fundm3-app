import { ReactNode } from 'react';
import ThemeProvider from './ThemeProvider';
import RainbowKitProvider from './RainbowKitProvider';
import { headers } from 'next/headers';

type ProvidersProps = {
  children: ReactNode;
};

export default async function Providers({ children }: ProvidersProps) {
  const cookie = headers().get('cookie');

  return (
    <RainbowKitProvider cookie={cookie}>
      {children}
    </RainbowKitProvider>
  );
}
