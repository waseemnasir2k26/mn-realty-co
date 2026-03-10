"use client";

import Link from "next/link";
import { clsx } from "clsx";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gold text-white hover:bg-gold-dark",
  secondary:
    "bg-navy text-white hover:bg-navy-light",
  outline:
    "border-2 border-gold text-gold hover:bg-gold hover:text-white",
  ghost:
    "text-navy hover:text-gold",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-5 py-2 text-xs",
  md: "px-7 py-3 text-sm",
  lg: "px-10 py-4 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  href,
  onClick,
  type = "button",
}: ButtonProps) {
  const classes = clsx(
    "inline-flex items-center justify-center rounded-full uppercase tracking-wider font-semibold",
    "transition-all duration-300",
    "hover:-translate-y-0.5 hover:shadow-lg",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
