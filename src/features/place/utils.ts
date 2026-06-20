import type { Place, PlaceFormValues } from "./types";

export function placeToFormValues(place: Place): PlaceFormValues {
  return {
    name: place.name,
    location: place.location,
    description: place.description,
  };
}
