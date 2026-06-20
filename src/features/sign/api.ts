import apiClient from "@/api/apiClient";
import type { DestroySignature, UploadSignature } from "../picture/types";

export const requestUploadSignature = async (payload: {
  trip_id: string;
  place_id: string;
}) => {
  const response = await apiClient.post<UploadSignature>(
    `/sign/upload`,
    payload
  );

  return response.data;
};

export const requestDestroySignature = async (payload: {
  trip_id: string;
  place_id: string;
  picture_id: string;
}) => {
  const response = await apiClient.post<DestroySignature>(
    `/sign/destroy`,
    payload
  );

  return response.data;
};
