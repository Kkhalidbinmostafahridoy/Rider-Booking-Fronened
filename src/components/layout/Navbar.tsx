import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ModeToggler";
import { useLogoutMutation } from "@/redux/features/auth/auth.api";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const [logoutApi] = useLogoutMutation();

  // Check localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setIsLoggedIn(!!token);
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await logoutApi().unwrap(); // Call backend logout
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("userToken");
      setIsLoggedIn(false);
      navigate("/login");
    }
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between gap-4">
        {/* Left side */}
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

        {/* Right side */}
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
            <Button asChild className="text-sm">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
