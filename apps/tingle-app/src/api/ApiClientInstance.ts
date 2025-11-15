import { createApiClient } from "@tingle/api";
import { authManager } from "./auth/AuthManagerImpl";
import { reissueToken } from "./auth/reissueToken";

const ApiClientInstance = createApiClient(
  {
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    onUnauthorized: reissueToken,
  },
  authManager,
);

export default ApiClientInstance;
