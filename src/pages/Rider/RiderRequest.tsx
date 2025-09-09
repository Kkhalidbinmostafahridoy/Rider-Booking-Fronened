// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { toast } from "sonner";
// import {} from "@/redux/features/auth/auth.api";
// import {
//   useRiderRequestCancelMutation,
//   useRiderRequestMutation,
// } from "./RiderApi";

// // Zod schema for ride request
// const rideRequestSchema = z.object({
//   pickupLocation: z.object({
//     coordinates: z.tuple([z.number(), z.number()]),
//     address: z.string().min(3, "Pickup address must be at least 3 characters"),
//   }),
//   destinationLocation: z.object({
//     coordinates: z.tuple([z.number(), z.number()]),
//     address: z
//       .string()
//       .min(3, "Destination address must be at least 3 characters"),
//   }),
//   paymentMethod: z.enum(["cash", "card"]).default("cash"),
//   fare: z.number().min(0).optional(),
// });

// type RideRequestForm = z.infer<typeof rideRequestSchema> & {
//   _id?: string;
//   status?: string;
// };

// export function RideRequest() {
//   const [createRide] = useRiderRequestMutation();
//   const [requestCancel] = useRiderRequestCancelMutation();
//   const [createdRide, setCreatedRide] = useState<RideRequestForm | null>(null);

//   const form = useForm<RideRequestForm>({
//     resolver: zodResolver(rideRequestSchema),
//     defaultValues: {
//       pickupLocation: { coordinates: [90.4125, 23.8103], address: "" },
//       destinationLocation: { coordinates: [90.4244, 23.7806], address: "" },
//     },
//     paymentMethod: "cash",
//   });

//   // Load persisted ride from localStorage
//   useEffect(() => {
//     const stored = localStorage.getItem("createdRide");
//     if (stored) {
//       try {
//         const parsed = JSON.parse(stored);
//         if (parsed?._id) {
//           setCreatedRide(parsed);
//         }
//       } catch (e) {
//         console.error("Invalid ride in localStorage", e);
//       }
//     }
//   }, []);

//   // Simple fare estimation
//   const estimateFare = (pickup: [number, number], dest: [number, number]) => {
//     const [lng1, lat1] = pickup;
//     const [lng2, lat2] = dest;
//     const distance =
//       Math.sqrt(Math.pow(lng2 - lng1, 2) + Math.pow(lat2 - lat1, 2)) * 111; // rough km
//     return Math.max(50, Math.round(distance * 15)); // base fare 50, 15 per km
//   };

//   // Submit ride request
//   // const onSubmit = async (data: RideRequestForm) => {
//   //   try {
//   //     const result = await createRide(data).unwrap();

//   //     const rideData = {
//   //       _id: result.data._id,
//   //       pickupLocation: result.data.pickupLocation,
//   //       destinationLocation: result.data.destinationLocation,
//   //       status: result.data.status || "requested",
//   //     };

//   //     setCreatedRide(rideData);
//   //     localStorage.setItem("createdRide", JSON.stringify(rideData));

//   //     toast.success("✅ Ride requested successfully!");
//   //     form.reset();
//   //   } catch (error: any) {
//   //     toast.error(error?.data?.message || "❌ Failed to request ride");
//   //   }
//   // };

//   const onSubmit = async (data: RideRequestForm) => {
//     try {
//       const fare = estimateFare(
//         data.pickupLocation.coordinates,
//         data.destinationLocation.coordinates
//       );
//       const result = await createRide({ ...data, fare }).unwrap();

//       const rideData = {
//         _id: result.data._id,
//         pickupLocation: result.data.pickupLocation,
//         destinationLocation: result.data.destinationLocation,
//         paymentMethod: result.data.paymentMethod,
//         fare: result.data.fare,
//         status: result.data.status || "requested",
//       };

//       setCreatedRide(rideData);
//       localStorage.setItem("createdRide", JSON.stringify(rideData));

