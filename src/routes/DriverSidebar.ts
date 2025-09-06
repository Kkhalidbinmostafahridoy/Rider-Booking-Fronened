import ActiveRiders from "@/pages/Driver/ActiveRides";
import { DriverDashboard } from "@/pages/Driver/DriverDashboard";

import Earnings from "@/pages/Driver/Earnings";
import { DriverProfile } from "@/pages/Driver/Profile";

import type { ISidebarItem } from "@/types";
import { SquareTerminal } from "lucide-react";

export const driverSidebarItems: ISidebarItem[] = [
  {
    title: "Driver Panel",
    url: "/driver",
    icon: SquareTerminal,
    isActive: true,
    items: [
      {
        title: "Dashboard",
        url: "dashboard",
        Component: DriverDashboard,
      },
      {
        title: "Profile",
        url: "profile",
        Component: DriverProfile,
      },
      {
        title: "Active Rides",
        url: "active-rides",
        Component: ActiveRiders,
      },
      {
        title: "Earnings",
        url: "earnings",
        Component: Earnings,
      },
    ],
  },
];
