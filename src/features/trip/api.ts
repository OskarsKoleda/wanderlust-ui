import apiClient from "@/api/apiClient";
import type { Trip, TripFormValues } from "./types";

export const createDraftTrip = async (): Promise<Trip> => {
  const response = await apiClient.post<Trip>("/trips", {}); // TODO: weird solution?

  return response.data;
};

export const getTrip = async (id: string): Promise<Trip> => {
  const response = await apiClient.get(`/trips/${id}`);

  return response.data;
};

export const getTrips = async (): Promise<Trip[]> => {
  // TODO: fix hardcoded status=all
  const response = await apiClient.get("/trips?status=all");

  return response.data;
};

export const updateTrip = async (
  id: string,
  payload: Partial<TripFormValues>
): Promise<Trip> => {
  const response = await apiClient.patch(`/trips/${id}`, payload);

  return response.data;
};
