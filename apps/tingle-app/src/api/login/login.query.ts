export const LoginQueryKeys = {
  login: {
    all: ["login"] as const,
    mutation: () => [...LoginQueryKeys.login.all, "mutation"] as const,
  },
};
