import apiClient from "@/api/apiClient";
import { isAxiosError } from "axios";
import type { PlaceFormValues } from "../trip/types";

export const createDraftPlace = async (tripId: string) => {
  try {
    const response = await apiClient.post(`/trips/${tripId}/places`, {});

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && !error.response) {
      console.log("Network error");
    }

    throw error;
  }
};

export const updatePlace = async (
  placeId: string,
  payload: Partial<PlaceFormValues>
) => {
  try {
    const response = await apiClient.patch(`/places/${placeId}`, payload);

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && !error.response) {
      console.log("Network error");
    }

    throw error;
  }
};

export const getPlacesByTripId = async (tripId: string) => {
  try {
    const response = await apiClient.get(`/trips/${tripId}/places`);

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && !error.response) {
      console.log("Network error");
    }

    throw error;
  }
};

export const deletePlace = async (placeId: string) => {
  try {
    const response = await apiClient.delete(`/places/${placeId}`);

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && !error.response) {
      console.log("Network error");
    }

    throw error;
  }
};
