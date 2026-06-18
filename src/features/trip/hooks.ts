import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createDraftTrip, getTrip, getTrips, updateTrip } from "./api";
import type { Trip, TripFormValues } from "./types";

export const tripKeys = {
  all: ["trips"] as const,
  detail: (id: string) => ["trips", id] as const,
};

export const useCreateDraftTrip = (onSuccess?: (trip: Trip) => void) => {
  const queryClient = useQueryClient();

  return useMutation<Trip, Error>({
    mutationFn: createDraftTrip,
    onSuccess: (trip) => {
      queryClient.setQueryData(tripKeys.detail(trip.id), trip);
      queryClient.invalidateQueries({ queryKey: tripKeys.all });
      onSuccess?.(trip);
    },
  });
};

export const useGetTrip = (id: string) => {
  return useQuery<Trip, Error>({
    queryKey: tripKeys.detail(id),
    queryFn: () => getTrip(id),
    enabled: !!id,
  });
};

export const useGetTrips = () => {
  return useQuery<Trip[], Error>({
    queryKey: tripKeys.all,
    queryFn: getTrips,
  });
};

export const useUpdateTrip = (id: string, onSuccess?: (trip: Trip) => void) => {
  const queryClient = useQueryClient();

  return useMutation<Trip, Error, Partial<TripFormValues>>({
    mutationFn: (payload) => updateTrip(id, payload),
    onSuccess: (trip) => {
      queryClient.setQueryData(tripKeys.detail(trip.id), trip);
      queryClient.invalidateQueries({ queryKey: tripKeys.all, exact: true });
      onSuccess?.(trip);
    },
  });
};
