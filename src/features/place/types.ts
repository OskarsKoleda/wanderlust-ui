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

export interface UploadSignature {
  signature: string;
  timestamp: number;
  public_id: string;
  folder: string;
  api_key: string;
  cloud_name: string;
}
