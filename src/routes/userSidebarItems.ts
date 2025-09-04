import Driver from "@/pages/Admin/Driver";
import Riders from "@/pages/Rider/Riders";
import type { ISidebarItem } from "@/types";
import { SquareTerminal } from "lucide-react";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Riders Panel",
    url: "/user",
    icon: SquareTerminal,
    isActive: true,
    items: [
      {
        title: "Riders",
        url: "riders", // relative to /admin
        Component: Riders,
      },
      {
        title: "Driver",
        url: "driver", // relative to /admin
        Component: Driver,
      },
    ],
  },
];