//       toast.success("✅ Ride requested successfully!");
//       form.reset();
//     } catch (error: any) {
//       toast.error(error?.data?.message || "❌ Failed to request ride");
//     }
//   };

//   // Cancel ride request
//   const onCancelRide = async () => {
//     if (!createdRide?._id) return;

//     try {
//       const result = await requestCancel({ _id: createdRide._id }).unwrap();

//       toast.success(result.message || "✅ Ride cancelled successfully!");

//       // Update state and localStorage
//       const updatedRide = { ...createdRide, status: "cancelled" };
//       setCreatedRide(updatedRide);
//       localStorage.setItem("createdRide", JSON.stringify(updatedRide));
//     } catch (error: any) {
//       toast.error(error?.data?.message || "❌ Failed to cancel ride");
//     }
//   };

//   return (
//     <div className="max-w-full mx-auto mt-8 space-y-6 flex flex-col-1">
//       {/* Ride request form */}
// <Card className="shadow-lg rounded-2xl">
//   <CardHeader>
//     <CardTitle className="text-xl font-bold text-center">
//       🚖 Request a Ride
//     </CardTitle>
//   </CardHeader>
//   <CardContent>
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//         {/* Pickup */}
//         <div className="border rounded-lg p-4 shadow-sm">
//           <h3 className="font-semibold mb-3">📍 Pickup Location</h3>
//           <FormField
//             control={form.control}
//             name="pickupLocation.address"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Address</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter pickup address" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <div className="grid grid-cols-2 gap-3 mt-3">
//             <FormField
//               control={form.control}
//               name="pickupLocation.coordinates.0"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Longitude</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="number"
//                       step="any"
//                       placeholder="90.4125"
//                       {...field}
//                       onChange={(e) =>
//                         field.onChange(Number(e.target.value))
//                       }
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="pickupLocation.coordinates.1"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Latitude</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="number"
//                       step="any"
//                       placeholder="23.8103"
//                       {...field}
//                       onChange={(e) =>
//                         field.onChange(Number(e.target.value))
//                       }
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//         </div>

//         {/* Destination */}
//         <div className="border rounded-lg p-4 shadow-sm">
//           <h3 className="font-semibold mb-3">🎯 Destination Location</h3>
//           <FormField
//             control={form.control}
//             name="destinationLocation.address"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Address</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="Enter destination address"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <div className="grid grid-cols-2 gap-3 mt-3">
//             <FormField
//               control={form.control}
//               name="destinationLocation.coordinates.0"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Longitude</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="number"
//                       step="any"
//                       placeholder="90.4244"
//                       {...field}
//                       onChange={(e) =>
//                         field.onChange(Number(e.target.value))
//                       }
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="destinationLocation.coordinates.1"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Latitude</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="number"
//                       step="any"
//                       placeholder="23.7806"
//                       {...field}
//                       onChange={(e) =>
//                         field.onChange(Number(e.target.value))
//                       }
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Payment Method */}
//             <div className="border rounded-lg p-4 shadow-sm">
//               <h3 className="font-semibold mb-3">💳 Payment Method</h3>
//               <FormField
//                 control={form.control}
//                 name="paymentMethod"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Select Payment Method</FormLabel>
//                     <FormControl>
//                       <select
//                         {...field}
//                         className="border rounded px-2 py-1 w-full"
//                       >
//                         <option value="cash">Cash</option>
//                         <option value="card">Card</option>
//                       </select>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//           </div>
//         </div>

