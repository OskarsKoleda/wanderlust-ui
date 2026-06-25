import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { TripFormValues } from "@/features/trip/types";
import { Loader2 } from "lucide-react";
import { useFormContext } from "react-hook-form";

interface TripDetailsFieldsProps {
  isSaving: boolean;
}

export function TripDetailsFields({ isSaving }: TripDetailsFieldsProps) {
  const {
    register,
    watch,
    formState: { errors },
    trigger,
  } = useFormContext<TripFormValues>();

  const startDate = watch("start_date");
  const endDate = watch("end_date");

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Trip Details</CardTitle>
        {isSaving && (
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Saving...
          </span>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="title">Trip Title</Label>
          <Input
            id="title"
            placeholder="e.g., Winter in Scotland"
            {...register("title")}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="country">Country</Label>
            <Input id="country" {...register("country")} />
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input id="city" {...register("city")} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              {...register("start_date", {
                validate: (value) => {
                  if (!value || !endDate) {
                    return true;
                  }

                  const valid =
                    value <= endDate ||
                    "Start date must be before or equal to end date";

                  if (valid) {
                    trigger("end_date");
                  }

                  return valid;
                },
              })}
            />
            {errors.start_date && (
              <p className="mt-1 text-sm text-destructive">
                {errors.start_date.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="date"
              {...register("end_date", {
                validate: (value) => {
                  if (!value || !startDate) {
                    return true;
                  }

                  const valid =
                    value >= startDate ||
                    "End date must be on or after start date";

                  if (valid) {
                    trigger("start_date");
                  }

                  return valid;
                },
              })}
            />
            {errors.end_date && (
              <p className="mt-1 text-sm text-destructive">
                {errors.end_date.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="trip-description">Description</Label>
          <Textarea
            id="trip-description"
            placeholder="Share your experience..."
            {...register("description")}
          />
        </div>
      </CardContent>
    </Card>
  );
}
