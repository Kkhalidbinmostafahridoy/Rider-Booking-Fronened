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
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import {} from "@/redux/features/auth/auth.api";
import { useDriverCreateMutation, useDriverStatusMutation } from "./DriverApi";

// ✅ Driver Profile Schema
const driverProfileSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().regex(/^\d{10,11}$/),
  password: z.string().min(6),
  address: z.string().min(3),
  licenseNumber: z.string().min(3),
  vehicleInfo: z.object({
    make: z.string().min(2),
    model: z.string().min(1),
    plateNumber: z.string().min(1),
  }),
  status: z.enum(["pending", "accepted", "cancelled"]).optional(),
  _id: z.string().optional(),
});

type DriverProfileFormValues = z.infer<typeof driverProfileSchema>;

export function Profile({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [createDriver] = useDriverCreateMutation();
  const [updateDriverStatus] = useDriverStatusMutation();
  const [storedDriver, setStoredDriver] =
    useState<DriverProfileFormValues | null>(null);

  // Load driver from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("driverProfile");
    if (stored) setStoredDriver(JSON.parse(stored));
  }, []);

  const form = useForm<DriverProfileFormValues>({
    resolver: zodResolver(driverProfileSchema),
    defaultValues: storedDriver || {
      name: "",
      email: "",
      phone: "",
      password: "",
      address: "",
      licenseNumber: "",
      vehicleInfo: {
        make: "",
        model: "",
        plateNumber: "",
      },
      status: "pending",
    },
  });

  // Create or update driver profile
  const onSubmit = async (data: DriverProfileFormValues) => {
    try {
      const result = await createDriver(data).unwrap();
      const driverData = {
        ...data,
        _id: result.data._id,
        status: result.data.status || "pending",
      };

      // Save to localStorage
      localStorage.setItem("driverProfile", JSON.stringify(driverData));
      setStoredDriver(driverData);

      toast.success("Driver profile saved successfully!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to save profile");
    }
  };

  // Update driver status (accepted / cancelled)
  const handleStatusUpdate = async (status: "accepted" | "cancelled") => {
    if (!storedDriver?._id) return;
    try {
      const result = await updateDriverStatus({
        _id: storedDriver._id,
        status,
      }).unwrap();

      const updatedDriver = { ...storedDriver, status };
      setStoredDriver(updatedDriver);
      localStorage.setItem("driverProfile", JSON.stringify(updatedDriver));

      toast.success(result.message || `Driver status updated to ${status}`);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update driver status");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <h1 className="text-2xl font-bold text-center">Driver Profile</h1>

      <div className="max-w-full mx-auto mt-8 space-y-6">
        {/* Profile Form */}
        <Card className="border">
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

                <Button type="submit" className="w-full">
                  Save Profile
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Driver Card */}
        {storedDriver && (
          <Card className="bg-amber-600 border shadow-md">
            <CardContent>
              <h2 className="font-bold text-lg mb-2">{storedDriver.name}</h2>
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
              </p>
              <p>
                <strong>Status:</strong> {storedDriver.status || "pending"}
              </p>

              {/* Actions */}
              <div className="flex gap-4 mt-4">
                <Button onClick={() => handleStatusUpdate("accepted")}>
                  Accept
                </Button>
                <Button onClick={() => handleStatusUpdate("cancelled")}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
