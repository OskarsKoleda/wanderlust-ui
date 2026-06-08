import apiClient from "@/api/apiClient";
import { isAxiosError } from "axios";
import type { LoginPayload } from "./types";

export const logout = async () => {
  try {
    const response = await apiClient.post("/auth/logout");

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && !error.response) {
      console.log("Network error");
    }

    throw error;
  }
};

export const login = async (payload: LoginPayload) => {
  try {
    const response = await apiClient.post("/auth/login", payload);

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && !error.response) {
      console.log("Network error");
    }

    throw error;
  }
};
