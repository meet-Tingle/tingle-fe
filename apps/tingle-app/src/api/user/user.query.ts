export const UserQueryKeys = {
  login: {
    all: ["user"] as const,
    mutation: () => [...UserQueryKeys.login.all, "mutation"] as const,
  },
};
