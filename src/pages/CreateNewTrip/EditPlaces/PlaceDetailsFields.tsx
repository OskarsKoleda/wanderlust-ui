import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { uploadToCloudinary } from "@/features/cloudinary/api";
import { useCreatePicture, useGetPictures } from "@/features/picture/hooks";
import type { CreatePictureInput } from "@/features/picture/types";
import {
  useDeletePlace,
  useRequestUploadSignature,
  useUpdatePlace,
} from "@/features/place/hooks";
import type { Place, PlaceFormValues } from "@/features/place/types";
import { placeToFormValues } from "@/features/place/utils";
import { MapPin, Upload, X } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";

const placeDefaultValues: PlaceFormValues = {
  name: "",
  location: "",
  description: "",
};

interface PlaceDetailsFieldsProps {
  tripId: string;
  place: Place;
}

export function PlaceDetailsFields({ tripId, place }: PlaceDetailsFieldsProps) {
  const mappedPlace = placeToFormValues(place);
  const inputRef = useRef<HTMLInputElement>(null);
  const methods = useForm<PlaceFormValues>({
    defaultValues: placeDefaultValues,
    values: mappedPlace,
  });

  const {
    register,
    formState: { isDirty, dirtyFields },
    control,
    getValues,
    reset,
  } = methods;

  const { data: pictures } = useGetPictures(tripId, place.id);
  const { mutate: deletePlace } = useDeletePlace(tripId, place.id);
  const { mutate: updatePlace, isPending } = useUpdatePlace(place.id, (place) =>
    reset(placeToFormValues(place))
  );

  const { mutateAsync: createPicture } = useCreatePicture(tripId, place.id);
  const { mutateAsync: requestUploadSignature } = useRequestUploadSignature(
    tripId,
    place.id
  );

  const values = useWatch({ control });

  useEffect(() => {
    if (!isDirty || isPending) {
      return;
    }

    const timeout = setTimeout(() => {
      const payload = Object.fromEntries(
        Object.keys(dirtyFields).map((key) => [
          key,
          getValues(key as keyof PlaceFormValues),
        ])
      );

      updatePlace(payload);
    }, 600);

    return () => clearTimeout(timeout);
  }, [values, dirtyFields, getValues, isDirty, updatePlace, isPending]);

  const handleFiles = useCallback(
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

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          Place
        </CardTitle>
        <Button type="button" variant={"ghost"} onClick={() => deletePlace()}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor={`place-name-${place.id}`}>Place Name</Label>
          <Input
            id={`place-name-${place.id}`}
            placeholder="e.g., Loch-Ness Lake"
            {...register("name")}
          />
        </div>
        <div>
          <Label htmlFor={`location-${place.id}`}>Location</Label>
          <Input
            id={`location-${place.id}`}
            placeholder="Essex County"
            {...register("location")}
          />
        </div>
        <div>
          <Label htmlFor={`place-description-${place.id}`}>Description</Label>
          <Textarea
            id={`place-description-${place.id}`}
            placeholder="Share your experience..."
            {...register("description")}
          />
        </div>
        <div>
          <Label>Photos</Label>

          <div
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={async (e) => {
              e.preventDefault();

              const files = Array.from(e.dataTransfer.files).filter((f) =>
                f.type.startsWith("image/")
              );

              await handleFiles(files);
            }}
            className="mt-2 cursor-pointer rounded-lg border-2 border-dashed border-border p-6 transition-colors hover:border-primary/50"
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={async (e) => {
                const files = Array.from(e.target.files ?? []);
                e.target.value = "";
                await handleFiles(files);
              }}
            />
            <div className="flex flex-col items-center justify-center text-center">
              <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
              <p className="text-muted-foreground">
                Click to upload or drag and drop
              </p>
              <p className="text-muted-foreground">PNG, JPG up to 10MB</p>
            </div>
          </div>
        </div>

        {pictures && pictures.length > 0 && (
          <div className="mt-2 grid grid-cols-3 gap-2">
            {pictures.map((pic) => (
              <img
                key={pic.id}
                src={pic.cloudinary_url}
                className="aspect-square rounded object-cover"
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
