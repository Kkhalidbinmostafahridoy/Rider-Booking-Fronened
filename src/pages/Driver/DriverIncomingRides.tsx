import React, { useEffect, useState } from "react";
import axios from "axios";
import { IncomingRider } from "./IncomingRider";

interface Ride {
  _id: string;
  riderId: string;
  pickupLocation: { address: string };
  destinationLocation: { address: string };
  fare: number;
  status: string;
}

const DriverIncomingRides: React.FC = () => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await axios.get<Ride[]>(
          "http://localhost:5000/api/driver/ride-requests" // backend GET route
        );
        setRides(response.data);
      } catch (err) {
        console.error("Failed to fetch rides", err);
        setRides([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, []);

  const handleRideUpdate = (rideId: string) => {
    // Remove ride from list after accept/reject
    setRides((prev) => prev.filter((r) => r._id !== rideId));
  };

  if (loading) return <p>Loading rides...</p>;
  if (rides.length === 0) return <p>No incoming ride requests.</p>;

  return (
    <div className="max-w-xl mx-auto mt-8 space-y-4">
      {rides.map((ride) => (
        <IncomingRider
          key={ride._id}
          ride={ride}
          onActionSuccess={handleRideUpdate}
        />
      ))}
    </div>
  );
};

export default DriverIncomingRides;
