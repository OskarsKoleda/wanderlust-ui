import { Link, useLocation, useNavigate } from "react-router";
import {
  Briefcase,
  Compass,
  Home,
  LogOut,
  Plane,
  Plus,
  User,
} from "lucide-react";
import { Button } from "../ui/button";
import { routes } from "@/router/routes";
import { useAuth } from "@/context/auth-context";
import { useLogout } from "@/features/auth/hooks";

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
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isActiveLink = (path: string) =>
    path === "/"
      ? location.pathname === path
      : location.pathname.startsWith(path);

  const { mutate: logoutUser, isPending: isLoggingOut } = useLogout(() => {
    logout();
    navigate("/auth?mode=login");
  });

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
          {navOptions.map(({ name, link, icon }) => (
            <Button
              key={name}
              variant="ghost"
              asChild
              className={`${isActiveLink(link) ? "bg-white/15 text-white" : ""} gap-2 text-white/80 hover:bg-white/10 hover:text-white`}
            >
              <Link to={link}>
                {icon}
                {name}
              </Link>
            </Button>
          ))}
          <Button
            key={"Sign Out"}
            variant="default"
            className={`gap-2 text-white/80 hover:bg-red-200 hover:text-white`}
            disabled={isLoggingOut}
            onClick={() => logoutUser()}
          >
            <LogOut />
            Sign Out
          </Button>
        </nav>
      </div>
    </header>
  );
}
