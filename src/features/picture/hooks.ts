import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPicture, getPictures } from "./api";
import type { CreatePictureInput, Picture } from "./types";

// Alternative solution for reference
// queryClient.invalidateQueries({
//   queryKey: ["pictures", tripId, placeId],
// });

export const useCreatePicture = (tripId: string, placeId: string) => {
  const queryClient = useQueryClient();

  return useMutation<Picture, unknown, CreatePictureInput>({
    mutationFn: (payload) => createPicture(tripId, placeId, payload),
    onSuccess: (picture) => {
      queryClient.setQueryData<Picture[]>(
        ["pictures", tripId, placeId],
        (old) => (old ? [...old, picture] : [picture])
      );
    },
  });
};

export const useGetPictures = (tripId: string, placeId: string) => {
  return useQuery<Picture[]>({
    queryKey: ["pictures", tripId, placeId],
    queryFn: () => getPictures(tripId, placeId),
  });
};
