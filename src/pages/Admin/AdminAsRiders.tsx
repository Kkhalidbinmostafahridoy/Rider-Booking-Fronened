import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import { useGetRiderHistoryQuery } from "../Rider/RiderApi";

function AdminAsRider() {
  const { data } = useGetRiderHistoryQuery(undefined);

  // Filter states
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [driverFilter, setDriverFilter] = useState<string>("all");
  const [riderFilter, setRiderFilter] = useState<string>("all");

  // Combine all rides
  const allRides = [
    ...(data?.details?.requested || []),
    ...(data?.details?.cancelled || []),
    ...(data?.details?.others || []),
  ];

  // Extract unique drivers and riders for filter dropdowns
  const drivers = Array.from(
    new Set(allRides.map((r: any) => r.driver?.name))
  ).filter(Boolean);
  const riders = Array.from(
    new Set(allRides.map((r: any) => r.rider?.name))
  ).filter(Boolean);

  // Apply filters
  const filteredRides = allRides.filter((ride: any) => {
    // Status filter
    if (statusFilter !== "all" && ride.status !== statusFilter) return false;

    // Date filter
    const requestedAt = ride.statusTimestamps?.requestedAt
      ? new Date(ride.statusTimestamps.requestedAt)
      : null;
    if (requestedAt) {
      if (startDate && requestedAt < new Date(startDate)) return false;
      if (endDate && requestedAt > new Date(endDate)) return false;
    }

    // Driver filter
    if (driverFilter !== "all" && ride.driver?.name !== driverFilter)
      return false;

    // Rider filter
    if (riderFilter !== "all" && ride.rider?.name !== riderFilter) return false;

    return true;
  });

  return (
    <div className="w-full mx-auto px-5">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-4 items-center">
        <div>
          <label className="mr-2 font-semibold">Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="all">All</option>
            <option value="requested">Requested</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <label className="mr-2 font-semibold">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        </div>

        <div>
          <label className="mr-2 font-semibold">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        </div>

        <div>
          <label className="mr-2 font-semibold">Driver:</label>
          <select
            value={driverFilter}
            onChange={(e) => setDriverFilter(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="all">All</option>
            {drivers.map((driver) => (
              <option key={driver} value={driver}>
                {driver}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mr-2 font-semibold">Rider:</label>
          <select
            value={riderFilter}
            onChange={(e) => setRiderFilter(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="all">All</option>
            {riders.map((rider) => (
              <option key={rider} value={rider}>
                {rider}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="border border-muted rounded">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pickup</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Requested At</TableHead>
              <TableHead>Cancelled At</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Rider</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRides.length > 0 ? (
              filteredRides.map((ride: any) => (
                <TableRow
                  key={ride._id}
                  className="hover:bg-gray-50 transition-all"
                >
                  <TableCell>{ride.pickupLocation?.address}</TableCell>
                  <TableCell>{ride.destinationLocation?.address}</TableCell>
                  <TableCell
                    className={`${
                      ride.status === "cancelled"
                        ? "text-red-500 font-semibold flex items-center gap-1"
                        : ride.status === "requested"
                        ? "text-yellow-500 font-semibold flex items-center gap-1"
                        : "text-green-600 font-semibold flex items-center gap-1"
                    }`}
                  >
                    {ride.status === "cancelled" && <FaTimesCircle />}
                    {ride.status === "requested" && <FaClock />}
                    {ride.status === "completed" && <FaCheckCircle />}
                    {ride.status}
                  </TableCell>
                  <TableCell>
                    {ride.statusTimestamps?.requestedAt
                      ? new Date(
                          ride.statusTimestamps.requestedAt
                        ).toLocaleString()
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {ride.statusTimestamps?.cancelledAt
                      ? new Date(
                          ride.statusTimestamps.cancelledAt
                        ).toLocaleString()
                      : "-"}
                  </TableCell>
                  <TableCell>{ride.driver?.name || "-"}</TableCell>
                  <TableCell>{ride.rider?.name || "-"}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-muted-foreground"
                >
                  No rides found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default AdminAsRider;
