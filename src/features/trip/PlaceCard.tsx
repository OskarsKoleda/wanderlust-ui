import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Upload, X } from "lucide-react";
import { useRef } from "react";
import { useFormContext, Controller } from "react-hook-form";

interface PlaceCardProps {
  index: number;
  onRemove: () => void;
}

export function PlaceCard({ index, onRemove }: PlaceCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { register, control } = useFormContext();

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          Place
        </CardTitle>
        <Button type="button" variant={"ghost"} onClick={() => onRemove()}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor={`place-name-${index}`}>Place Name</Label>
          <Input
            id={`place-name-${index}`}
            placeholder="e.g., Loch-Ness Lake"
            {...register(`places.${index}.placeName`)}
          />
        </div>
        <div>
          <Label htmlFor={`location-${index}`}>Location</Label>
          <Input
            id={`location-${index}`}
            placeholder="Essex County"
            {...register(`places.${index}.location`)}
          />
        </div>
        <div>
          <Label htmlFor={`place-description-${index}`}>Description</Label>
          <Textarea
            id={`place-description-${index}`}
            placeholder="Share your experience..."
            {...register(`places.${index}.description`)}
          />
        </div>
        <div>
          <Label>Photos</Label>
          <Controller
            name={`places.${index}.images`}
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <>
                <div
                  onClick={() => inputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    const files = Array.from(e.dataTransfer.files); // TODO: add isImage
                    field.onChange([...(field.value ?? []), ...files]);
                  }}
                  className="mt-2 cursor-pointer rounded-lg border-2 border-dashed border-border p-6 transition-colors hover:border-primary/50"
                >
                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      const files = Array.from(e.target.files ?? []);
                      field.onChange([...(field.value ?? []), ...files]);
                      e.target.value = "";
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

                {field.value?.length > 0 && <div>Your image</div>}
              </>
            )}
          ></Controller>
        </div>
      </CardContent>
    </Card>
  );
}
