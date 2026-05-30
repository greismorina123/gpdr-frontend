import { forwardRef, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea({ className, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        className={cn(
          "min-h-24 w-full rounded-lg border border-border_grey bg-white px-3 py-2 text-sm text-text_dark focus:outline-none focus:ring-2 focus:ring-bosch_red/20",
          className
        )}
        {...props}
      />
    );
  }
);
