// import { useState } from "react";
// import {
//   useGetUsersQuery,
//   useUpdateUserStatusMutation,
// } from "@/redux/adminApi";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";

// const UserManagement = () => {
//   const [filters, setFilters] = useState({
//     role: "",
//     status: "",
//     search: "",
//     page: 1,
//   });
//   const limit = 10;

//   const { data, isLoading, error } = useGetUsersQuery({
//     ...filters,
//     page: filters.page,
//     limit,
//   });
//   const [updateStatus] = useUpdateUserStatusMutation();

//   const handleFilterChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value, page: 1 });
//   };

//   const handleAction = async (
//     userId: string,
//     action: "block" | "unblock" | "approve" | "suspend"
//   ) => {
//     await updateStatus({ userId, action });
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">User Management</h1>

//       {/* Filters */}
//       <div className="flex gap-4 mb-4">
//         <input
//           name="search"
//           placeholder="Search"
//           value={filters.search}
//           onChange={handleFilterChange}
//           className="p-2 border rounded"
//         />
//         <select
//           name="role"
//           value={filters.role}
//           onChange={handleFilterChange}
//           className="p-2 border rounded"
//         >
//           <option value="">All Roles</option>
//           <option value="rider">Rider</option>
//           <option value="driver">Driver</option>
//         </select>
//         <select
//           name="status"
//           value={filters.status}
//           onChange={handleFilterChange}
//           className="p-2 border rounded"
//         >
//           <option value="">All Status</option>
//           <option value="active">Active</option>
//           <option value="blocked">Blocked</option>
//           <option value="pending">Pending Approval</option>
//           <option value="suspended">Suspended</option>
//         </select>
//       </div>

//       {/* Table */}
//       {isLoading && <p>Loading users...</p>}
//       {error && <p className="text-red-500">Failed to load users</p>}
//       {data && (
//         <div className="overflow-x-auto border border-muted rounded">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Email</TableHead>
//                 <TableHead>Role</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Action</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {data.users.map((user: any) => (
//                 <TableRow key={user._id}>
//                   <TableCell>{user.name}</TableCell>
//                   <TableCell>{user.email}</TableCell>
//                   <TableCell>{user.role}</TableCell>
//                   <TableCell>{user.status}</TableCell>
//                   <TableCell className="flex gap-2">
//                     {user.role === "rider" &&
//                       (user.status === "active" ? (
//                         <Button onClick={() => handleAction(user._id, "block")}>
//                           Block
//                         </Button>
//                       ) : (
//                         <Button
//                           onClick={() => handleAction(user._id, "unblock")}
//                         >
//                           Unblock
//                         </Button>
//                       ))}
//                     {user.role === "driver" &&
//                       (user.status === "pending" ? (
//                         <Button
//                           onClick={() => handleAction(user._id, "approve")}
//                         >
//                           Approve
//                         </Button>
//                       ) : (
//                         <Button
//                           onClick={() => handleAction(user._id, "suspend")}
//                         >
//                           Suspend
//                         </Button>
//                       ))}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserManagement;
