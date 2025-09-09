/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import {
  useDriverActionMutation,
  useDriverCreateMutation,
  useDriverStatusMutation,
} from "./DriverApi";
import { Badge } from "@/components/ui/badge";
import type { RideRequestForm } from "../Rider/RiderRequest";

// Driver Profile Schema
const driverProfileSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().regex(/^\d{10,11}$/),
  password: z.string().min(6),
  address: z.string().min(3),
  licenseNumber: z.string().min(3),
  availability: z.string(),
  vehicleInfo: z.object({
    make: z.string().min(2),
    model: z.string().min(1),
    plateNumber: z.string().min(1),
    type: z.string().optional(),
  }),
  status: z.enum(["pending", "accepted", "cancelled"]).optional(),
  _id: z.string().optional(),
});

export type DriverProfileFormValues = z.infer<typeof driverProfileSchema>;

export function DriverProfile({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [createDriver] = useDriverCreateMutation();
  const [driverAction] = useDriverActionMutation();
  const [driverAvailable] = useDriverStatusMutation();
  const [storedDriver, setStoredDriver] =
    useState<DriverProfileFormValues | null>(null);
  const [createdRide, setCreatedRide] = useState<RideRequestForm | null>(null);

  // Load driver from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("driverProfile");
    if (stored) setStoredDriver(JSON.parse(stored));
  }, []);

  const form = useForm<DriverProfileFormValues>({
    resolver: zodResolver(driverProfileSchema),
    defaultValues: {
      name: storedDriver?.name || "",
      email: storedDriver?.email || "",
      phone: storedDriver?.phone || "",
      availability: "",
      password: "",
      address: storedDriver?.address || "",
      licenseNumber: storedDriver?.licenseNumber || "",
      vehicleInfo: {
        make: storedDriver?.vehicleInfo?.make || "",
        model: storedDriver?.vehicleInfo?.model || "",
        plateNumber: storedDriver?.vehicleInfo?.plateNumber || "",
      },
      status: storedDriver?.status || "pending",
    },
  });

  // Save or update driver profile
  const onSubmit = async (data: DriverProfileFormValues) => {
    try {
      const payload = {
        ...data,
        password: data?.password || storedDriver?.password || "",
      };
      const result = await createDriver(payload).unwrap();

      const driverData: DriverProfileFormValues = {
        ...payload,
        _id: result.data._id,
        status: result?.data?.status || "pending",
        // Ensure availability from server is used
        availability: result?.data?.availability || "offline",
      };

      setStoredDriver(driverData);
      localStorage.setItem("driverProfile", JSON.stringify(driverData));
      toast.success("Driver profile saved successfully!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to save profile");
    }
  };

  // Accept / Reject driver action
  const handleStatusUpdate = async (action: "accept" | "reject") => {
    if (!createdRide?._id) return; // Make sure ride exists

    if (
      createdRide?.status !== "pending" &&
      createdRide?.status !== "requested"
    ) {
      toast.error("This ride cannot be modified.");
      return;
    }

    try {
      const result = await driverAction({
        _id: createdRide._id,
        action,
      }).unwrap();

      toast.success(
        `Ride ${action === "accept" ? "accepted" : "rejected"} successfully!`
      );

      // Update local ride state
      const updatedRide = {
        ...createdRide,
        status: action === "accept" ? "accepted" : "rejected",
      };
      setCreatedRide(updatedRide);
      localStorage.setItem("createdRide", JSON.stringify(updatedRide));
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update ride status");
    }
  };
  const handleAvailabilityToggle = async () => {
    if (!storedDriver?._id) {
      toast.error("Driver profile not found.");
      return;
    }

    const newStatus =
      storedDriver.availability === "online" ? "offline" : "online";

    try {
      const result = await driverAvailable({
        _id: storedDriver._id,
        availability: newStatus,
      }).unwrap();

      const updatedDriver = result.data;

      setStoredDriver(updatedDriver);
      localStorage.setItem("driverProfile", JSON.stringify(updatedDriver));

      toast.success(
        `Driver is now ${updatedDriver.availability.toUpperCase()}`
      );
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update availability");
    }
  };

  // ======== END: CORRECTED FUNCTION ========

  useEffect(() => {
    const ride = localStorage.getItem("createdRide");
    if (ride) setCreatedRide(JSON.parse(ride));
  }, []);

  return (
    <div
      className={cn("flex flex-col gap-6 px-4 md:px-10", className)}
      {...props}
    >
      <h1 className="text-3xl font-bold text-center text-amber-700">
        Driver Profile
      </h1>

      <div className="flex flex-col-1 max-w-4xl mx-auto mt-8 space-y-6">
        {/* Profile Form */}
        <Card className="border shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-amber-600">
              Edit Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="example@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="0172345678" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="******"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="licenseNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>License Number</FormLabel>
                      <FormControl>
                        <Input placeholder="LIC1230078" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="vehicleInfo.make"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vehicle Make</FormLabel>
                        <FormControl>
                          <Input placeholder="Toyota" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="vehicleInfo.model"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vehicle Model</FormLabel>
                        <FormControl>
                          <Input placeholder="Camry" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="vehicleInfo.plateNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Plate Number</FormLabel>
                        <FormControl>
                          <Input placeholder="XYZ-9807" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700"
                >
                  Save Profile
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Driver Card */}
        {storedDriver && (
          <Card className="w-[560px] bg-gradient-to-r text-muted max-h-[400px] from-amber-300 to-amber-600 border shadow-lg mx-4">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                {storedDriver.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                <strong>Email:</strong> {storedDriver.email}
              </p>
              <p>
                <strong>Phone:</strong> {storedDriver.phone}
              </p>
              <p>
                <strong>Address:</strong> {storedDriver.address}
              </p>
              <p>
                <strong>License:</strong> {storedDriver.licenseNumber}
              </p>
              <p>
                <strong>Vehicle:</strong> {storedDriver.vehicleInfo.make}{" "}
                {storedDriver.vehicleInfo.model} (
                {storedDriver.vehicleInfo.plateNumber})
                {storedDriver.vehicleInfo.type && (
                  <Badge variant="secondary" className="ml-2">
                    {storedDriver.vehicleInfo.type}
                  </Badge>
                )}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <Badge
                  variant={
                    storedDriver.status === "accepted"
                      ? "success"
                      : storedDriver.status === "cancelled"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {storedDriver.status || "pending"}
                </Badge>
              </p>
              <p>
                <strong>Availability:</strong>{" "}
                <Badge
                  variant={
                    storedDriver?.availability === "online"
                      ? "success"
                      : "destructive"
                  }
                >
                  {storedDriver?.availability || "offline"}
                </Badge>
              </p>

              {/* <Button
                onClick={handleAvailabilityToggle}
                className={
                  storedDriver?.availability === "online"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }
              >
                {storedDriver?.availability === "online"
                  ? "Go Offline"
                  : "Go Online"}
              </Button> */}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
