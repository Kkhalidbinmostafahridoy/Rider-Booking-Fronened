/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetRiderHistoryQuery } from "./RiderApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

function RiderHistory() {
  const { data } = useGetRiderHistoryQuery(undefined);
  console.log(data);

  const allRiders = [
    ...(data?.details?.requested || []),
    ...(data?.details?.cancelled || []),
    ...(data?.details?.others || []),
  ];

  return (
    <div className="w-full mx-auto px-5">
      <div className="border border-muted rounded">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Pickup</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Requested At</TableHead>
              <TableHead>Cancelled At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allRiders.length > 0 ? (
              allRiders.map((ride: any) => (
                <TableRow
                  key={ride._id}
                  className="hover:bg-gray-50 transition-all"
                >
                  <TableCell>{ride.pickupLocation?.address}</TableCell>
                  <TableCell>{ride.destinationLocation?.address}</TableCell>
                  <TableCell
                    className={
                      ride.status === "cancelled"
                        ? "text-red-500 font-semibold flex items-center gap-1"
                        : ride.status === "requested"
                        ? "text-yellow-500 font-semibold flex items-center gap-1"
                        : "text-green-600 font-semibold flex items-center gap-1"
                    }
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
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-muted-foreground"
                >
                  No rides found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {/* Summary Cards */}
        <div>
          <h1 className="mt-4 mb-4 text-3xl text-amber-400 text-center">
            Summary
          </h1>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-lg rounded-2xl border-l-4 border-red-500 hover:scale-105 transition-transform">
              <CardHeader>
                <CardTitle>Total Riders</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-2xl font-bold text-red-500">
                {data?.summary?.totalRides || 0}
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-2xl border-l-4 border-green-500 hover:scale-105 transition-transform">
              <CardHeader>
                <CardTitle>Requested Rides</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-2xl font-bold text-green-500">
                {data?.summary?.totalRequested || 0}
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-2xl border-l-4 border-yellow-500 hover:scale-105 transition-transform">
              <CardHeader>
                <CardTitle>Cancelled Rides</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-2xl font-bold text-yellow-500">
                {data?.summary?.totalCancelled || 0}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default RiderHistory;
