import { baseApi } from "@/redux/baseApi";

export const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    driverStatus: builder.mutation({
      query: ({ _id, action }) => ({
        url: `/driver/ride/${_id}/action`,
        method: "POST",
        body: { action }, // send "accepted" or "rejected"
      }),
    }),
    driverCreate: builder.mutation({
      query: (driverInfo) => ({
        url: "/driver/drivers", // ✅ check backend path
        method: "POST",
        body: driverInfo, // ✅ changed from `data` to `body`
      }),
    }),
  }),
});

export const { useDriverCreateMutation, useDriverStatusMutation } = driverApi;
