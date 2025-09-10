// import { baseApi } from "@/redux/baseApi";

// export const userApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getUserCheck: builder.query({
//       query: (_id: string) => {
//         const token = localStorage.getItem("token");
//         return {
//           url: `/user/${_id}`,
//           method: "GET",
//           headers: token ? { Authorization: `Bearer ${token}` } : undefined,
//         };
//       },
//     }),
//     // ✅ FIX: Update the mutation to accept a generic 'body' payload
//     userUpdate: builder.mutation({
//       query: ({ _id, block }: { _id: string; block: boolean }) => {
//         const token = localStorage.getItem("token");
//         return {
//           url: `/user/${_id}`,
//           method: "PATCH",
//           body: { isActive: block ? "BLOCKED" : "ACTIVE" }, // send correct field
//           headers: token ? { Authorization: `Bearer ${token}` } : {},
//         };
//       },
//       invalidatesTags: (result, error, { _id }) => [{ type: "User", id: _id }],
//     }),
//   }),
// });

// export const { useGetUserCheckQuery, useUserUpdateMutation } = userApi;

/**
 *
 *
 *
 *
 *
 *
 */

import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch user by ID
    getUserCheck: builder.query({
      query: (id: string) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
    }),

    // Update block/unblock user
    userUpdate: builder.mutation({
      query: ({ _id, isActive }: { _id: string; isActive: string }) => ({
        url: `/user/${_id}`,
        method: "PATCH",
        body: { isActive }, // ✅ Only send isActive
      }),
    }),
  }),
});

export const { useGetUserCheckQuery, useUserUpdateMutation } = userApi;
