import apiClient from "@/api/apiClient";
import { isAxiosError } from "axios";
import type { CreateUserPayload, User } from "./types";

export const createUser = async (user: CreateUserPayload): Promise<User> => {
  try {
    const response = await apiClient.post("/users", user);

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && !error.response) {
      console.log("Network error");
    }

    throw error;
  }
};
