import apiClient from "@/api/apiClient";
import type { LoginPayload } from "./types";

export const logout = async () => {
  const response = await apiClient.post("/auth/logout");

  return response.data;
};

export const login = async (payload: LoginPayload) => {
  const response = await apiClient.post("/auth/login", payload);

  return response.data;
};
