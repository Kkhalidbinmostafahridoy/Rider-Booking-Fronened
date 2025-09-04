// import { role } from "@/contants/role";
// import { adminSidebarItems } from "@/routes/adminSIdebarItems";

// import { userSidebarItems } from "@/routes/userSidebarItems";
// import type { TRole } from "@/types";

// export const getSidebarItems = (userRole: TRole) => {
//   switch (userRole) {
//     case role.ADMIN:
//       return [...adminSidebarItems];
//     case role.USER:
//       return [...userSidebarItems];
//     default:
//       return [];
//   }
// };

/****************
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

import { role } from "@/contants/role";
import { adminSidebarItems } from "@/routes/adminSIdebarItems";
import { driverSidebarItems } from "@/routes/DriverSidebar";
import { riderSidebarItems } from "@/routes/RiderSiderbar";

import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case role.ADMIN:
      return [...adminSidebarItems];
    case role.RIDER:
      return [...riderSidebarItems];
    case role.DRIVER:
      return [...driverSidebarItems];
    default:
      return [];
  }
};