//         <Button type="submit" className="w-full">
//           Request Ride
//         </Button>
//       </form>
//     </Form>
//   </CardContent>
// </Card>
//       {/* Show created ride */}
//       {createdRide && (
//         <Card className="max-h-2/5 mx-4">
//           <CardHeader>
//             <CardTitle>
//               {createdRide.status === "cancelled"
//                 ? "❌ Ride Cancelled"
//                 : "✅ Ride Requested"}
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             <p>
//               <strong>Pickup:</strong>{" "}
//               {createdRide.pickupLocation?.address || "N/A"}
//             </p>
//             <p>
//               <strong>Destination:</strong>{" "}
//               {createdRide.destinationLocation?.address || "N/A"}
//             </p>
//             <p>
//               <strong>Coordinates:</strong>{" "}
//               {createdRide.pickupLocation?.coordinates?.join(", ")} →{" "}
//               {createdRide.destinationLocation?.coordinates?.join(", ")}
//             </p>
//             <p>
//               <strong>Payment:</strong> {createdRide.paymentMethod}
//             </p>
//             <p>
//               <strong>Fare Estimate:</strong> {createdRide.fare} BDT
//             </p>
//             {createdRide.status !== "cancelled" && (
//               <div className="text-right">
//                 <Button onClick={onCancelRide}>Cancel Ride</Button>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// }

/**888***
 *
 *
 *
 *
 *
 *
 */

/**
 *
 * final code
 */

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { toast } from "sonner";
// import {
//   useRiderRequestCancelMutation,
//   useRiderRequestMutation,
// } from "./RiderApi";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaCarSide, FaClock, FaRoute, FaUser } from "react-icons/fa";

// // Zod schema for ride request
// const rideRequestSchema = z.object({
//   pickupLocation: z.object({
//     coordinates: z.tuple([z.number(), z.number()]),
//     address: z.string().min(3, "Pickup address must be at least 3 characters"),
//   }),
//   destinationLocation: z.object({
//     coordinates: z.tuple([z.number(), z.number()]),
//     address: z
//       .string()
//       .min(3, "Destination address must be at least 3 characters"),
//   }),
//   paymentMethod: z.enum(["cash", "card"]).default("cash"),
//   fare: z.number().min(0).optional(),
// });

// type RideRequestForm = z.infer<typeof rideRequestSchema> & {
//   _id?: string;
//   status?: string;
//   driver?: {
//     name: string;
//     vehicle: string;
//   };
//   createdAt?: string;
// };

// export function RideRequest() {
//   const [createRide] = useRiderRequestMutation();
//   const [requestCancel] = useRiderRequestCancelMutation();
//   const [createdRide, setCreatedRide] = useState<RideRequestForm | null>(null);

//   const form = useForm<RideRequestForm>({
//     resolver: zodResolver(rideRequestSchema),
//     defaultValues: {
//       pickupLocation: { coordinates: [90.4125, 23.8103], address: "" },
//       destinationLocation: { coordinates: [90.4244, 23.7806], address: "" },
//       paymentMethod: "cash",
//     },
//   });

//   // Load persisted ride from localStorage
//   useEffect(() => {
//     const stored = localStorage.getItem("createdRide");
//     if (stored) {
//       try {
//         const parsed = JSON.parse(stored);
//         if (parsed?._id) {
//           setCreatedRide(parsed);
//         }
//       } catch (e) {
//         console.error("Invalid ride in localStorage", e);
//       }
//     }
//   }, []);

//   // Simple fare estimation
//   const estimateFare = (pickup: [number, number], dest: [number, number]) => {
//     const [lng1, lat1] = pickup;
//     const [lng2, lat2] = dest;
//     const distance =
//       Math.sqrt(Math.pow(lng2 - lng1, 2) + Math.pow(lat2 - lat1, 2)) * 111; // rough km
//     return Math.max(50, Math.round(distance * 15)); // base fare 50, 15 per km
//   };

//   // Submit ride request
//   const onSubmit = async (data: RideRequestForm) => {
//     try {
//       const fare = estimateFare(
//         data.pickupLocation.coordinates,
//         data.destinationLocation.coordinates
//       );
//       const result = await createRide({ ...data, fare }).unwrap();

//       const rideData = {
//         _id: result.data._id,
//         pickupLocation: result.data.pickupLocation,
//         destinationLocation: result.data.destinationLocation,
//         paymentMethod: result.data.paymentMethod,
//         fare: result.data.fare,
//         status: result.data.status || "requested",
//         driver: { name: "Pending Driver", vehicle: "N/A" }, // placeholder
//         createdAt: new Date().toISOString(),
//       };

