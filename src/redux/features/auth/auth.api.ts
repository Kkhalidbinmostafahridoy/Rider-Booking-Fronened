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
    riderRegister: builder.mutation({
      query: (riderInfo) => ({
        url: "/auth/register",
        method: "POST",
        data: riderInfo,
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
    riderRequest: builder.mutation({
      query: (requestInfo) => ({
        url: "/rider/request", // make sure it matches your backend
        method: "POST",
        data: requestInfo,
      }),
    }),
    riderRequestCancel: builder.mutation({
      query: ({ _id }) => ({
        url: `/rider/${_id}/cancel`, // replace :id with actual ride id
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useRiderRegisterMutation,
  useLogoutMutation,
  useRiderRequestMutation,
  useRiderRequestCancelMutation,
} = authApi;
