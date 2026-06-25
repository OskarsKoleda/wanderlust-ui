import type { Trip, TripFormValues } from "./types";

function formatDateForInput(value: string | null): string {
  if (!value) {
    return "";
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  return value.split("T")[0] ?? value;
}

export function tripToFormValues(trip: Trip): TripFormValues {
  return {
    title: trip.title,
    country: trip.country,
    city: trip.city,
    start_date: formatDateForInput(trip.start_date),
    end_date: formatDateForInput(trip.end_date),
    description: trip.description,
  };
}
