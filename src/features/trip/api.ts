import apiClient from "@/api/apiClient";
import type { Trip, TripFormValues } from "./types";
import { isAxiosError } from "axios";

export const createDraftTrip = async (): Promise<Trip> => {
  try {
    const response = await apiClient.post<Trip>("/trips", {}); // TODO: weird solution?
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && !error.response) {
      console.log("Network error");
    }
    throw error;
  }
};

export const getTrip = async (id: string): Promise<Trip> => {
  try {
    const response = await apiClient.get(`/trips/${id}`);

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && !error.response) {
      console.log("Network error");
    }

    throw error;
  }
};

export const getTrips = async (): Promise<Trip[]> => {
  try {
    // TODO: fix hardcoded status=all
    const response = await apiClient.get("/trips?status=all");

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && !error.response) {
      console.log("Network error");
    }

    throw error;
  }
};

export const updateTrip = async (
  id: string,
  payload: Partial<TripFormValues>
): Promise<Trip> => {
  try {
    const response = await apiClient.patch(`/trips/${id}`, payload);
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && !error.response) {
      console.log("Network error");
    }

    throw error;
  }
};
