import { useParams } from "react-router";
import { EditTripForm } from "./EditTripForm";
import { useGetTrip } from "@/features/trip/hooks";

export function EditTrip() {
  const { id } = useParams();
  const { data: trip, isLoading } = useGetTrip(id!);

  // TODO: add a loading state
  if (isLoading || !trip) {
    return <div>LOADING</div>;
  }

  return <EditTripForm tripId={id!} trip={trip} />;
}