//       setCreatedRide(rideData);
//       localStorage.setItem("createdRide", JSON.stringify(rideData));

//       toast.success("✅ Ride requested successfully!");
//       form.reset();
//     } catch (error: any) {
//       toast.error(error?.data?.message || "❌ Failed to request ride");
//     }
//   };

//   // Cancel ride request
//   const onCancelRide = async () => {
//     if (!createdRide?._id) return;

//     try {
//       const result = await requestCancel({ _id: createdRide._id }).unwrap();

//       toast.success(result.message || "✅ Ride cancelled successfully!");

//       // Update state and localStorage
//       const updatedRide = { ...createdRide, status: "cancelled" };
//       setCreatedRide(updatedRide);
//       localStorage.setItem("createdRide", JSON.stringify(updatedRide));
//     } catch (error: any) {
//       toast.error(error?.data?.message || "❌ Failed to cancel ride");
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto mt-8 space-y-6">
//       {/* Ride request form */}
//       <div className="flex flex-col-1 gap-7">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <Card className="shadow-lg rounded-2xl">
//             <CardHeader>
//               <CardTitle className="text-xl font-bold text-center">
//                 🚖 Request a Ride
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <Form {...form}>
//                 <form
//                   onSubmit={form.handleSubmit(onSubmit)}
//                   className="space-y-6"
//                 >
//                   {/* Pickup */}
//                   <div className="border rounded-lg p-4 shadow-sm">
//                     <h3 className="font-semibold mb-3">📍 Pickup Location</h3>
//                     <FormField
//                       control={form.control}
//                       name="pickupLocation.address"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Address</FormLabel>
//                           <FormControl>
//                             <Input
//                               placeholder="Enter pickup address"
//                               {...field}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <div className="grid grid-cols-2 gap-3 mt-3">
//                       <FormField
//                         control={form.control}
//                         name="pickupLocation.coordinates.0"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Longitude</FormLabel>
//                             <FormControl>
//                               <Input
//                                 type="number"
//                                 step="any"
//                                 placeholder="90.4125"
//                                 {...field}
//                                 onChange={(e) =>
//                                   field.onChange(Number(e.target.value))
//                                 }
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                       <FormField
//                         control={form.control}
//                         name="pickupLocation.coordinates.1"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Latitude</FormLabel>
//                             <FormControl>
//                               <Input
//                                 type="number"
//                                 step="any"
//                                 placeholder="23.8103"
//                                 {...field}
//                                 onChange={(e) =>
//                                   field.onChange(Number(e.target.value))
//                                 }
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </div>
//                   </div>

//                   {/* Destination */}
//                   <div className="border rounded-lg p-4 shadow-sm">
//                     <h3 className="font-semibold mb-3">
//                       🎯 Destination Location
//                     </h3>
//                     <FormField
//                       control={form.control}
//                       name="destinationLocation.address"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Address</FormLabel>
//                           <FormControl>
//                             <Input
//                               placeholder="Enter destination address"
//                               {...field}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <div className="grid grid-cols-2 gap-3 mt-3">
//                       <FormField
//                         control={form.control}
//                         name="destinationLocation.coordinates.0"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Longitude</FormLabel>
//                             <FormControl>
//                               <Input
//                                 type="number"
//                                 step="any"
//                                 placeholder="90.4244"
//                                 {...field}
//                                 onChange={(e) =>
//                                   field.onChange(Number(e.target.value))
//                                 }
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                       <FormField
//                         control={form.control}
//                         name="destinationLocation.coordinates.1"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Latitude</FormLabel>
//                             <FormControl>
//                               <Input
//                                 type="number"
//                                 step="any"
//                                 placeholder="23.7806"
//                                 {...field}
//                                 onChange={(e) =>
//                                   field.onChange(Number(e.target.value))
//                                 }
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />

