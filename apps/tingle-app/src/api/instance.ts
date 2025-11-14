import { createApiClient } from "@tingle/api";

const instance = createApiClient(
  {
    baseUrl: "http://localhost:3000",
    headers: {
      "Content-Type": "application/json",
    },
  },
  () => null,
);

export default instance;
