import { useMutation } from "@tanstack/react-query";
import { requestDestroySignature, requestUploadSignature } from "./api";
import type {
  DestroySignature,
  Picture,
  UploadSignature,
} from "../picture/types";

export const useRequestUploadSignature = (tripId: string, placeId: string) => {
  return useMutation<UploadSignature>({
    mutationFn: () =>
      requestUploadSignature({ trip_id: tripId, place_id: placeId }),
  });
};

export const useRequestDestroySignature = (tripId: string, placeId: string) => {
  return useMutation<DestroySignature, unknown, Picture["id"]>({
    mutationFn: (pictureId) =>
      requestDestroySignature({
        trip_id: tripId,
        place_id: placeId,
        picture_id: pictureId,
      }),
  });
};
