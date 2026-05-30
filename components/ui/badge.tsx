import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "secondary" | "outline";

export function Badge({
  className,
  variant = "default",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  const variant_class =
    variant === "default"
      ? "bg-slate-100 text-slate-800"
      : variant === "secondary"
        ? "bg-gray-100 text-gray-700"
        : "border border-border_grey bg-white text-text_dark";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium",
        variant_class,
        className
      )}
      {...props}
    />
  );
}
