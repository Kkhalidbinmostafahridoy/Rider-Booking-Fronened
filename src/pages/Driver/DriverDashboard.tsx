import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useGetRiderHistoryQuery,
  useRiderRequestCancelMutation,
  useRiderRequestMutation,
} from "../Rider/RiderApi";

// -------------------
// Rider Profile Schema
// -------------------
const riderProfileSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().regex(/^\d{10,11}$/),
  password: z.string().min(6),
  address: z.string().min(3),
});

type RiderProfileFormValues = z.infer<typeof riderProfileSchema>;

// -------------------
// Ride Type
// -------------------
type RideType = {
  _id: string;
  pickup: string;
  destination: string;
  fare: number;
  status: string;
};

// -------------------
// Rider Dashboard
// -------------------
export function DriverDashboard() {
  const [riderProfile, setRiderProfile] =
    useState<RiderProfileFormValues | null>(null);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [activeRideId, setActiveRideId] = useState<string | null>(null);

  // -------------------
  // RTK Query Hooks
  // -------------------
  const [riderRequest, { isLoading: requestLoading }] =
    useRiderRequestMutation();
  const [riderCancel, { isLoading: cancelLoading }] =
    useRiderRequestCancelMutation();

  const {
    data: rideHistory = [],
    refetch: refetchRides,
    isFetching,
  } = useGetRiderHistoryQuery({ page: 1, limit: 20 });

  // -------------------
  // Load Rider Profile
  // -------------------
  useEffect(() => {
    const storedProfile = localStorage.getItem("riderProfile");
    if (storedProfile) setRiderProfile(JSON.parse(storedProfile));
  }, []);

  // -------------------
  // Profile Form
  // -------------------
  const form = useForm<RiderProfileFormValues>({
    resolver: zodResolver(riderProfileSchema),
    defaultValues: riderProfile || {
      name: "",
      email: "",
      phone: "",
      password: "",
      address: "",
    },
  });

  const onSubmitProfile = (data: RiderProfileFormValues) => {
    setRiderProfile(data);
    localStorage.setItem("riderProfile", JSON.stringify(data));
    toast.success("Profile updated successfully!");
  };

  // -------------------
  // Request Ride
  // -------------------
  const handleRequestRide = async () => {
    if (!pickup || !destination) {
      toast.error("Please enter pickup and destination");
      return;
    }

    try {
      const result = await riderRequest({ pickup, destination }).unwrap();
      toast.success("Ride requested successfully!");
      setActiveRideId(result._id);
      setPickup("");
      setDestination("");
      refetchRides();
    } catch (err) {
      toast.error("Failed to request ride");
    }
  };

  // -------------------
  // Cancel Ride
  // -------------------
  const handleCancelRide = async (rideId: string) => {
    try {
      await riderCancel({ _id: rideId }).unwrap();
      toast.error("Ride cancelled");
      setActiveRideId(null);
      refetchRides();
    } catch (err) {
      toast.error("Failed to cancel ride");
    }
  };

  // -------------------
  // Render
  // -------------------
  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-4">Rider Dashboard</h1>

      {/* Ride Request Form */}
      <Card>
        <CardContent className="space-y-2">
          <h2 className="font-bold mb-2">Request a Ride</h2>
          <Input
            placeholder="Pickup Location"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
          />
          <Input
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <Button
            onClick={handleRequestRide}
            loading={requestLoading}
            className="w-full"
          >
            Request Ride
          </Button>
        </CardContent>
      </Card>

      {/* Active Ride */}
      {activeRideId && (
        <Card>
          <CardContent>
            <h2 className="font-bold mb-2">Active Ride</h2>
            {rideHistory
              .filter((r) => r._id === activeRideId)
              .map((ride) => (
                <div key={ride._id} className="space-y-1">
                  <p>
                    <strong>Pickup:</strong> {ride.pickup}
                  </p>
                  <p>
                    <strong>Destination:</strong> {ride.destination}
                  </p>
                  <p>
                    <strong>Status:</strong> {ride.status}
                  </p>
                  <p>
                    <strong>Fare:</strong> ${ride.fare}
                  </p>
                  <Button
                    variant="destructive"
                    onClick={() => handleCancelRide(ride._id)}
                    loading={cancelLoading}
                  >
                    Cancel Ride
                  </Button>
                </div>
              ))}
          </CardContent>
        </Card>
      )}

      {/* Ride History */}
      <Card>
        <CardContent>
          <h2 className="font-bold mb-2">Ride History</h2>
          {isFetching ? (
            <p>Loading rides...</p>
          ) : rideHistory.length === 0 ? (
            <p>No rides found.</p>
          ) : (
            rideHistory.map((ride) => (
              <div key={ride._id} className="p-2 border rounded mb-1">
                <p>
                  <strong>Pickup:</strong> {ride.pickup}
                </p>
                <p>
                  <strong>Destination:</strong> {ride.destination}
                </p>
                <p>
                  <strong>Status:</strong> {ride.status}
                </p>
                <p>
                  <strong>Fare:</strong> ${ride.fare}
                </p>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Profile */}
      <Card>
        <CardContent>
          <h2 className="font-bold mb-2">Profile</h2>
          <form
            onSubmit={form.handleSubmit(onSubmitProfile)}
            className="space-y-2"
          >
            <Controller
              control={form.control}
              name="name"
              render={({ field }) => <Input placeholder="Name" {...field} />}
            />
            <Controller
              control={form.control}
              name="email"
              render={({ field }) => <Input placeholder="Email" {...field} />}
            />
            <Controller
              control={form.control}
              name="phone"
              render={({ field }) => <Input placeholder="Phone" {...field} />}
            />
            <Controller
              control={form.control}
              name="password"
              render={({ field }) => (
                <Input type="password" placeholder="Password" {...field} />
              )}
            />
            <Controller
              control={form.control}
              name="address"
              render={({ field }) => <Input placeholder="Address" {...field} />}
            />
            <Button type="submit">Save Profile</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