//                       {/* Payment Method */}
//                       <div className="w-full border rounded-lg shadow-sm">
//                         <h3 className="font-semibold mb-3">
//                           💳 Payment Method
//                         </h3>
//                         <FormField
//                           control={form.control}
//                           name="paymentMethod"
//                           render={({ field }) => (
//                             <FormItem>
//                               <FormLabel>Select Payment Method</FormLabel>
//                               <FormControl>
//                                 <select
//                                   {...field}
//                                   className="border rounded  w-full"
//                                 >
//                                   <option value="cash">Cash</option>
//                                   <option value="card">Card</option>
//                                 </select>
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <Button type="submit" className="w-full">
//                     Request Ride
//                   </Button>
//                 </form>
//               </Form>
//             </CardContent>
//           </Card>
//         </motion.div>

//         {/* Show created ride */}
//         <AnimatePresence>
//           {createdRide && (
//             <motion.div
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               <Card className="shadow-xl rounded-2xl">
//                 <CardHeader>
//                   <CardTitle>
//                     {createdRide.status === "cancelled"
//                       ? "❌ Ride Cancelled"
//                       : "✅ Ride Requested"}
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   <div className="flex items-center gap-2">
//                     <FaRoute className="text-blue-500" />
//                     <p>
//                       <strong>Pickup:</strong>{" "}
//                       {createdRide.pickupLocation?.address || "N/A"} →{" "}
//                       {createdRide.destinationLocation?.address || "N/A"}
//                     </p>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <FaClock className="text-green-500" />
//                     <p>
//                       <strong>Requested At:</strong>{" "}
//                       {new Date(
//                         createdRide.createdAt || Date.now()
//                       ).toLocaleString()}
//                     </p>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <FaCarSide className="text-yellow-500" />
//                     <p>
//                       <strong>Fare:</strong> {createdRide.fare} BDT |{" "}
//                       <strong>Payment:</strong> {createdRide.paymentMethod}
//                     </p>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <FaUser className="text-purple-500" />
//                     <p>
//                       <strong>Driver:</strong>{" "}
//                       {createdRide.driver?.name || "Not assigned"} |{" "}
//                       {createdRide.driver?.vehicle || ""}
//                     </p>
//                   </div>
//                   {createdRide.status !== "cancelled" && (
//                     <motion.div
//                       className="text-right"
//                       whileHover={{ scale: 1.05 }}
//                     >
//                       <Button onClick={onCancelRide}>Cancel Ride</Button>
//                     </motion.div>
//                   )}
//                 </CardContent>
//               </Card>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }

