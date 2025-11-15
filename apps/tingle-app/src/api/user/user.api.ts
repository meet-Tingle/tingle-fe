import ApiClientInstance from "../ApiClientInstance";

type UserResponse = {
  access: string;
  refresh: string;
};

export async function login(email: string, password: string) {
  const response = await ApiClientInstance.post<UserResponse>("users/login/", {
    json: {
      email,
      password,
    },
  });
  return response;
}
