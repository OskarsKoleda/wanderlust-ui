import apiClient from "@/api/apiClient";
import type { PlaceFormValues, UploadSignature } from "./types";

export const createDraftPlace = async (tripId: string) => {
  const response = await apiClient.post(`/trips/${tripId}/places`, {});

  return response.data;
};

export const updatePlace = async (
  placeId: string,
  payload: Partial<PlaceFormValues>
) => {
  const response = await apiClient.patch(`/places/${placeId}`, payload);

  return response.data;
};

export const getPlacesByTripId = async (tripId: string) => {
  const response = await apiClient.get(`/trips/${tripId}/places`);

  return response.data;
};

export const deletePlace = async (placeId: string) => {
  const response = await apiClient.delete(`/places/${placeId}`);

  return response.data;
};

export const requestUploadSignature = async (payload: {
  trip_id: string;
  place_id: string;
}) => {
  const response = await apiClient.post<UploadSignature>(
    `/uploads/sign`,
    payload
  );

  return response.data;
};
