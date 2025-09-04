import type { ISidebarItem } from "@/types";
import { SquareTerminal } from "lucide-react";
import RiderDashboard from "@/pages/Rider/RiderDashboard";
import RiderHistory from "@/pages/Rider/RiderHistory";
import Profile from "@/pages/Rider/Profile";

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
        title: "Ride History",
        url: "ride-history",
        Component: RiderHistory,
      },
      {
        title: "Profile",
        url: "profile",
        Component: Profile,
      },
    ],
  },
];
