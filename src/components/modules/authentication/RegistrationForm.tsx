/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
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
import Password from "@/components/ui/password";
import {
  useRegisterMutation,
  useRiderRegisterMutation,
} from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ✅ Schema
const registerSchema = z
  .object({
    name: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
    phone: z.string().regex(/^\d{10,11}$/, "Phone number must be 10–11 digits"),
    address: z.string().min(3, "Address must be at least 3 characters"),
    role: z.enum(["USER", "RIDER", "DRIVER"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function RegistrationForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [registerUser] = useRegisterMutation();
  const [riderRegister] = useRiderRegisterMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
      role: "USER",
    },
  });

  // ✅ Handle submit
  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      const { name, email, password, role, phone, address } = data;

      let result;

      if (role === "USER") {
        result = await registerUser({ name, email, password }).unwrap();
      } else {
        result = await riderRegister({
          name,
          email,
          password,
          role,
          phone,
          address,
        }).unwrap();
      }
      console.log(result);
      // ✅ Save tokens + user
      localStorage.setItem("accessToken", result.data.accessToken);
      localStorage.setItem("refreshToken", result.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(result.data.user));
      window.dispatchEvent(new Event("storage"));

      toast.success("Registration successful!");
      navigate("/"); // redirect after register
    } catch (err: any) {
      toast.error(err?.data?.message || "Registration failed");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create your Account</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="example@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Password {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Password {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter phone number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Role */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="USER">USER</SelectItem>
                    <SelectItem value="RIDER">RIDER</SelectItem>
                    <SelectItem value="DRIVER">DRIVER</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
      </Form>

      {/* Link to Login */}
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link
          to="/login"
          className="underline text-cyan-500 underline-offset-4"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

//*****
// */

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Link, useNavigate } from "react-router";
// import { useForm } from "react-hook-form";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Password from "@/components/ui/password";
// import {
//   useRegisterMutation,
//   useRiderRegisterMutation,
// } from "@/redux/features/auth/auth.api";
// import { toast } from "sonner";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// // ✅ Schema
// const registerSchema = z
//   .object({
//     name: z.string().min(3, "Username must be at least 3 characters"),
//     email: z.string().email("Invalid email address"),
//     password: z.string().min(6, "Password must be at least 6 characters"),
//     confirmPassword: z.string().min(6, "Confirm password is required"),
//     phone: z.string().optional(),
//     address: z.string().optional(),
//     licenseNumber: z.string().min(3, "License Number is required"),
//     vehicleInfo: z.object({
//       make: z.string().min(2, "Vehicle make is required"),
//       model: z.string().min(1, "Vehicle model is required"),
//       plateNumber: z.string().min(1, "Plate number is required"),
//     }),
//     role: z.enum(["USER", "RIDER", "DRIVER"]),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

// export function RegistrationForm({
//   className,
//   ...props
// }: React.HTMLAttributes<HTMLDivElement>) {
//   const [registerUser] = useRegisterMutation();
//   const [riderRegister] = useRiderRegisterMutation();
//   const navigate = useNavigate();

//   const form = useForm<z.infer<typeof registerSchema>>({
//     resolver: zodResolver(registerSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//       phone: "",
//       address: "",
//       role: "USER",
//     },
//   });

//   const role = form.watch("role"); // watch role to show/hide fields

//   const onSubmit = async (data: z.infer<typeof registerSchema>) => {
//     try {
//       const { name, email, password, role, phone, address } = data;

//       let result;

//       if (role === "USER") {
//         result = await registerUser({ name, email, password }).unwrap();
//       } else {
//         result = await riderRegister({
//           name,
//           email,
//           password,
//           role,
//           phone,
//           address,
//         }).unwrap();
//       }

//       console.log(result)

//       // Save tokens + user
//       localStorage.setItem("accessToken", result.data.accessToken);
//       localStorage.setItem("refreshToken", result.data.refreshToken);
//       localStorage.setItem("user", JSON.stringify(result.data.user));
//       window.dispatchEvent(new Event("storage"));

//       toast.success("Registration successful!");
//       navigate("/");
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className={cn("flex flex-col gap-6", className)} {...props}>
//       <div className="flex flex-col items-center gap-2 text-center">
//         <h1 className="text-2xl font-bold">Create your Account</h1>
//       </div>

//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//           {/* Name */}
//           <FormField
//             control={form.control}
//             name="name"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Name</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter Name" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Email */}
//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="email"
//                     placeholder="example@gmail.com"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Password */}
//           <FormField
//             control={form.control}
//             name="password"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Password</FormLabel>
//                 <FormControl>
//                   <Password {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Confirm Password */}
//           <FormField
//             control={form.control}
//             name="confirmPassword"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Confirm Password</FormLabel>
//                 <FormControl>
//                   <Password {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Role */}
//           <FormField
//             control={form.control}
//             name="role"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Role</FormLabel>
//                 <Select
//                   onValueChange={field.onChange}
//                   defaultValue={field.value}
//                 >
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select a role" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     <SelectItem value="USER">USER</SelectItem>
//                     <SelectItem value="RIDER">RIDER</SelectItem>
//                     <SelectItem value="DRIVER">DRIVER</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Show Phone & Address only for RIDER/DRIVER */}
//           {["RIDER"].includes(role) && (
//             <>
//               {/* Phone */}
//               <FormField
//                 control={form.control}
//                 name="phone"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Phone</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Enter phone number" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Address */}
//               <FormField
//                 control={form.control}
//                 name="address"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Address</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Enter your address" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </>
//           )}
//           {["DRIVER"].includes(role) && (
//             <>
//               {/* Phone */}
//               <FormField
//                 control={form.control}
//                 name="phone"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Phone</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Enter phone number" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Address */}
//               <FormField
//                 control={form.control}
//                 name="address"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Address</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Enter your address" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               {/* License Number */}
//               <FormField
//                 control={form.control}
//                 name="licenseNumber"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>License Number</FormLabel>
//                     <FormControl>
//                       <Input placeholder="LIC1230078" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Vehicle Info */}
//               <FormField
//                 control={form.control}
//                 name="vehicleInfo.make"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Vehicle Make</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Toyota" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="vehicleInfo.model"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Vehicle Model</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Camry" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="vehicleInfo.plateNumber"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Plate Number</FormLabel>
//                     <FormControl>
//                       <Input placeholder="XYZ-9807" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </>
//           )}

//           {/* Submit */}
//           <Button type="submit" className="w-full">
//             Register
//           </Button>
//         </form>
//       </Form>

//       {/* Link to Login */}
//       <div className="text-center text-sm">
//         Already have an account?{" "}
//         <Link
//           to="/login"
//           className="underline text-cyan-500 underline-offset-4"
//         >
//           Login
//         </Link>
//       </div>
//     </div>
//   );
// }
