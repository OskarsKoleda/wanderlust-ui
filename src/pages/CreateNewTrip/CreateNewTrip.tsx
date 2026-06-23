import { useNavigate, useParams } from "react-router";
import EditTripForm from "./EditTrip/EditTripForm";
import { useGetTrip } from "@/features/trip/hooks";
import { ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditPlaces from "./EditPlaces/EditPlaces";

export function EditTrip() {
  const { id } = useParams();
  const { data: trip, isLoading } = useGetTrip(id!);
  const navigate = useNavigate();
  const isDraft = trip?.status === "draft";

  // TODO: add a loading state
  if (isLoading || !trip) {
    return <div>LOADING</div>;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <Button variant={"ghost"} onClick={() => navigate(-1)}>
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      {isDraft && (
        <div
          className="mb-6 flex items-center gap-2.5 rounded-lg border border-dashed px-4 py-2.5"
          style={{ borderColor: "#F1BF98", background: "#fdf6ef" }}
        >
          <FileText
            className="h-3 w-3 flex-shrink-0"
            style={{ color: "#08415C" }}
          />
          <p className="text-sm" style={{ color: "#08415C" }}>
            This trip is saved as a <strong>draft</strong> — only you can see
            it. Publish when you're ready to share.
          </p>
        </div>
      )}
      <EditTripForm tripId={trip.id} trip={trip} />
      <EditPlaces tripId={trip.id} />
    </div>
  );
}
