import { baseApi } from "@/redux/baseApi";

export const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    driverAction: builder.mutation({
      query: ({
        _id,
        action,
      }: {
        _id: string;
        action: "accept" | "reject";
      }) => ({
        url: `/driver/ride/${_id}/action`,
        method: "POST",
        data: { action }, // ✅ this is crucial
      }),
    }),
    driverCreate: builder.mutation({
      query: (driverInfo) => ({
        url: "/driver/drivers", // ✅ check backend path
        method: "POST",
        data: driverInfo, // ✅ changed from `data` to `body`
      }),
    }),
    driverStatus: builder.mutation({
      query: (status) => ({
        url: "driver/availability",
        method: "PATCH",
        data: { status }, // send the new status to backend
      }),
    }),
  }),
});

export const {
  useDriverCreateMutation,
  useDriverStatusMutation,
  useDriverActionMutation,
} = driverApi;
