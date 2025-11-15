import { z } from "zod";
import ApiClientInstance from "../ApiClientInstance";

const loginResponseSchema = z.object({
  access: z.string(),
  refresh: z.string(),
});

const registerResponseSchema = z.object({
  message: z.string(),
  email: z.string(),
});

const sendCodeResponseSchema = z.object({
  message: z.string(),
  expires_in: z.number(),
});

const verifyCodeResponseSchema = z.object({
  message: z.string(),
});

export async function login(email: string, password: string) {
  const response = await ApiClientInstance.post<
    z.infer<typeof loginResponseSchema>
  >("users/login/", {
    json: { email, password },
  });
  return response;
}

export async function register(email: string, password: string) {
  const response = await ApiClientInstance.post<
    z.infer<typeof registerResponseSchema>
  >("users/register/", {
    json: { email, password },
  });
  return response;
}

export async function sendCode(email: string) {
  const response = await ApiClientInstance.post<
    z.infer<typeof sendCodeResponseSchema>
  >("users/send-code/", {
    json: { email },
  });
  return response;
}

export async function verifyCode(email: string, code: string) {
  const response = await ApiClientInstance.post<
    z.infer<typeof verifyCodeResponseSchema>
  >("users/verify-code/", {
    json: { email, code },
  });
  return response;
}
