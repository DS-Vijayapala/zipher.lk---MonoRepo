"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Zipher.lk theme colors
const ZIPHER_GREEN = "bg-[#0A8A32]";
const ZIPHER_GREEN_HOVER = "hover:bg-[#066624]";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-green-600/50",
  {
    variants: {
      variant: {
        default: `${ZIPHER_GREEN} text-white ${ZIPHER_GREEN_HOVER}`,
        destructive:
          "bg-red-600 text-white hover:bg-red-700",
        outline:
          "border border-green-600 text-green-700 hover:bg-green-50",
        secondary:
          "bg-green-100 text-green-900 hover:bg-green-200",
        ghost:
          "hover:bg-green-50 text-green-800",
        link: "text-green-700 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-6",
        sm: "h-8 px-3",
        lg: "h-12 px-8 text-base",
        icon: "size-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(
        "relative overflow-hidden select-none",
        // Shine effect
        "before:absolute before:inset-0 before:-translate-x-full before:bg-linear-to-r before:from-transparent before:via-white/20 before:to-transparent before:rounded-md",
        "hover:before:translate-x-full before:transition-all before:duration-700 before:ease-in-out",
        buttonVariants({ variant, size }),
        className
      )}
      {...props}
    />
  );
}

export { Button, buttonVariants };
