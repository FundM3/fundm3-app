'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import useAsyncEffect from '@/lib/hooks/useAsyncEffect';
import { isAuthAction } from '@/lib/actions/auth';
import { Optional } from '@/lib/types/common';
import { useAccount } from 'wagmi';
import { eventEmitter } from '@/lib/config/eventEmitter';
import { EMITTER_EVENTS } from '@/lib/constants';

type AuthContextType = {
	isAuth: Optional<boolean>;
	isAuthLoading: boolean;
};

type AuthProviderProps = {
	children: ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: AuthProviderProps) {
	const [isAuthLoading, setIsAuthLoading] = useState(true);
	const [isAuth, setIsAuth] = useState<Optional<boolean>>();
	const { address } = useAccount();

	useAsyncEffect(async () => {
		const { isAuth } = await isAuthAction(address || "");
		setIsAuth(isAuth);
		setIsAuthLoading(false);

		eventEmitter.on(EMITTER_EVENTS.SIGN_IN, () => setIsAuth(true));
		eventEmitter.on(EMITTER_EVENTS.SIGN_OUT, () => setIsAuth(false));

		return () => {
			eventEmitter.removeListener(EMITTER_EVENTS.SIGN_IN);
			eventEmitter.removeListener(EMITTER_EVENTS.SIGN_OUT);
		};
	}, [address]);

	return (
		<AuthContext.Provider value={{ isAuth, isAuthLoading }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}
