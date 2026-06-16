import { Button } from "@/components/ui/button";
import { useGetTrips } from "@/features/trip/hooks";
import { Link } from "react-router";

export function Trips() {
  const { data: trips, isLoading } = useGetTrips();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!trips) {
    return <div>No trips added yet</div>;
  }

  return (
    <div>
      <h1>Trips</h1>
      {trips.length > 0 &&
        trips.map((trip) => {
          return (
            <div key={trip.id} className="flex flex-col">
              <div className="flex">
                <h2>
                  {trip.id} - {trip.title}
                </h2>
                <Button key={trip.id} asChild>
                  <Link to={`/trips/${trip.id}`}>{trip.id}</Link>
                </Button>
              </div>
            </div>
          );
        })}
    </div>
  );
}
