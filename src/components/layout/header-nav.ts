import {
  Briefcase,
  Compass,
  Home,
  LogIn,
  Plus,
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
    name: "Portfolio",
    link: routes.portfolio,
    icon: Briefcase,
    visibility: "auth",
  },
  {
    name: "Create Trip",
    link: routes.create,
    icon: Plus,
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
