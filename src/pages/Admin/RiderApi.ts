// import type { GetRidesResponse, Ride } from "@/types";
// import { baseApi } from "@/redux/baseApi";

// // Define the query parameters for getRides
// interface GetRidesParams {
//   status?: string;
//   driver?: string;
//   rider?: string;
//   fromDate?: string;
//   toDate?: string;
//   page?: number;
//   limit?: number;
// }

// interface CancelRideResponse {
//   message: string;
// }

// export const RiderApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getRides: builder.query<GetRidesResponse, GetRidesParams>({
//       query: ({ status, driver, rider, fromDate, toDate, page, limit }) => {
//         const params = new URLSearchParams();
//         if (status) params.append("status", status);
//         if (driver) params.append("driver", driver);
//         if (rider) params.append("rider", rider);
//         if (fromDate) params.append("fromDate", fromDate);
//         if (toDate) params.append("toDate", toDate);
//         if (page) params.append("page", page.toString());
//         if (limit) params.append("limit", limit.toString());
//         return `/rides?${params.toString()}`;
//       },
//       providesTags: ["Ride"],
//     }),
//     riderRequest: builder.mutation<Ride, Partial<Ride>>({
//       query: (data) => ({
//         url: "/rides/request",
//         method: "POST",
//         body: data,
//       }),
//       invalidatesTags: ["Ride"],
//     }),
//     riderCancel: builder.mutation<CancelRideResponse, { _id: string }>({
//       query: ({ _id }) => ({
//         url: `/rides/cancel/${_id}`,
//         method: "POST",
//       }),
//       invalidatesTags: ["Ride"],
//     }),
//   }),
// });

// export const {
//   useGetRidesQuery,
//   useRiderRequestMutation,
//   useRiderCancelMutation,
// } = RiderApi;
