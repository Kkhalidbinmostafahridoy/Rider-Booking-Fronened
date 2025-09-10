// import Analytics from "@/pages/Admin/Analytics";
import Driver from "@/pages/Admin/Driver";
import Riders from "@/pages/Admin/Riders";
import UserCheck from "@/pages/User/UserCheck";

import type { ISidebarItem } from "@/types";
import { SquareTerminal } from "lucide-react";
// import { lazy } from "react";

// const Users = lazy(() => import("@/pages/User/UserCheck"));

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "ADMIN Panel",
    url: "/admin",
    icon: SquareTerminal,
    isActive: true,
    items: [
      {
        title: "User",
        url: "user-check", // just static, fallback id used
        Component: UserCheck,
      },
      {
        title: "Riders",
        url: "riders",
        Component: Riders,
      },
      {
        title: "Drivers",
        url: "drivers",
        Component: Driver,
      },
    ],
  },
];
