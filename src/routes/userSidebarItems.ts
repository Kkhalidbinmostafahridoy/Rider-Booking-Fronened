import Driver from "@/pages/Admin/Driver";
import RidersCancel from "@/pages/Admin/Riders";
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
        Component: RidersCancel,
      },
      {
        title: "Driver",
        url: "driver", // relative to /admin
        Component: Driver,
      },
    ],
  },
];
