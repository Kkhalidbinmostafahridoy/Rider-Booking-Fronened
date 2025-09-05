import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import {
  useRiderRequestCancelMutation,
  useRiderRequestMutation,
} from "@/redux/features/auth/auth.api";

// Zod schema for ride request
const rideRequestSchema = z.object({
  pickupLocation: z.object({
    coordinates: z.tuple([z.number(), z.number()]),
    address: z.string().min(3, "Pickup address must be at least 3 characters"),
  }),
  destinationLocation: z.object({
    coordinates: z.tuple([z.number(), z.number()]),
    address: z
      .string()
      .min(3, "Destination address must be at least 3 characters"),
  }),
});

type RideRequestForm = z.infer<typeof rideRequestSchema> & {
  _id?: string;
  status?: string;
};

export function RideRequest() {
  const [createRide] = useRiderRequestMutation();
  const [requestCancel] = useRiderRequestCancelMutation();
  const [createdRide, setCreatedRide] = useState<RideRequestForm | null>(null);

  const form = useForm<RideRequestForm>({
    resolver: zodResolver(rideRequestSchema),
    defaultValues: {
      pickupLocation: { coordinates: [90.4125, 23.8103], address: "" },
      destinationLocation: { coordinates: [90.4244, 23.7806], address: "" },
    },
  });

  // Load persisted ride from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("createdRide");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed?._id) {
          setCreatedRide(parsed);
        }
      } catch (e) {
        console.error("Invalid ride in localStorage", e);
      }
    }
  }, []);

  // Submit ride request
  const onSubmit = async (data: RideRequestForm) => {
    try {
      const result = await createRide(data).unwrap();

      const rideData = {
        _id: result.data._id,
        pickupLocation: result.data.pickupLocation,
        destinationLocation: result.data.destinationLocation,
        status: result.data.status || "requested",
      };

      setCreatedRide(rideData);
      localStorage.setItem("createdRide", JSON.stringify(rideData));

      toast.success("✅ Ride requested successfully!");
      form.reset();
    } catch (error: any) {
      toast.error(error?.data?.message || "❌ Failed to request ride");
    }
  };

  // Cancel ride request
  const onCancelRide = async () => {
    if (!createdRide?._id) return;

    try {
      const result = await requestCancel({ _id: createdRide._id }).unwrap();

      toast.success(result.message || "✅ Ride cancelled successfully!");

      // Update state and localStorage
      const updatedRide = { ...createdRide, status: "cancelled" };
      setCreatedRide(updatedRide);
      localStorage.setItem("createdRide", JSON.stringify(updatedRide));
    } catch (error: any) {
      toast.error(error?.data?.message || "❌ Failed to cancel ride");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 space-y-6">
      {/* Ride request form */}
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">
            🚖 Request a Ride
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Pickup */}
              <div className="border rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold mb-3">📍 Pickup Location</h3>
                <FormField
                  control={form.control}
                  name="pickupLocation.address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter pickup address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <FormField
                    control={form.control}
                    name="pickupLocation.coordinates.0"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Longitude</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="any"
                            placeholder="90.4125"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pickupLocation.coordinates.1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Latitude</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="any"
                            placeholder="23.8103"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Destination */}
              <div className="border rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold mb-3">🎯 Destination Location</h3>
                <FormField
                  control={form.control}
                  name="destinationLocation.address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter destination address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-3 mt-3">
                  <FormField
                    control={form.control}
                    name="destinationLocation.coordinates.0"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Longitude</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="any"
                            placeholder="90.4244"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="destinationLocation.coordinates.1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Latitude</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="any"
                            placeholder="23.7806"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                Request Ride
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Show created ride */}
      {createdRide && (
        <Card>
          <CardHeader>
            <CardTitle>
              {createdRide.status === "cancelled"
                ? "❌ Ride Cancelled"
                : "✅ Ride Requested"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              <strong>Pickup:</strong>{" "}
              {createdRide.pickupLocation?.address || "N/A"}
            </p>
            <p>
              <strong>Destination:</strong>{" "}
              {createdRide.destinationLocation?.address || "N/A"}
            </p>
            <p>
              <strong>Coordinates:</strong>{" "}
              {createdRide.pickupLocation?.coordinates?.join(", ")} →{" "}
              {createdRide.destinationLocation?.coordinates?.join(", ")}
            </p>
            {createdRide.status !== "cancelled" && (
              <div className="text-right">
                <Button onClick={onCancelRide}>Cancel Ride</Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
