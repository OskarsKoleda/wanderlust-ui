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

    const timeout = setTimeout(() => {
      const payload = Object.fromEntries(
        Object.keys(dirtyFields).map((key) => [
          key,
          getValues(key as keyof TripFormValues),
        ])
      );

      updateTrip(payload);
    }, 600);

    return () => clearTimeout(timeout);
  }, [
    values,
    isDirty,
    trip.status,
    isPending,
    getValues,
    updateTrip,
    dirtyFields,
  ]);

  return { isSaving: isPending };
}
