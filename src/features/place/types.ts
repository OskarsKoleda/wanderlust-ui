export interface Place {
  id: string;
  trip_id: string;
  name: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  created_at: string;
  updated_at: string;
}

export type PlaceFormValues = Pick<Place, "name" | "location" | "description">;
