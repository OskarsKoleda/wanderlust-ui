import { Link, useLocation } from "react-router";
import { Briefcase, Compass, Home, Plane, Plus, User } from "lucide-react";
import { Button } from "../ui/button";
import { routes } from "@/router/routes";

const navOptions = [
  {
    name: "Home",
    link: routes.home,
    icon: <Home />,
  },
  {
    name: "Explore",
    link: routes.explore,
    icon: <Compass />,
  },
  {
    name: "Portfolio",
    link: routes.portfolio,
    icon: <Briefcase />,
  },
  {
    name: "Create Trip",
    link: routes.create,
    icon: <Plus />,
  },
  {
    name: "Profile",
    link: routes.profile,
    icon: <User />,
  },
];

export function Header() {
  const location = useLocation();
  const isActiveLink = (path: string) =>
    path === "/"
      ? location.pathname === path
      : location.pathname.startsWith(path);

  return (
    <header className="sticky top-0 z-50" style={{ background: "#08415C" }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="flex items-center gap-3 text-white transition-opacity hover:opacity-80"
        >
          <Plane className="h-6 w-6 text-white" />
          <h1 className="text-white">Wanderlust</h1>
        </Link>
        <nav className="flex items-center gap-4">
          {navOptions.map((option) => (
            <Button
              key={option.name}
              variant="ghost"
              asChild
              className={`${isActiveLink(option.link) ? "bg-white/15 text-white" : ""} gap-2 text-white/80 hover:bg-white/10 hover:text-white`}
            >
              <Link to={option.link}>
                {option.icon}
                {option.name}
              </Link>
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
}
