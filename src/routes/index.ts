// import App from "@/App";
// import DashBoardLayout from "@/components/layout/DashBoardLayout";
// import { AccountStatusPage } from "@/components/modules/authentication/AccountStatusPage";
// import About from "@/pages/About";
// import Login from "@/pages/Login";
// import Register from "@/pages/Register";
// import { generateRoutes } from "@/utils/generateRoutes";
// import { createBrowserRouter } from "react-router";

// import { userSidebarItems } from "./userSidebarItems";
// import { adminSidebarItems } from "./adminSIdebarItems";
// import { withAuth } from "@/utils/withAuth";
// import UnAuthorized from "@/pages/UnAuthorized";
// import { role } from "@/contants/role";
// import type { TRole } from "@/types";

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     Component: App,
//     children: [
//       {
//         path: "about",
//         Component: withAuth(About),
//       },
//     ],
//   },
//   {
//     path: "/admin",
//     Component: withAuth(DashBoardLayout, role.ADMIN as TRole),
//     children: [{ index: true }, ...generateRoutes(adminSidebarItems)],
//   },
//   {
//     path: "/user",
//     Component: withAuth(DashBoardLayout, role.USER as TRole),
//     children: [...generateRoutes(userSidebarItems)],
//   },
//   {
//     path: "/login",
//     Component: Login,
//   },
//   {
//     path: "/register",
//     Component: Register,
//   },
//   {
//     path: "/account-status",
//     Component: withAuth(AccountStatusPage),
//   },
//   {
//     path: "/unauthorized",
//     Component: withAuth(UnAuthorized),
//   },
// ]);

/***************
 *
 *
 *
 *
 *
 */

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
import { adminSidebarItems } from "./adminSIdebarItems";
import { riderSidebarItems } from "./RiderSiderbar";
import { driverSidebarItems } from "./DriverSidebar";
import { userSidebarItems } from "./userSidebarItems";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
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
    children: [{ index: true }, ...generateRoutes(adminSidebarItems)],
  },

  // ✅ Rider dashboard
  {
    path: "/rider",
    Component: withAuth(DashBoardLayout, role.RIDER as TRole),
    children: [...generateRoutes(riderSidebarItems)],
  },

  // ✅ Driver dashboard
  {
    path: "/driver",
    Component: withAuth(DashBoardLayout, role.DRIVER as TRole),
    children: [...generateRoutes(driverSidebarItems)],
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
