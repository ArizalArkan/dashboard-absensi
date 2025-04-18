/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client';

import type { User } from '@/types/user';

function generateToken(): string {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

const user = {
  id: '1',
  avatar: '/assets/avatar.png',
  firstName: 'Sofia',
  lastName: 'Rivers',
  email: 'sofia@devias.io',
} satisfies User;

export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInWithOAuthParams {
  provider: 'google' | 'discord';
}

export interface SignInWithPasswordParams {
  username: string;
  password: string;
  role: string;
}

export interface ResetPasswordParams {
  email: string;
}

class AuthClient {
  async signUp(_: SignUpParams): Promise<{ error?: string }> {
    // Make API request

    // We do not handle the API, so we'll just generate a token and store it in localStorage.
    const token = generateToken();
    localStorage.setItem('custom-auth-token', token);

    return {};
  }

  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
    return { error: 'Social authentication not implemented' };
  }

  async signInEndpoint(params: SignInWithPasswordParams, isVisitorGuru: boolean): Promise<{ error?: string }> {
    const { username, password, role } = params;

    const endpointLogin = isVisitorGuru ? 'login-guru' : 'login-admin';

    const payloadGuru = {
      username,
      password,
      role: 'guru'
    }

    const payloadAdmin = {
      username,
      password,
      role
    }

    try {
      // Make API request to your backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/auth/${endpointLogin}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(isVisitorGuru ? payloadGuru : payloadAdmin)
      });

      // Parse the response
      if (!response.ok) {
        const errorResponse = await response.json();
        return { error: errorResponse?.message || 'Login failed' };
      }

      const data = await response.json();

      // Assuming the response includes a token
      if (data.token) {
        localStorage.setItem('custom-auth-token', data.token);
        return {};
      }

      return { error: 'No token received from the server' };
    } catch (error) {
      return { error: 'Something went wrong, please try again later' };
    }
  }

  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Password reset not implemented' };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Update reset not implemented' };
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    // Make API request

    // We do not handle the API, so just check if we have a token in localStorage.
    const token = localStorage.getItem('custom-auth-token');

    if (!token) {
      return { data: null };
    }

    return { data: user };
  }

  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem('custom-auth-token');

    return {};
  }
}

export const authClient = new AuthClient();
