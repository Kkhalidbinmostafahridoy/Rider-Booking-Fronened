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
      query: ({
        _id,
        availability,
      }: {
        _id: string;
        availability: "online" | "offline";
      }) => ({
        url: "/driver/availability", // make sure this matches backend
        method: "PATCH",
        data: { _id, availability }, // send driver id and new status
      }),
    }),
    driverUpdate: builder.mutation({
      query: ({ _id, profile }) => ({
        url: `/driver/rides/${_id}/status`,
        method: "PATCH",
        data: { _id, profile }, // send the new status to backend
      }),
    }),
    getDriverStatus: builder.mutation({
      query: ({ _id, newStatus }) => ({
        url: `/driver/rides/${_id}/status`,
        method: "PATCH",
        data: { _id, newStatus },
      }),
    }),
    driverEarning: builder.query({
      query: () => ({
        url: "/driver/earnings",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useDriverCreateMutation,
  useDriverStatusMutation,
  useDriverActionMutation,
  useGetDriverStatusMutation,
  useDriverEarningQuery,
  useDriverUpdateMutation,
} = driverApi;
