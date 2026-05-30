import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input(
  { className, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={cn(
        "h-10 w-full rounded-lg border border-border_grey bg-white px-3 text-sm text-text_dark focus:outline-none focus:ring-2 focus:ring-bosch_red/20",
        className
      )}
      {...props}
    />
  );
});
