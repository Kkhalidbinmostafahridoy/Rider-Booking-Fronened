/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

import { format } from "date-fns";

import {
  useGetRiderHistoryQuery,
  useRiderRequestCancelMutation,
} from "@/redux/features/auth/auth.api";
import type { Ride } from "@/types";
import { toast } from "sonner";

const RiderHistory: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const {
    data: rides,
    isLoading,
    isError,
    refetch,
  } = useGetRiderHistoryQuery({ page, limit: 10, search });
  const [cancelRide, { isLoading: isCancelling }] =
    useRiderRequestCancelMutation();

  const handleCancel = async (_id: string) => {
    try {
      await cancelRide(_id).unwrap();
      toast.success("Ride cancelled successfully!");
      refetch(); // refresh ride history
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to cancel ride.");
    }
  };

  if (isError) {
    toast.error("Failed to fetch ride history.");
  }

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 mx-3">My Ride History</h2>

      <input
        type="text"
        placeholder="Search by driver, location, or status..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded p-2 w-full mb-4"
      />

      {isLoading ? (
        <div className="text-center py-20">Loading...</div>
      ) : rides && rides.length > 0 ? (
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Pickup</th>
              <th className="p-3 text-left">Destination</th>
              <th className="p-3 text-left">Driver</th>
              <th className="p-3 text-left">Fare</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {rides.map((ride: Ride) => (
              <tr key={ride._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{ride.pickupLocation?.address || "N/A"}</td>
                <td className="p-3">
                  {ride.destinationLocation?.address || "N/A"}
                </td>
                <td className="p-3">{ride.driverName || "N/A"}</td>
                <td className="p-3">${ride.fare.toFixed(2)}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      ride.status === "Completed"
                        ? "bg-green-500"
                        : ride.status === "Cancelled"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {ride.status}
                  </span>
                </td>
                <td className="p-3">
                  {format(new Date(ride.createdAt), "dd MMM yyyy, hh:mm a")}
                </td>
                <td className="p-3">
                  {ride.status === "Pending" ? (
                    <button
                      onClick={() => handleCancel(ride._id)}
                      disabled={isCancelling}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center py-20 text-gray-500">No rides found.</div>
      )}

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button
          className="px-4 py-2 bg-muted text-red-400 rounded disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <div className="mx-2 mt-1.5">
          <p>Page {page}</p>
        </div>
        <button
          className="px-4 py-2 bg-muted text-blue-400 rounded disabled:opacity-50"
          onClick={() => setPage((p) => p + 1)}
          disabled={rides && rides.length < 10}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RiderHistory;
