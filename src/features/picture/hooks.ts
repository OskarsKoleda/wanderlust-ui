import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPicture, deletePicture, getPictures } from "./api";
import { useCallback } from "react";
import { removeFromCloudinary, uploadToCloudinary } from "../cloudinary/api";
import type { CreatePictureInput, Picture } from "./types";
import {
  useRequestDestroySignature,
  useRequestUploadSignature,
} from "../sign/hooks";

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

export const useDeletePicture = (tripId: string, placeId: string) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, Picture["id"]>({
    mutationFn: (pictureId) => deletePicture(tripId, placeId, pictureId),
    onSuccess: (_result, pictureId) => {
      queryClient.setQueryData<Picture[]>(
        ["pictures", tripId, placeId],
        (oldPictures) =>
          oldPictures
            ? oldPictures.filter((picture) => picture.id !== pictureId)
            : []
      );
    },
  });
};

export const usePictureManager = (tripId: string, placeId: string) => {
  const { mutateAsync: createPicture } = useCreatePicture(tripId, placeId);
  const { mutateAsync: deletePicture } = useDeletePicture(tripId, placeId);
  const { mutateAsync: requestUploadSignature } = useRequestUploadSignature(
    tripId,
    placeId
  );

  const { mutateAsync: requestDestroySignature } = useRequestDestroySignature(
    tripId,
    placeId
  );

  const handleFilesUpload = useCallback(
    async (files: File[]) => {
      if (files.length === 0) {
        return;
      }

      await Promise.all(
        files.map(async (file) => {
          const signature = await requestUploadSignature();
          const uploadedImage = await uploadToCloudinary(file, signature);

          const pictureInput: CreatePictureInput = {
            cloudinary_public_id: uploadedImage.public_id,
            cloudinary_url: uploadedImage.secure_url,
            cloudinary_version: uploadedImage.version,
            width: uploadedImage.width,
            height: uploadedImage.height,
            format: uploadedImage.format,
            bytes: uploadedImage.bytes,
            caption: uploadedImage.display_name,
          };

          await createPicture(pictureInput);
        })
      );
    },

    [createPicture, requestUploadSignature]
  );

  const handleFileDestroy = useCallback(
    async (
      pictureId: Picture["id"],
      cloudinaryPublicId: Picture["cloudinary_public_id"]
    ) => {
      const signature = await requestDestroySignature(pictureId);

      await deletePicture(pictureId);
      await removeFromCloudinary(cloudinaryPublicId, signature);
    },
    [deletePicture, requestDestroySignature]
  );

  return {
    handleFilesUpload,
    handleFileDestroy,
  };
};
