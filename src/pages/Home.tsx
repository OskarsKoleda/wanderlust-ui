import { Button } from "@/components/ui/button";
import { Plane, ArrowRight } from "lucide-react";
import { Link } from "react-router";

export function Home() {
  return (
    <div>
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <div className="mb-6 flex justify-center">
            <Plane className="h-16 w-16 text-primary" />
          </div>
          <h1 className="mb-4">Record Your Travel Adventures</h1>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
            Create beautiful travel logs, document the places you visit, and
            share your experiences with the world.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/create">
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/portfolio">View Portfolio</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
