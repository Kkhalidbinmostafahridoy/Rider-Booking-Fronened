import { baseApi } from "@/redux/baseApi";

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

    getRiderHistory: builder.query({
      query: () => ({
        url: "/rider/history", // matches backend GET endpoint
        method: "GET",
        params: {}, // query params
      }),
      transformResponse: (arg) => arg.data, //ol
    }),
  }),
});

export const {
  useRiderRequestMutation,
  useRiderRequestCancelMutation,
  useGetRiderHistoryQuery,
} = authApi;
