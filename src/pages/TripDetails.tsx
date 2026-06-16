import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetTrip } from "@/features/trip/hooks";
import { Link, useParams } from "react-router";

export function TripDetails() {
  const { id } = useParams();
  const { data: trip, isLoading } = useGetTrip(id!);

  if (isLoading) {
    return <h2>LOADING</h2>;
  }

  if (!trip) {
    return <h1>404</h1>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{trip.title}</CardTitle>
      </CardHeader>
      <CardContent>{trip.description}</CardContent>
      <CardFooter>
        <Button asChild>
          <Link to={`edit`}>EDIT</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
