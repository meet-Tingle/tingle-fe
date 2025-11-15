export const UserQueryKeys = {
  user: {
    all: ["user"] as const,
    login: () => [...UserQueryKeys.user.all, "login"] as const,
    register: () => [...UserQueryKeys.user.all, "register"] as const,
    sendCode: () => [...UserQueryKeys.user.all, "sendCode"] as const,
    verifyCode: () => [...UserQueryKeys.user.all, "verifyCode"] as const,
  },
};
