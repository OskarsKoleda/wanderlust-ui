import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createDraftTrip,
  deleteTrip,
  getTrip,
  getTrips,
  updateTrip,
} from "./api";
import type { Trip, TripFormValues } from "./types";
import type { User } from "../user/types";

export const tripKeys = {
  allTrips: ["trips"] as const,
  userTrips: (userId: number) => ["user", userId, "trips"] as const,
  tripDetails: (id: string) => ["trips", id] as const,
};

export const useCreateDraftTrip = (onSuccess?: (trip: Trip) => void) => {
  const queryClient = useQueryClient();

  return useMutation<Trip, Error>({
    mutationFn: createDraftTrip,
    onSuccess: (trip) => {
      queryClient.setQueryData(tripKeys.tripDetails(trip.id), trip);
      queryClient.invalidateQueries({ queryKey: tripKeys.allTrips });
      onSuccess?.(trip);
    },
  });
};

export const useGetTrip = (id: string) => {
  return useQuery<Trip, Error>({
    queryKey: tripKeys.tripDetails(id),
    queryFn: () => getTrip(id),
    enabled: !!id,
  });
};

export const useGetTrips = () => {
  return useQuery<Trip[], Error>({
    queryKey: tripKeys.allTrips,
    queryFn: getTrips,
  });
};

export const useUpdateTrip = (id: string, onSuccess?: (trip: Trip) => void) => {
  const queryClient = useQueryClient();

  return useMutation<Trip, Error, Partial<TripFormValues>>({
    mutationFn: (payload) => updateTrip(id, payload),
    onSuccess: (trip) => {
      queryClient.setQueryData(tripKeys.tripDetails(trip.id), trip);
      queryClient.invalidateQueries({
        queryKey: tripKeys.allTrips,
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: tripKeys.userTrips(Number(trip.user_id)),
      });
      onSuccess?.(trip);
    },
  });
};

export const useDeleteTrip = (tripId: string, onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteTrip(tripId),
    onSuccess: () => {
      const currentUser = queryClient.getQueryData<User>(["user"]);
      const userId = currentUser?.id;

      queryClient.invalidateQueries({
        queryKey: tripKeys.allTrips,
        exact: true,
      });

      if (userId) {
        queryClient.invalidateQueries({
          queryKey: tripKeys.userTrips(userId),
        });
      }
      onSuccess?.();
    },
  });
};
