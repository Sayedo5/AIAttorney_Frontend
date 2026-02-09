// Auth Context - Manages authentication state
import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import type { User, AuthState } from '@/types';
import { authApi, type LoginRequest, type SignupRequest, type AuthResponse } from '@/services/authApi';

interface AuthContextType extends AuthState {
  login: (credentials: LoginRequest) => Promise<boolean>;
  signup: (data: SignupRequest) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'auth_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    const storedUser = localStorage.getItem(USER_KEY);
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    return {
      user: storedUser ? JSON.parse(storedUser) : null,
      isAuthenticated: !!token,
      isLoading: false,
      token,
    };
  });

  const handleAuthSuccess = useCallback((response: AuthResponse) => {
    localStorage.setItem(AUTH_TOKEN_KEY, response.token);
    localStorage.setItem(REFRESH_TOKEN_KEY, response.refreshToken);
    localStorage.setItem(USER_KEY, JSON.stringify(response.user));
    
    setState({
      user: response.user,
      isAuthenticated: true,
      isLoading: false,
      token: response.token,
    });
  }, []);

  const login = useCallback(async (credentials: LoginRequest): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    // For demo, simulate successful login
    const mockUser: User = {
      id: '1',
      email: credentials.email,
      firstName: 'Advocate',
      lastName: 'User',
      plan: 'pro',
      createdAt: new Date(),
    };
    
    handleAuthSuccess({
      user: mockUser,
      token: 'mock_token',
      refreshToken: 'mock_refresh',
    });
    
    return true;
  }, [handleAuthSuccess]);

  const signup = useCallback(async (data: SignupRequest): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    // For demo, simulate successful signup
    const mockUser: User = {
      id: '1',
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      plan: 'free',
      createdAt: new Date(),
    };
    
    handleAuthSuccess({
      user: mockUser,
      token: 'mock_token',
      refreshToken: 'mock_refresh',
    });
    
    return true;
  }, [handleAuthSuccess]);

  const logout = useCallback(async () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      token: null,
    });
  }, []);

  const updateProfile = useCallback(async (updates: Partial<User>): Promise<boolean> => {
    if (!state.user) return false;
    
    const updatedUser = { ...state.user, ...updates };
    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
    setState(prev => ({ ...prev, user: updatedUser }));
    return true;
  }, [state.user]);

  const refreshUser = useCallback(async () => {
    const storedUser = localStorage.getItem(USER_KEY);
    if (storedUser) {
      setState(prev => ({ ...prev, user: JSON.parse(storedUser) }));
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      signup,
      logout,
      updateProfile,
      refreshUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
