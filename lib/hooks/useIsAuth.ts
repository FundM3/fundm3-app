import { useState } from 'react';
import useAsyncEffect from './useAsyncEffect';
import { isAuthAction } from '../actions/auth';
import { Optional } from '../types/common';
import { useAccount } from 'wagmi'; 

export default function useIsAuth() {
  const [isAuth, setIsAuth] = useState<Optional<boolean>>();
  const { address } = useAccount();

  useAsyncEffect(async () => {
    const { isAuth } = await isAuthAction(address || "Invalid");
    setIsAuth(isAuth);
  }, []);

  return { isAuth };
}
