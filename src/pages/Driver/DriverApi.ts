import { baseApi } from "@/redux/baseApi";

export const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    driverAction: builder.mutation({
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
    driverStatus: builder.mutation({
      query: (status) => ({
        url: "driver/availability",
        method: "PATCH",
        body: { status }, // send the new status to backend
      }),
    }),
  }),
});

export const {
  useDriverCreateMutation,
  useDriverStatusMutation,
  useDriverActionMutation,
} = driverApi;
