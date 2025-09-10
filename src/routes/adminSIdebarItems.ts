import AdminAsRider from "@/pages/Admin/AdminAsRiders";
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
        Component: AdminAsRider,
      },
      // {
      //   title: "Drivers",
      //   url: "drivers",
      //   Component: Driver,
      // },
    ],
  },
];
