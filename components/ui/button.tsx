import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay disabled:opacity-50",
        variant === "primary" && "bg-clay text-white hover:bg-espresso shadow-warm",
        variant === "secondary" && "bg-fog text-espresso hover:bg-cream border",
        variant === "ghost" && "bg-transparent text-espresso hover:bg-fog",
        size === "sm" && "h-8 px-4 text-sm",
        size === "md" && "h-10 px-6 text-[15px]",
        size === "lg" && "h-12 px-8 text-base",
        className
      )}
      {...props}
    />
  );
}
