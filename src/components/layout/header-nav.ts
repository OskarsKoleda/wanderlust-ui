import {
  Briefcase,
  Compass,
  Home,
  LogIn,
  User as UserIcon,
  type LucideIcon,
} from "lucide-react";
import { routes } from "@/router/routes";

export type NavVisibility = "always" | "auth" | "guest";

interface NavOptions {
  name: string;
  link: string;
  icon: LucideIcon;
  visibility: NavVisibility;
}

export const navOptions: NavOptions[] = [
  {
    name: "Home",
    link: routes.home,
    icon: Home,
    visibility: "always",
  },
  {
    name: "Explore",
    link: routes.explore,
    icon: Compass,
    visibility: "always",
  },
  {
    name: "My Trips",
    link: routes.myTrips,
    icon: Briefcase,
    visibility: "auth",
  },
  {
    name: "Profile",
    link: routes.profile,
    icon: UserIcon,
    visibility: "auth",
  },
  {
    name: "Sign In",
    link: routes.login,
    icon: LogIn,
    visibility: "guest",
  },
];
