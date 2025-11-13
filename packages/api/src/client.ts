import ky, { type KyInstance, type Options as KyOptions } from "ky";
import type { ApiClient, ApiClientOptions, ApiError } from "./types";

const TIMEOUT = 30000;

export function createApiClient(
  options: ApiClientOptions,
  getToken: () => string | null,
): ApiClient {
  const { baseUrl, ...kyOptions } = options;

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
          const token = getToken();
          if (token) {
            request.headers.set("Authorization", `Bearer ${token}`);
          }
        },
      ],
      afterResponse: [
        async (_request, _options, response) => {
          if (!response.ok) {
            const error: ApiError = new Error(
              `API Error: ${response.status} ${response.statusText}`,
            );
            error.status = response.status;
            error.response = response;
            throw error;
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
