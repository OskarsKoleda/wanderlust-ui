import type { Trip, TripFormValues } from "./types";

export function tripToFormValues(trip: Trip): TripFormValues {
  return {
    title: trip.title,
    country: trip.country,
    city: trip.city,
    start_date: trip.start_date,
    end_date: trip.end_date,
    description: trip.description,
  };
}
