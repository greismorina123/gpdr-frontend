import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "outline" | "secondary" | "destructive";
type ButtonSize = "default" | "sm";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variant_classes: Record<ButtonVariant, string> = {
  default: "bg-bosch_red text-white hover:bg-red-700",
  outline: "border border-border_grey bg-white text-text_dark hover:bg-gray-50",
  secondary: "bg-charcoal text-white hover:bg-slate-700",
  destructive: "bg-bosch_red text-white hover:bg-red-800"
};

const size_classes: Record<ButtonSize, string> = {
  default: "h-10 px-4 text-sm",
  sm: "h-8 px-3 text-xs"
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "default", size = "default", ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        variant_classes[variant],
        size_classes[size],
        className
      )}
      {...props}
    />
  );
});
