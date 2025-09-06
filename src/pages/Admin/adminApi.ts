import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.mutation({
      query: (userInfo) => ({
        url: "/user/all-users",
        method: "GET",
        data: userInfo,
      }),
    }),
  }),
});

export const { useGetAllUsersMutation } = authApi;
