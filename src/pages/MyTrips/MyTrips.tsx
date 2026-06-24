import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { useGetUserTrips } from "@/features/user/hooks";
import { routes } from "@/router/routes";
import { Link } from "react-router";

export function MyTrips() {
  const { user, isInitializing } = useAuth();
  const userId = user?.id;
  const { data: trips } = useGetUserTrips(userId);

  if (isInitializing) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>My Trips</h1>
      {trips && trips.length > 0 && (
        <div>
          {trips.map((trip) => {
            return (
              <div className="flex" key={trip.id}>
                <div>
                  <h2>{trip.title}</h2>
                  <p>{trip.description}</p>
                </div>
                <Button asChild>
                  <Link to={`/${routes.myTrips}/${trip.id}/edit`}>EDIT</Link>
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
