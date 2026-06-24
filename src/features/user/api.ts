import apiClient from "@/api/apiClient";
import { isAxiosError } from "axios";
import type { CreateUserPayload, User } from "./types";
import type { Trip } from "../trip/types";

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

export const getUser = async (): Promise<User> => {
  const response = await apiClient.get("/users/me");

  return response.data;
};

export const getUserTrips = async (userId: number): Promise<Trip[]> => {
  const response = await apiClient.get(`/users/${userId}/trips`);

  return response.data;
};
