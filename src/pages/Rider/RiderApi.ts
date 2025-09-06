import { baseApi } from "@/redux/baseApi";
import type { Ride } from "@/types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
      invalidatesTags: [{ type: "Ride", id: "LIST" }],
    }),

    getRiderHistory: builder.query<
      Ride[],
      { page?: number; limit?: number; search?: string }
    >({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: "/rider/history", // matches backend GET endpoint
        method: "GET",
        params: { page, limit, search }, // query params
      }),
      providesTags: (result) => {
        const rides = Array.isArray(result) ? result : [];
        return [
          ...rides.map(({ _id }) => ({ type: "Ride" as const, id: _id })),
          { type: "Ride", id: "LIST" },
        ];
      },
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
  useGetRiderHistoryQuery,
} = authApi;
