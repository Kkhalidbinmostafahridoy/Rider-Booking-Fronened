import React, { useState } from "react";
import { format } from "date-fns";
import type { Ride } from "@/types";
import { mockRides } from "@/types/mockRides";

const RiderHistory: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 5;

  // Filtered rides by search
  const filteredRides = mockRides.filter(
    (Ride) =>
      Ride.pickupLocation.address
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      Ride.destinationLocation.address
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      Ride.driverName?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRides.length / limit);
  const paginatedRides = filteredRides.slice((page - 1) * limit, page * limit);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Ride History</h2>

      <input
        type="text"
        placeholder="Search by driver or location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded p-2 w-full mb-4"
      />

      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-muted">
          <tr>
            <th className="p-3 text-left">Pickup</th>
            <th className="p-3 text-left">Destination</th>
            <th className="p-3 text-left">Driver</th>
            <th className="p-3 text-left">Fare</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {paginatedRides.map((ride: Ride) => (
            <tr key={ride._id} className="border-b hover:bg-gray-50">
              <td className="p-3">{ride.pickupLocation.address}</td>
              <td className="p-3">{ride.destinationLocation.address}</td>
              <td className="p-3">{ride.driverName}</td>
              <td className="p-3">{ride.fare} BDT</td>
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
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <div className="mx-2 mt-1.5">
          Page {page} of {totalPages || 1}
        </div>
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RiderHistory;
