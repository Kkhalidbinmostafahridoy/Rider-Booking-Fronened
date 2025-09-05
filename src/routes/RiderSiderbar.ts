import type { ISidebarItem } from "@/types";
import { SquareTerminal } from "lucide-react";
import RiderDashboard from "@/pages/Rider/RiderDashboard";
import RiderHistory from "@/pages/Rider/RiderHistory";
import RidersCancel from "@/pages/Rider/RidersCancel";
import { RideRequest } from "@/pages/Rider/RiderRequest";

export const riderSidebarItems: ISidebarItem[] = [
  {
    title: "Rider Panel",
    url: "/rider",
    icon: SquareTerminal,
    isActive: true,
    items: [
      {
        title: "Dashboard",
        url: "dashboard",
        Component: RiderDashboard,
      },
      {
        title: "Rider Request",
        url: "rider-request",
        Component: RideRequest,
      },
      {
        title: "Ride Cancel",
        url: "ride-cancel",
        Component: RidersCancel,
      },
      {
        title: "Ride History",
        url: "ride-history",
        Component: RiderHistory,
      },
    ],
  },
];
