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
