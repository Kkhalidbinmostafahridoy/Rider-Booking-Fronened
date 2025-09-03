import App from "@/App";
import { AccountStatusPage } from "@/components/modules/authentication/AccountStatusPage";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "about",
        Component: About,
      },
    ],
  },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
  { path: "account-status", Component: AccountStatusPage },
  // {
  //   Component: Verify,
  //   path: "/verify",
  // },
]);
