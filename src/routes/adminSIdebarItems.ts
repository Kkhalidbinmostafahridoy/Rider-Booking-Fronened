// import Analytics from "@/pages/Admin/Analytics";
import Driver from "@/pages/Admin/Driver";
import Riders from "@/pages/Admin/Riders";
import type { ISidebarItem } from "@/types";
import { SquareTerminal } from "lucide-react";
import { lazy } from "react";

const Users = lazy(() => import("@/pages/Admin/Users"));

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "ADMIN Panel",
    url: "/admin",
    icon: SquareTerminal,
    isActive: true,
    items: [
      {
        title: "Users",
        url: "users", // relative to /admin
        Component: Users,
      },
      {
        title: "Riders",
        url: "riders", // relative to /admin
        Component: Riders,
      },
      {
        title: "Drivers",
        url: "drivers", // relative to /admin
        Component: Driver,
      },
    ],
  },
];
