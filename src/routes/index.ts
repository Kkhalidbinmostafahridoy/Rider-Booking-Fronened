import App from "@/App";
import DashBoardLayout from "@/components/layout/DashBoardLayout";
import { AccountStatusPage } from "@/components/modules/authentication/AccountStatusPage";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter } from "react-router";

import { userSidebarItems } from "./userSidebarItems";
import { adminSidebarItems } from "./adminSIdebarItems";
import { withAuth } from "@/utils/withAuth";
import UnAuthorized from "@/pages/UnAuthorized";
import { role } from "@/contants/role";
import type { TRole } from "@/types";

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
  {
    path: "/admin",
    Component: withAuth(DashBoardLayout, role.ADMIN as TRole),
    children: [{ index: true }, ...generateRoutes(adminSidebarItems)],
  },
  {
    path: "/user",
    Component: withAuth(DashBoardLayout, role.USER as TRole),
    children: [...generateRoutes(userSidebarItems)],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/account-status",
    Component: withAuth(AccountStatusPage),
  },
  {
    path: "/unauthorized",
    Component: withAuth(UnAuthorized),
  },
]);
