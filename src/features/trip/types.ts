export interface Trip {
  id: string;
  user_id: string;
  title: string | null;
  start_date: string | null;
  end_date: string | null;
  description: string | null;
  country: string | null;
  city: string | null;
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
