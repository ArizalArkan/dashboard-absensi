'use client';

import * as React from 'react';
import { jwtDecode } from 'jwt-decode'; // Adjusted import for jwt-decode

import type { User } from '@/types/user';
import { logger } from '@/lib/default-logger';

export interface UserContextValue {
  user: User | null;
  error: string | null;
  isLoading: boolean;
  checkSession?: () => Promise<void>;
}

export const UserContext = React.createContext<UserContextValue | undefined>(undefined);

export interface UserProviderProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps): React.JSX.Element {
  const [state, setState] = React.useState<{ user: User | null; error: string | null; isLoading: boolean }>({
    user: null,
    error: null,
    isLoading: true,
  });

  const decodeToken = (token: string): User | null => {
    try {
      const decoded: never = jwtDecode(token); // Decode the token into a User object
      return decoded;
    } catch (error) {
      logger.error('Failed to decode token:', error);
      return null;
    }
  };

  const checkSession = React.useCallback(async (): Promise<void> => {
    try {
      const token = localStorage.getItem('custom-auth-token');
      if (!token) {
        setState({ user: null, error: null, isLoading: false });
        return;
      }

      // Decode the token to extract user information
      const user = decodeToken(token);
      if (!user) {
        setState({ user: null, error: 'Invalid token', isLoading: false });
        return;
      }

      // Update the state with the decoded user
      setState({ user, error: null, isLoading: false });
    } catch (err) {
      logger.error(err);
      setState({ user: null, error: 'Something went wrong', isLoading: false });
    }
  }, []);

  React.useEffect(() => {
    checkSession().catch((err: unknown) => {
      logger.error(err);
    });
  }, [checkSession]);

  return <UserContext.Provider value={{ ...state, checkSession }}>{children}</UserContext.Provider>;
}

export const UserConsumer = UserContext.Consumer;
