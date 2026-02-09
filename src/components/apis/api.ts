// Base API Configuration
import { ENV_CONFIG } from "@/config/env.config";

const BASE_URL = ENV_CONFIG.API_BASE_URL;

interface RequestOptions extends RequestInit {
  token?: string;
}

export const apiRequest = async <T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> => {
  const { token, ...fetchOptions } = options;
  
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...fetchOptions.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const get = <T>(endpoint: string, token?: string): Promise<T> =>
  apiRequest<T>(endpoint, { method: "GET", token });

export const post = <T>(endpoint: string, data: unknown, token?: string): Promise<T> =>
  apiRequest<T>(endpoint, { method: "POST", body: JSON.stringify(data), token });

export const put = <T>(endpoint: string, data: unknown, token?: string): Promise<T> =>
  apiRequest<T>(endpoint, { method: "PUT", body: JSON.stringify(data), token });

export const del = <T>(endpoint: string, token?: string): Promise<T> =>
  apiRequest<T>(endpoint, { method: "DELETE", token });
