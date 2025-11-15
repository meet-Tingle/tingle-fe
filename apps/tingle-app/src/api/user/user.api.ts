import ApiClientInstance from "../ApiClientInstance";

type LoginResponse = {
  access: string;
  refresh: string;
};

type RegisterResponse = {
  message: string;
  email: string;
};

export async function login(email: string, password: string) {
  const response = await ApiClientInstance.post<LoginResponse>("users/login/", {
    json: { email, password },
  });
  return response;
}

export async function register(email: string, password: string) {
  const response = await ApiClientInstance.post<RegisterResponse>(
    "users/register/",
    {
      json: {
        email,
        password,
      },
    },
  );
  return response;
}
