import ApiClientInstance from "../ApiClientInstance";

type LoginResponse = {
  access: string;
  refresh: string;
};

export async function login(email: string, password: string) {
  const response = await ApiClientInstance.post<LoginResponse>("users/login/", {
    json: {
      email,
      password,
    },
  });
  return response;
}
