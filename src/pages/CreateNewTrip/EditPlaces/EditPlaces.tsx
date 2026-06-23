import { Button } from "@/components/ui/button";
import {
  useCreateDraftPlace,
  useGetPlacesByTripId,
} from "@/features/place/hooks";
import { Plus } from "lucide-react";
import PlaceDetailsFields from "./PlaceDetailsFields";
import { memo } from "react";

interface EditPlacesProps {
  tripId: string;
}

function EditPlaces({ tripId }: EditPlacesProps) {
  const { data: places } = useGetPlacesByTripId(tripId);
  const { mutate: createDraftPlace } = useCreateDraftPlace(tripId);

  if (!places) {
    return <div>LOADING</div>;
  }

  return (
    <div>
      <div className="mb-6 flex justify-between">
        {places.length > 0 ? (
          <div>
            <h2>Places Visited</h2>
            <p className="text-sm text-muted-foreground">
              Add the places you visited during this trip
            </p>
          </div>
        ) : (
          <div>
            <h2>Add Places</h2>
            <p className="text-sm text-muted-foreground">
              Add the places you visited during this trip
            </p>
          </div>
        )}

        <Button
          type="button"
          variant={"outline"}
          className="ml-auto"
          onClick={() => createDraftPlace()}
        >
          <Plus className="h-4 w-4" />
          Add Place
        </Button>
      </div>
      <div className="space-y-6">
        {places?.map((place) => {
          return (
            <PlaceDetailsFields key={place.id} tripId={tripId} place={place} />
          );
        })}
      </div>
    </div>
  );
}

export default memo(EditPlaces);
