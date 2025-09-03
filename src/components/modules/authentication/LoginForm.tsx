/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// // /* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Form } from "@/components/ui/form"; // ✅ fix: import Form correctly
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Password from "@/components/ui/password";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.email("Invalid email address"), // ✅ fix: use z.string().email
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [login] = useLoginMutation(); //  use useLoginMutation for login

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // const onSubmit = async (data: z.infer<typeof loginSchema>) => {
  //   const userInfo = {
  //     email: data.email,
  //     password: data.password,
  //   };

  //   try {
  //     const result = await login(userInfo).unwrap();
  //     console.log(result);

  //     // if (result?.data?.user?.isVerified === false) {
  //     //   toast.error("Please verify your email before logging in.");
  //     //   navigate("/verify", { state: { email: data.email } }); // Pass email to the verify page
  //     //   return; // ✅ stop further execution
  //     // }

  //     toast.success("Login successful!");
  //     navigate("/about"); // ✅ optional: redirect to dashboard or home page
  //   } catch (error: any) {
  //     toast.error(error?.data?.message || "Login failed");
  //     console.log(error);
  //   }
  // };

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const result = await login(data).unwrap();
      console.log(result);

      // ✅ Save tokens + user
      localStorage.setItem("accessToken", result.data.accessToken);
      localStorage.setItem("refreshToken", result.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(result.data.user));

      // ✅ Notify Navbar
      window.dispatchEvent(new Event("storage"));

      toast.success("Login successful!");
      navigate("/"); // redirect
    } catch (err: any) {
      toast.error(err?.data?.message || "Login failed");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
      </div>
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  <FormDescription className="sr-only">
                    This is your public display email.
                  </FormDescription>
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
                    <Password {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your public display password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit">
              Login
            </Button>
          </form>
        </Form>

        {/* Divider */}
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>

        {/* Google Login Button */}
        <Button variant="outline" className="w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0 0 48 48"
          >
            <path
              fill="#fbc02d"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#e53935"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4caf50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1565c0"
              d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>
          Login with Google
        </Button>
      </div>

      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link
          to="/register"
          className="underline text-red-500 underline-offset-4 hover:underline"
        >
          Registration
        </Link>
      </div>
    </div>
  );
}

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { useLoginMutation } from "@/redux/features/auth/auth.api";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// const loginSchema = z.object({
//   email: z.email("Invalid email"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// export function LoginForm() {
//   const [login] = useLoginMutation();
//   const navigate = useNavigate();
//   const form = useForm<z.infer<typeof loginSchema>>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: { email: "", password: "" },
//   });

//   const onSubmit = async (data: z.infer<typeof loginSchema>) => {
//     try {
//       const result = await login(data).unwrap();

//       // ✅ Save tokens + user
//       localStorage.setItem("accessToken", result.data.accessToken);
//       localStorage.setItem("refreshToken", result.data.refreshToken);
//       localStorage.setItem("user", JSON.stringify(result.data.user));

//       // ✅ Notify Navbar
//       window.dispatchEvent(new Event("storage"));

//       toast.success("Login successful!");
//       navigate("/"); // redirect
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <Input {...field} type="email" />
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Password</FormLabel>
//               <Input {...field} type="password" />
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type="submit" className="w-full">
//           Login
//         </Button>
//       </form>
//     </Form>
//   );
// }

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useLoginMutation } from "@/redux/features/auth/auth.api";
// import { toast } from "sonner";
// import { useNavigate, Link } from "react-router";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import Password from "@/components/ui/password";

// const loginSchema = z.object({
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// export function LoginForm({
//   className,
//   ...props
// }: React.HTMLAttributes<HTMLDivElement>) {
//   const [login] = useLoginMutation();
//   const navigate = useNavigate();

//   const form = useForm<z.infer<typeof loginSchema>>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: { email: "", password: "" },
//   });

//   const onSubmit = async (data: z.infer<typeof loginSchema>) => {
//     try {
//       const result = await login(data).unwrap();

//       localStorage.setItem("accessToken", result.data.accessToken);
//       localStorage.setItem("refreshToken", result.data.refreshToken);
//       localStorage.setItem("user", JSON.stringify(result.data.user));
//       window.dispatchEvent(new Event("storage"));

//       const { role, status } = result.data.user;

//       if (status !== "Active") {
//         navigate("/account-status", { state: { status } });
//         return;
//       }

//       if (role === "Admin") navigate("/admin/dashboard");
//       else if (role === "Driver") navigate("/driver/dashboard");
//       else navigate("/rider/dashboard");

//       toast.success("Login successful!");
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className={cn("flex flex-col gap-6", className)} {...props}>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <input {...field} className="input w-full" type="email" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
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
//           <Button type="submit" className="w-full">
//             Login
//           </Button>
//         </form>
//       </Form>
//       <div className="text-center text-sm">
//         Don't have an account?{" "}
//         <Link
//           to="/register"
//           className="underline text-cyan-500 underline-offset-4"
//         >
//           Register
//         </Link>
//       </div>
//     </div>
//   );
// }
