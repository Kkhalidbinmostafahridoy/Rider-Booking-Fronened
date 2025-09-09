import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "destructive" | "secondary";
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  className,
  children,
  ...props
}) => {
  const base =
    "inline-flex items-center px-2 py-1 rounded text-xs font-semibold";
  const variants: Record<string, string> = {
    default: "bg-gray-200 text-gray-800",
    success: "bg-green-200 text-green-800",
    destructive: "bg-red-200 text-red-800",
    secondary: "bg-yellow-200 text-yellow-800",
  };

  return (
    <span className={cn(base, variants[variant], className)} {...props}>
      {children}
    </span>
  );
};
