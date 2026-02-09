// Auth API Service
import { apiService } from './api';
import type { User, ApiResponse } from '@/types';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface OtpRequest {
  email: string;
  otp: string;
}

class AuthApiService {
  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    return apiService.post<AuthResponse>('/auth/login', credentials);
  }

  async signup(data: SignupRequest): Promise<ApiResponse<AuthResponse>> {
    return apiService.post<AuthResponse>('/auth/signup', data);
  }

  async logout(): Promise<ApiResponse<void>> {
    const result = await apiService.post<void>('/auth/logout');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    return result;
  }

  async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    const refreshToken = localStorage.getItem('refresh_token');
    return apiService.post<{ token: string }>('/auth/refresh', { refreshToken });
  }

  async forgotPassword(email: string): Promise<ApiResponse<void>> {
    return apiService.post<void>('/auth/forgot-password', { email });
  }

  async resetPassword(token: string, newPassword: string): Promise<ApiResponse<void>> {
    return apiService.post<void>('/auth/reset-password', { token, newPassword });
  }

  async verifyOtp(request: OtpRequest): Promise<ApiResponse<AuthResponse>> {
    return apiService.post<AuthResponse>('/auth/verify-otp', request);
  }

  async resendOtp(email: string): Promise<ApiResponse<void>> {
    return apiService.post<void>('/auth/resend-otp', { email });
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return apiService.get<User>('/auth/me');
  }

  async updateProfile(updates: Partial<User>): Promise<ApiResponse<User>> {
    return apiService.put<User>('/auth/profile', updates);
  }

  async updatePassword(currentPassword: string, newPassword: string): Promise<ApiResponse<void>> {
    return apiService.put<void>('/auth/password', { currentPassword, newPassword });
  }

  async deleteAccount(): Promise<ApiResponse<void>> {
    return apiService.delete<void>('/auth/account');
  }

  // Social Login
  async loginWithGoogle(idToken: string): Promise<ApiResponse<AuthResponse>> {
    return apiService.post<AuthResponse>('/auth/google', { idToken });
  }

  async loginWithFacebook(accessToken: string): Promise<ApiResponse<AuthResponse>> {
    return apiService.post<AuthResponse>('/auth/facebook', { accessToken });
  }
}

export const authApi = new AuthApiService();
export default authApi;
