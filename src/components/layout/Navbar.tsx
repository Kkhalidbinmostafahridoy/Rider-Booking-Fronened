// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Logo from "@/assets/icons/Logo";
// import { Button } from "@/components/ui/button";
// import { ModeToggle } from "./ModeToggler";
// import { useLogoutMutation } from "@/redux/features/auth/auth.api";
// import { toast } from "sonner";
// import { role } from "@/contants/role";

// const navigationLinks = [
//   { href: "/", label: "Home", role: "PUBLIC" },
//   { href: "/about", label: "About", role: "PUBLIC" },
//   { href: "/admin", label: "DashBoard", role: role.ADMIN },
//   { href: "/user", label: "DashBoard", role: role.USER },
// ];

// export default function Navbar() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userRole, setUserRole] = useState<string | null>(null);
//   const navigate = useNavigate();
//   const [logoutApi] = useLogoutMutation();

//   // ✅ Check token and user role on mount
//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     const user = localStorage.getItem("user");
//     setIsLoggedIn(!!token);
//     setUserRole(user ? JSON.parse(user)?.role : null);
//   }, []);

//   // ✅ Update on storage changes
//   useEffect(() => {
//     const handleStorageChange = () => {
//       const token = localStorage.getItem("accessToken");
//       const user = localStorage.getItem("user");
//       setIsLoggedIn(!!token);
//       setUserRole(user ? JSON.parse(user)?.role : null);
//     };
//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await logoutApi({}).unwrap();
//     } catch (err) {
//       console.error("Logout error:", err);
//     } finally {
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("refreshToken");
//       localStorage.removeItem("user");
//       setIsLoggedIn(false);
//       setUserRole(null);
//       navigate("/login");
//       toast.success("Logged out successfully");
//     }
//   };

//   return (
//     <header className="border-b">
//       <div className="container mx-auto px-4 flex h-16 items-center justify-between gap-4">
//         <div className="flex items-center gap-6">
//           <Link to="/" className="text-primary hover:text-primary/90">
//             <Logo />
//           </Link>
//           {navigationLinks.map((link) => {
//             // Show public links
//             if (link.role === "PUBLIC") {
//               return (
//                 <Link
//                   key={link.href}
//                   to={link.href}
//                   className="text-muted-foreground hover:text-primary py-1.5 font-medium"
//                 >
//                   {link.label}
//                 </Link>
//               );
//             }

//             // Show role-specific links if user is logged in
//             if (isLoggedIn && link.role === userRole) {
//               return (
//                 <Link
//                   key={link.href}
//                   to={link.href}
//                   className="text-muted-foreground hover:text-primary py-1.5 font-medium"
//                 >
//                   {link.label}
//                 </Link>
//               );
//             }

//             return null;
//           })}
//         </div>

//         <div className="flex items-center gap-2">
//           <ModeToggle />
//           {isLoggedIn ? (
//             <Button
//               variant="outline"
//               className="text-sm"
//               onClick={handleLogout}
//             >
//               Logout
//             </Button>
//           ) : (
//             <Button asChild className="text-sm" variant="outline">
//               <Link to="/login">Login</Link>
//             </Button>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }

/**
 * 
 * 
 * 











 */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ModeToggler";
import { useLogoutMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { role } from "@/contants/role";

const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/admin", label: "Dashboard", role: role.ADMIN },
  { href: "/user", label: "Dashboard", role: role.USER },
  { href: "/rider", label: "Dashboard", role: role.RIDER },
  { href: "/driver", label: "Dashboard", role: role.DRIVER },
];

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();
  const [logoutApi] = useLogoutMutation();

  const safeParseUser = (): string | null => {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
    try {
      const user = JSON.parse(userStr);
      return user?.role || null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
    setUserRole(safeParseUser());
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("accessToken");
      setIsLoggedIn(!!token);
      setUserRole(safeParseUser());
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutApi({}).unwrap();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      setUserRole(null);
      navigate("/login");
      toast.success("Logged out successfully");
    }
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-primary hover:text-primary/90">
            <Logo />
          </Link>

          {navigationLinks.map((link) => {
            if (link.role === "PUBLIC") {
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                >
                  {link.label}
                </Link>
              );
            }
            if (isLoggedIn && link.role === userRole) {
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                >
                  {link.label}
                </Link>
              );
            }
            return null;
          })}
        </div>

        <div className="flex items-center gap-2">
          <ModeToggle />
          {isLoggedIn ? (
            <Button
              variant="outline"
              className="text-sm"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Button asChild className="text-sm" variant="outline">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
