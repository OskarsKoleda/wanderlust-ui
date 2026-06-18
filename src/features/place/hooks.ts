import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createDraftPlace,
  deletePlace,
  getPlacesByTripId,
  updatePlace,
} from "./api";
import type { Place } from "./types";
import type { PlaceFormValues } from "../trip/types";

export const placeKeys = {
  byTrip: (tripId: string) => ["trips", tripId, "places"],
};

export const useGetPlacesByTripId = (tripId: string) => {
  return useQuery<Place[], Error>({
    queryKey: placeKeys.byTrip(tripId),
    queryFn: () => getPlacesByTripId(tripId),
    enabled: !!tripId,
  });
};

export const useCreateDraftPlace = (
  tripId: string,
  onSuccess?: (place: Place) => void
) => {
  const queryClient = useQueryClient();

  return useMutation<Place, Error>({
    mutationFn: () => createDraftPlace(tripId),
    onSuccess: (place) => {
      queryClient.setQueryData<Place[]>(placeKeys.byTrip(tripId), (old) => {
        return old ? [...old, place] : [place];
      });
      onSuccess?.(place);
    },
  });
};

export const useUpdatePlace = (
  placeId: string,
  onSuccess?: (place: Place) => void
) => {
  const queryClient = useQueryClient();

  return useMutation<Place, Error, Partial<PlaceFormValues>>({
    mutationFn: (payload) => updatePlace(placeId, payload),
    onSuccess: (place) => {
      queryClient.setQueryData<Place[]>(
        placeKeys.byTrip(place.trip_id),
        (old) => old?.map((p) => (p.id !== placeId ? p : place))
      );
      onSuccess?.(place);
    },
  });
};

export const useDeletePlace = (tripId: string, placeId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deletePlace(placeId),
    onSuccess: () => {
      queryClient.setQueryData<Place[]>(placeKeys.byTrip(tripId), (old) =>
        old?.filter((p) => p.id !== placeId)
      );
    },
  });
};
