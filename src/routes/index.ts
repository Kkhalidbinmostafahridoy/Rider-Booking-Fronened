import App from "@/App";
import DashBoardLayout from "@/components/layout/DashBoardLayout";
import { AccountStatusPage } from "@/components/modules/authentication/AccountStatusPage";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter } from "react-router";
import { withAuth } from "@/utils/withAuth";
import UnAuthorized from "@/pages/UnAuthorized";
import type { TRole } from "@/types";
import { role } from "@/contants/role";
import { riderSidebarItems } from "./RiderSiderbar";
import { userSidebarItems } from "./userSidebarItems";
import HomePage from "@/pages/HomePage";
import { RideRequest } from "@/pages/Rider/RiderRequest";
import Riders from "@/pages/Admin/Riders";
import { adminSidebarItems } from "./adminSIdebarItems";
import { driverSidebarItems } from "./DriverSidebar";
import { Profile } from "@/pages/Driver/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "",
        Component: HomePage,
      },
      {
        path: "about",
        Component: withAuth(About),
      },
    ],
  },

  // ✅ Admin dashboard
  {
    path: "/admin",
    Component: withAuth(DashBoardLayout, role.ADMIN as TRole),
    children: [
      { index: true, Component: Riders }, // 👈 default dashboard
      ...generateRoutes(adminSidebarItems),
    ],
  },

  // ✅ Rider dashboard
  // {
  //   path: "/rider",
  //   Component: withAuth(DashBoardLayout, role.RIDER as TRole),
  //   children: [...generateRoutes(riderSidebarItems)],
  // },
  {
    path: "/rider",
    Component: withAuth(DashBoardLayout, role.RIDER as TRole),
    children: [
      { index: true, Component: RideRequest }, // 👈 default dashboard
      ...generateRoutes(riderSidebarItems),
    ],
  },

  // ✅ Driver dashboard
  {
    path: "/driver",
    Component: withAuth(DashBoardLayout, role.DRIVER as TRole),
    children: [
      { index: true, Component: Profile }, // 👈 default dashboard
      ...generateRoutes(driverSidebarItems),
    ],
  },
  {
    path: "/user",
    Component: withAuth(DashBoardLayout, role.USER as TRole),
    children: [...generateRoutes(userSidebarItems)],
  },

  // ✅ Auth routes
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },

  // ✅ Account status
  {
    path: "/account-status",
    Component: withAuth(AccountStatusPage),
  },

  // ✅ Unauthorized page
  {
    path: "/unauthorized",
    Component: UnAuthorized, // no need for withAuth here
  },
]);
