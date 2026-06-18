export interface Trip {
  id: string;
  user_id: string;
  title: string;
  start_date: string;
  end_date: string;
  description: string;
  country: string;
  city: string;
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
}

// TODO: update case in API response
export interface TripFormValues {
  title: string;
  start_date: string;
  end_date: string;
  description: string;
  country: string;
  city: string;
}

export interface PlaceFormValues {
  name: string;
  location: string;
  description: string;
  images?: File[];
}
