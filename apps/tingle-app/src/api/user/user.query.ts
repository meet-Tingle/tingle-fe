export const UserQueryKeys = {
  user: {
    all: ["user"] as const,
    login: () => [...UserQueryKeys.user.all, "login"] as const,
    register: () => [...UserQueryKeys.user.all, "register"] as const,
  },
};
