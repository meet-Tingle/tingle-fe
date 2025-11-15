import type { KyInstance, Options as KyOptions } from "ky";
import type { AuthManagerInterface } from "./auth/AuthManagerInterface";

type ReissueTokenResult = {
  accessToken?: string;
  refreshToken?: string;
};

export interface ApiClientOptions extends KyOptions {
  baseUrl: string;
  onUnauthorized?: (
    authManager: AuthManagerInterface,
  ) => Promise<ReissueTokenResult | null>;
}

export interface ApiError extends Error {
  status?: number;
  response?: Response;
}

export interface ApiClient {
  get<T = unknown>(url: string, options?: KyOptions): Promise<T>;
  post<T = unknown>(url: string, options?: KyOptions): Promise<T>;
  put<T = unknown>(url: string, options?: KyOptions): Promise<T>;
  delete<T = unknown>(url: string, options?: KyOptions): Promise<T>;
  patch<T = unknown>(url: string, options?: KyOptions): Promise<T>;
  getInstance(): KyInstance;
}