/**
 *
 *
 *
 *
 *
 *
 *
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
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
  useRiderRequestMutation,
  useRiderRequestCancelMutation,
} from "./RiderApi";
import { useDriverActionMutation } from "../Driver/DriverApi";
import { motion, AnimatePresence } from "framer-motion";
import { FaCarSide, FaClock, FaRoute, FaUser } from "react-icons/fa";

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
  paymentMethod: z.enum(["cash", "card"]).default("cash"),
  fare: z.number().min(0).optional(),
});

export type RideRequestForm = z.infer<typeof rideRequestSchema> & {
  _id?: string;
  status?: string;
  driver?: {
    name: string;
    vehicle: string;
  };
  createdAt?: string;
};

export function RideRequest() {
  const [createRide] = useRiderRequestMutation();
  const [requestCancel] = useRiderRequestCancelMutation();
  const [driverAction] = useDriverActionMutation();
  const [createdRide, setCreatedRide] = useState<RideRequestForm | null>(null);

  const form = useForm<RideRequestForm>({
    resolver: zodResolver(rideRequestSchema),
    defaultValues: {
      pickupLocation: { coordinates: [90.4125, 23.8103], address: "" },
      destinationLocation: { coordinates: [90.4244, 23.7806], address: "" },
      paymentMethod: "cash",
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

  // Fare estimation
  const estimateFare = (pickup: [number, number], dest: [number, number]) => {
    const [lng1, lat1] = pickup;
    const [lng2, lat2] = dest;
    const distance =
      Math.sqrt(Math.pow(lng2 - lng1, 2) + Math.pow(lat2 - lat1, 2)) * 111;
    return Math.max(50, Math.round(distance * 15));
  };

  // Submit ride request
  const onSubmit = async (data: RideRequestForm) => {
    try {
      const fare = estimateFare(
        data.pickupLocation.coordinates,
        data.destinationLocation.coordinates
      );
      const result = await createRide({ ...data, fare }).unwrap();

      const rideData = {
        _id: result.data._id,
        pickupLocation: result.data.pickupLocation,
        destinationLocation: result.data.destinationLocation,
        paymentMethod: result.data.paymentMethod,
        fare: result.data.fare,
        status: result.data.status || "requested",
        driver: { name: "Pending Driver", vehicle: "N/A" },
        createdAt: new Date().toISOString(),
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

      const updatedRide = { ...createdRide, status: "cancelled" };
      setCreatedRide(updatedRide);
      localStorage.setItem("createdRide", JSON.stringify(updatedRide));
    } catch (error: any) {
      toast.error(error?.data?.message || "❌ Failed to cancel ride");
    }
  };

  // Driver accept/reject ride
  const handleStatusUpdate = async (action: "accept" | "reject") => {
    if (!createdRide?._id) return;

    try {
      const result = await driverAction({
        _id: createdRide._id,
        action,
      }).unwrap();
      console.log(result);

      toast.success(
        `Ride ${action === "accept" ? "accepted" : "rejected"} successfully!`
      );

      // Update local ride state
      setCreatedRide({
        ...createdRide,
        status: action === "accept" ? "accepted" : "rejected",
      });
      localStorage.setItem(
        "createdRide",
        JSON.stringify({
          ...createdRide,
          status: action === "accept" ? "accepted" : "rejected",
        })
      );
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update ride status");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 space-y-6">
      {/* Ride request form */}
      <div className="flex flex-col-1">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-center">
                🚖 Request a Ride
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
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
                            <Input
                              placeholder="Enter pickup address"
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
                    <h3 className="font-semibold mb-3">
                      🎯 Destination Location
                    </h3>
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

                    {/* Payment Method */}
                    <div className="w-full border rounded-lg shadow-sm mt-4 p-4">
                      <h3 className="font-semibold mb-3">💳 Payment Method</h3>
                      <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Select Payment Method</FormLabel>
                            <FormControl>
                              <select
                                {...field}
                                className="border rounded w-full p-2"
                              >
                                <option value="cash">Cash</option>
                                <option value="card">Card</option>
                              </select>
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
        </motion.div>

        {/* Show created ride */}
        <AnimatePresence>
          {createdRide && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="shadow-xl rounded-2xl">
                <CardHeader>
                  <CardTitle>
                    {createdRide.status === "cancelled"
                      ? "❌ Ride Cancelled"
                      : createdRide.status === "rejected"
                      ? "❌ Ride Rejected"
                      : createdRide.status === "accepted"
                      ? "✅ Ride Accepted"
                      : "✅ Ride Requested"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FaRoute className="text-blue-500" />
                    <p>
                      <strong>Route:</strong>{" "}
                      {createdRide.pickupLocation?.address || "N/A"} →{" "}
                      {createdRide.destinationLocation?.address || "N/A"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock className="text-green-500" />
                    <p>
                      <strong>Requested At:</strong>{" "}
                      {new Date(
                        createdRide.createdAt || Date.now()
                      ).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCarSide className="text-yellow-500" />
                    <p>
                      <strong>Fare:</strong> {createdRide.fare} BDT |{" "}
                      <strong>Payment:</strong> {createdRide.paymentMethod}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaUser className="text-purple-500" />
                    <p>
                      <strong>Driver:</strong>{" "}
                      {createdRide.driver?.name || "Not assigned"} |{" "}
                      {createdRide.driver?.vehicle || ""}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  {createdRide.status === "requested" && (
                    <div className="flex gap-4 mt-4 justify-end">
                      <Button
                        onClick={onCancelRide}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        Cancel Ride
                      </Button>
                      <Button
                        onClick={() => handleStatusUpdate("accept")}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        Accept
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
