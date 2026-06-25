import { useUpdateTrip } from "@/features/trip/hooks";
import type { Trip, TripFormValues } from "@/features/trip/types";
import { tripToFormValues } from "@/features/trip/utils";
import { useEffect } from "react";
import { useWatch, type UseFormReturn } from "react-hook-form";

interface autoSaveDraftTripProps {
  trip: Trip;
  tripId: string;
  methods: UseFormReturn<TripFormValues>;
}

export function useAutoSaveDraftTrip({
  trip,
  tripId,
  methods,
}: autoSaveDraftTripProps) {
  const {
    control,
    formState: { isDirty, dirtyFields },
    getValues,
    reset,
  } = methods;

  const { mutate: updateTrip, isPending } = useUpdateTrip(tripId, (saved) =>
    reset(tripToFormValues(saved))
  );

  const values = useWatch({ control });

  useEffect(() => {
    if (trip.status !== "draft" || !isDirty || isPending) {
      return;
    }

    const dirtyKeys = Object.keys(dirtyFields);

    if (dirtyKeys.length === 0) {
      return;
    }

    const startDate = getValues("start_date");
    const endDate = getValues("end_date");

    if (startDate && endDate && startDate > endDate) {
      return;
    }

    // Snapshot the payload now (while dirtyFields is fresh) so the timeout
    // always sends the values that were current when this effect ran.
    // The cleanup cancels the timeout if the effect re-runs before 600ms.
    const payload = Object.fromEntries(
      dirtyKeys.map((key) => [key, getValues(key as keyof TripFormValues)])
    );

    const timeout = setTimeout(() => updateTrip(payload), 600);

    return () => clearTimeout(timeout);
  }, [
    values,
    isDirty,
    trip.status,
    isPending,
    dirtyFields,
    getValues,
    updateTrip,
  ]);

  return { isSaving: isPending };
}
