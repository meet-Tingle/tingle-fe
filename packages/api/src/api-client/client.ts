import ky, { type KyInstance, type Options as KyOptions } from "ky";
import type { AuthManagerInterface } from "../auth/AuthManagerInterface";
import type { ApiClient, ApiClientOptions } from "../types";

const TIMEOUT = 30000;

export type ApiClientType = ReturnType<typeof createApiClient>;

export function createApiClient(
  options: ApiClientOptions,
  authManager: AuthManagerInterface,
): ApiClient {
  const { baseUrl, onUnauthorized, ...kyOptions } = options;

  const instance: KyInstance = ky.create({
    prefixUrl: baseUrl,
    timeout: TIMEOUT,
    retry: {
      limit: 2,
      methods: ["get", "put", "head", "delete", "options", "trace"],
      statusCodes: [408, 413, 429, 500, 502, 503, 504],
    },
    hooks: {
      beforeRequest: [
        (request) => {
          const accessToken = authManager.accessToken;
          if (accessToken) {
            request.headers.set("Authorization", `Bearer ${accessToken}`);
          }
        },
      ],
      afterResponse: [
        async (request, options, response) => {
          // 401 Unauthorized: onUnauthorized 콜백 호출
          if (response.status === 401 && onUnauthorized) {
            const isRetry = request.headers.get("X-Retry-Request");

            if (!isRetry) {
              try {
                const result = await onUnauthorized(authManager);

                if (result?.accessToken && result.refreshToken) {
                  authManager.setTokens(
                    result.accessToken,
                    result.refreshToken,
                  );
                  request.headers.set(
                    "Authorization",
                    `Bearer ${result.accessToken}`,
                  );
                  request.headers.set("X-Retry-Request", "true");
                  return ky(request, options);
                }

                authManager.clearTokens();
                const error = new ApiError(
                  "Token reissue failed. Please login again.",
                  401,
                  response,
                );
                throw error;
              } catch {
                authManager.clearTokens();
                const error = new ApiError(
                  "Token reissue failed. Please login again.",
                  401,
                  response,
                );
                throw error;
              }
            }
          }

          if (!response.ok) {
            throw new ApiError(
              `API Error: ${response.status} ${response.statusText}`,
              response.status,
              response,
            );
          }

          return response;
        },
      ],
    },
    ...kyOptions,
  });

  return {
    async get<T = unknown>(url: string, options?: KyOptions): Promise<T> {
      const response = await instance.get(url, options);
      return response.json<T>();
    },

    async post<T = unknown>(url: string, options?: KyOptions): Promise<T> {
      const response = await instance.post(url, options);
      return response.json<T>();
    },

    async put<T = unknown>(url: string, options?: KyOptions): Promise<T> {
      const response = await instance.put(url, options);
      return response.json<T>();
    },

    async delete<T = unknown>(url: string, options?: KyOptions): Promise<T> {
      const response = await instance.delete(url, options);
      return response.json<T>();
    },

    async patch<T = unknown>(url: string, options?: KyOptions): Promise<T> {
      const response = await instance.patch(url, options);
      return response.json<T>();
    },

    getInstance(): KyInstance {
      return instance;
    },
  };
}

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly response: Response,
  ) {
    super(message);
  }
}
