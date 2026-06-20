import apiClient from "@/api/apiClient";
import type { CreatePictureInput, Picture } from "./types";

export const createPicture = async (
  tripId: string,
  placeId: string,
  payload: CreatePictureInput
) => {
  const response = await apiClient.post(
    `/trips/${tripId}/places/${placeId}/pictures`,
    payload
  );

  return response.data;
};

export const getPictures = async (tripId: string, placeId: string) => {
  const response = await apiClient.get<Picture[]>(
    `/trips/${tripId}/places/${placeId}/pictures`
  );

  return response.data;
};
