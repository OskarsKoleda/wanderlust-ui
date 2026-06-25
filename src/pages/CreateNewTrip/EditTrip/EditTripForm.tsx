import type { Trip, TripFormValues } from "@/features/trip/types";
import { FormProvider, useForm } from "react-hook-form";
import { useAutoSaveDraftTrip } from "../../../features/trip/useAutoSaveDraftTrip";
import { tripToFormValues } from "@/features/trip/utils";
import { TripDetailsFields } from "./TripDetailsFields";
import { Button } from "@/components/ui/button";
import { Globe, Trash } from "lucide-react";
import { useDeleteTrip } from "@/features/trip/hooks";
import { memo } from "react";
import { useNavigate } from "react-router";
import { routes } from "@/router/routes";

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

function EditTripForm({ tripId, trip }: EditFormProps) {
  const methods = useForm<TripFormValues>({
    defaultValues,
    values: tripToFormValues(trip),
    mode: "onChange",
  });

  const navigate = useNavigate();

  const { isSaving } = useAutoSaveDraftTrip({ trip, tripId, methods });
  const { mutate: deleteTrip } = useDeleteTrip(tripId, () =>
    navigate(`/${routes.myTrips}`)
  );

  return (
    <div>
      <div className="flex justify-between">
        <div className="mb-8">
          <h1 className="mb-2">Create New Trip</h1>
          <p className="text-sm text-muted-foreground">
            Record your travel memories and the places you've visited
          </p>
        </div>
        <div className="space-x-4">
          <Button variant="destructive-outline" onClick={() => deleteTrip()}>
            <Trash className="h-4 w-4" />
            Discard
          </Button>
          <Button>
            <Globe className="h-4 w-4" /> Publish
          </Button>
        </div>
      </div>

      <FormProvider {...methods}>
        <form className="space-y-8">
          <TripDetailsFields isSaving={isSaving} />
        </form>
      </FormProvider>
    </div>
  );
}

export default memo(EditTripForm);
