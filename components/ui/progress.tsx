"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The numeric value of the progress. */
  value?: number;
}

/**
 * A custom progress bar that mimics shadcn's style/behavior
 * without using @radix-ui/react-progress.
 */
const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, ...props }, ref) => {
    // Clamp the value so it doesn't go below 0 or above 100
    const clampedValue = Math.min(Math.max(value, 0), 100);

    return (
      <div
        ref={ref}
        className={cn(
          "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
          className
        )}
        {...props}
      >
        <div
          className="h-full w-full flex-1 bg-primary transition-transform duration-300"
          // By using negative translateX we animate from 100% -> 0% as value goes 0 -> 100
          style={{
            transform: `translateX(-${100 - clampedValue}%)`,
          }}
        />
      </div>
    );
  }
);

Progress.displayName = "Progress";

export { Progress };
