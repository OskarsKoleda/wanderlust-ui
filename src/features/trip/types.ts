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
  cover_picture_id: string | null;
  places_count: number;
}

export type TripFormValues = Pick<
  Trip,
  "title" | "start_date" | "end_date" | "description" | "country" | "city"
>;
