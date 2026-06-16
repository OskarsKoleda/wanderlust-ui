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
  const { register } = useFormContext<TripFormValues>();

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
            <Input id="startDate" type="date" {...register("start_date")} />
          </div>

          <div>
            <Label htmlFor="endDate">End Date</Label>
            <Input id="endDate" type="date" {...register("end_date")} />
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
