import ActiveRiders from "@/pages/Driver/ActiveRides";
import { DriverProfile } from "@/pages/Driver/DriverProfile";
import Earnings from "@/pages/Driver/Earnings";
import IncomingRider from "@/pages/Driver/IncomingRider";
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
        title: "Profile",
        url: "profile",
        Component: DriverProfile,
      },
      {
        title: "Incoming Rider",
        url: "incoming-rider",
        Component: IncomingRider,
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
