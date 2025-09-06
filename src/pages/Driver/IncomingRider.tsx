import React from "react";
import { useDriverStatusMutation } from "./DriverApi";

interface Ride {
  _id: string;
  riderId: string;
  pickupLocation: { address: string };
  destinationLocation: { address: string };
  fare: number;
  status: string;
}

interface Props {
  ride: Ride;
  onActionSuccess: (rideId: string) => void;
}

export const IncomingRider: React.FC<Props> = ({ ride, onActionSuccess }) => {
  if (!ride) return null; // <-- Add this

  const [driverStatus] = useDriverStatusMutation;
  const [loading, setLoading] = React.useState(false);

  const handleAction = async (action: "accept" | "reject") => {
    try {
      setLoading(true);
      const backendAction = action === "accept" ? "accepted" : "rejected";
      await driverStatus({ _id: ride._id, action: backendAction }).unwrap();
      onActionSuccess(ride._id);
      alert(`Ride ${backendAction} successfully!`);
    } catch (err) {
      console.error(err);
      alert("Failed to update ride status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-4 rounded shadow mb-4">
      <p>
        <strong>Pickup:</strong> {ride.pickupLocation?.address || "N/A"}
      </p>
      <p>
        <strong>Destination:</strong>{" "}
        {ride.destinationLocation?.address || "N/A"}
      </p>
      <p>
        <strong>Fare:</strong> {ride.fare || "N/A"} BDT
      </p>
      <p>
        <strong>Status:</strong> {ride.status}
      </p>
      <div className="flex gap-2 mt-2">
        <button
          disabled={loading}
          onClick={() => handleAction("accept")}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 disabled:opacity-50"
        >
          Accept
        </button>
        <button
          disabled={loading}
          onClick={() => handleAction("reject")}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50"
        >
          Reject
        </button>
      </div>
    </div>
  );
};
