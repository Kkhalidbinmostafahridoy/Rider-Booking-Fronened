import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
    }),
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
      providesTags: () => ["USER"], // Tag the User data on login
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout", // make sure it matches your backend
        method: "POST",
      }),
      invalidatesTags: ["USER"], // Invalidate User tag on logout
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
  authApi;
