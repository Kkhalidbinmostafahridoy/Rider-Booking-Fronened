import type { ISidebarItem } from "@/types";
import { SquareTerminal } from "lucide-react";
import { RideRequest } from "@/pages/Rider/RiderRequest";
import RiderHistory from "@/pages/Rider/RiderHistory";

export const riderSidebarItems: ISidebarItem[] = [
  {
    title: "Rider Panel",
    url: "/rider",
    icon: SquareTerminal,
    isActive: true,
    items: [
      {
        title: "Rider Request",
        url: "rider-request",
        Component: RideRequest,
      },
      {
        title: "Ride History",
        url: "ride-history",
        Component: RiderHistory,
      },
    ],
  },
];
