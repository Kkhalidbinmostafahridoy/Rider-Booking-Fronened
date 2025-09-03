import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ModeToggler";
import { useLogoutMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [logoutApi] = useLogoutMutation();

  // ✅ Check token on mount
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  // ✅ Update on storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("accessToken");
      setIsLoggedIn(!!token);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = async () => {
    try {
      const result = await logoutApi({}).unwrap(); // optional backend logout
      console.log("Logout result:", result);
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
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
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-muted-foreground hover:text-primary py-1.5 font-medium"
            >
              {link.label}
            </Link>
          ))}
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
