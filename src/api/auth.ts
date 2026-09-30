import { apiClient } from "./client";
import type { LoginResponse } from "../types/auth"

export type SignupParams = {
  username: string;
  email: string;
  password: string;
};

export type LoginParams = {
  username: string;
  password: string;
};

export async function signup(params: SignupParams) {
  const response = await apiClient.post("/users/", params);
  return response.data;
}

export async function login(params: LoginParams) {
  const response = await apiClient.post<LoginResponse>("/token/", params);
  return response.data;
}