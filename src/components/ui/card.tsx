// src/components/ui/card.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("relative rounded-xl border border-zinc-700 bg-zinc-800/60 text-zinc-50 shadow-lg transition-all hover:z-10 hover:scale-[1.02] hover:border-zinc-500", className)}
      {...props}
    />
  )
);
Card.displayName = "Card";

type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

export { Card, CardContent };
