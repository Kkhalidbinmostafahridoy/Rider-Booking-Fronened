// import { baseApi } from "@/redux/baseApi";

// export const userApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getUser: builder.query({
//       query: (_id: string) => `/user/${_id}`, // GET request
//       method: "GET",
//     }),
//     userBlock: builder.mutation({
//       query: ({ _id, block }: { _id: string; block: boolean }) => ({
//         url: `/user/${_id}`,
//         method: "PATCH",
//         data: { block },
//       }),
//     }),
//   }),
// });

// export const { useGetUserQuery, useUserBlockMutation } = userApi;

import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch user by ID
    fetchUser: builder.query<{ _id: string; isActive: boolean }, string>({
      query: (_Id) => `/user/${_Id}`, // GET /api/user/:id
    }),

    // Block/unblock user
    toggleBlockUser: builder.mutation<
      { _id: string; isActive: boolean },
      { _id: string; block: boolean }
    >({
      query: ({ _id, block }) => ({
        url: `/user/${_id}`,
        method: "PATCH", // use PATCH to update status
        body: { block },
      }),
    }),
  }),
});

export const {
  useFetchUserQuery,
  useLazyFetchUserQuery,
  useToggleBlockUserMutation,
} = userApi;
