import type { PlaceFormValues } from "../trip/types";
import type { Place } from "./types";

export function placeToFormValues(place: Place): PlaceFormValues {
  return {
    name: place.name,
    location: place.location,
    description: place.description,
  };
}
