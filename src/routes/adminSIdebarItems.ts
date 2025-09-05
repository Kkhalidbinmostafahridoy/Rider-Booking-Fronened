// import Analytics from "@/pages/Admin/Analytics";
import Driver from "@/pages/Admin/Driver";
import RidersCancel from "@/pages/Rider/RidersCancel";
import type { ISidebarItem } from "@/types";
import { SquareTerminal } from "lucide-react";
import { lazy } from "react";

const Analytics = lazy(() => import("@/pages/Admin/Analytics"));

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "ADMIN Panel",
    url: "/admin",
    icon: SquareTerminal,
    isActive: true,
    items: [
      {
        title: "Analytics",
        url: "analytics", // relative to /admin
        Component: Analytics,
      },
      {
        title: "Riders",
        url: "riders", // relative to /admin
        Component: RidersCancel,
      },
      {
        title: "Drivers",
        url: "drivers", // relative to /admin
        Component: Driver,
      },
    ],
  },
];
