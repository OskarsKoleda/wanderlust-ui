import type { Trip, TripFormValues } from "@/features/trip/types";
import { FormProvider, useForm } from "react-hook-form";
import { useAutoSaveDraftTrip } from "../../../features/trip/useAutoSaveDraftTrip";
import { tripToFormValues } from "@/features/trip/utils";
import { TripDetailsFields } from "./TripDetailsFields";

const defaultValues: TripFormValues = {
  title: "",
  start_date: "",
  end_date: "",
  description: "",
  country: "",
  city: "",
};

interface EditFormProps {
  tripId: string;
  trip: Trip;
}

export function EditTripForm({ tripId, trip }: EditFormProps) {
  const methods = useForm<TripFormValues>({
    defaultValues,
    values: tripToFormValues(trip),
  });

  const { isSaving } = useAutoSaveDraftTrip({ trip, tripId, methods });

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2">Create New Trip</h1>
        <p className="text-sm text-muted-foreground">
          Record your travel memories and the places you've visited
        </p>
      </div>

      <FormProvider {...methods}>
        <form className="space-y-8">
          <TripDetailsFields isSaving={isSaving} />
        </form>
      </FormProvider>

      {/* {fields.length === 0 && <h3>No places added yet</h3>}

          {fields.map((field, index) => (
            <PlaceCard
              key={field.id}
              index={index}
              onRemove={() => remove(index)}
            />
          ))} */}
    </div>
  );
}
