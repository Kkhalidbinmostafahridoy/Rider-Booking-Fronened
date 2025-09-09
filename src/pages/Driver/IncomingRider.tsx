/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { FaRoute, FaClock, FaUser } from "react-icons/fa";
import { useDriverActionMutation } from "./DriverApi";

// Incoming ride type
interface IncomingRide {
  _id: string;
  pickupLocation: { address: string };
  destinationLocation: { address: string };
  fare: number;
  rider: { name: string };
  createdAt: string;
  status: "requested" | "accepted" | "rejected";
}

interface IncomingRidesProps {
  rides: IncomingRide[]; // pass rides from parent or RTK Query
  refetchRides: () => void; // function to refetch rides after action
}

export function IncomingRider({ rides, refetchRides }: IncomingRidesProps) {
  const [driverAction] = useDriverActionMutation();
  const [incomingRides, setIncomingRides] = useState<IncomingRide[]>([]);

  useEffect(() => {
    if (rides) setIncomingRides(rides);
  }, [rides]);

  const handleAction = async (rideId: string, action: "accept" | "reject") => {
    try {
      const result = await driverAction({ _id: rideId, action }).unwrap();
      toast.success(
        `Ride ${action === "accept" ? "accepted" : "rejected"} successfully!`
      );
      console.log(result);
      // Update locally
      setIncomingRides((prev) =>
        prev.map((r) =>
          r._id === rideId
            ? { ...r, status: action === "accept" ? "accepted" : "rejected" }
            : r
        )
      );
      refetchRides(); // refetch data from backend
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update ride");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 space-y-6">
      <AnimatePresence>
        {incomingRides.length === 0 && (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-gray-500 font-medium"
          >
            No incoming rides
          </motion.div>
        )}

        {incomingRides.map((ride) => (
          <motion.div
            key={ride._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <Card className="shadow-lg rounded-2xl border-l-4 border-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>🚖 Incoming Ride</span>
                  <span className="text-sm font-medium text-gray-600">
                    {ride?.status?.toUpperCase()}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <FaUser /> Rider: {ride?.rider?.name}
                </div>
                <div className="flex items-center gap-2">
                  <FaRoute /> From: {ride?.pickupLocation?.address}
                </div>
                <div className="flex items-center gap-2">
                  <FaRoute /> To: {ride?.destinationLocation?.address}
                </div>
                <div className="flex items-center gap-2">
                  <FaClock /> Fare: {ride?.fare} BDT
                </div>

                {/* Action buttons */}
                {ride.status === "requested" && (
                  <div className="flex gap-2 mt-3">
                    <Button
                      onClick={() => handleAction(ride._id, "accept")}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      Accept
                    </Button>
                    <Button
                      onClick={() => handleAction(ride._id, "reject")}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
