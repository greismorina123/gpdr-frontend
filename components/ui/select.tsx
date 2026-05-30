import { ReactNode, SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-10 w-full rounded-lg border border-border_grey bg-white px-3 text-sm text-text_dark focus:outline-none focus:ring-2 focus:ring-bosch_red/25",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export function SelectItem({ value, children }: { value: string; children: ReactNode }) {
  return <option value={value}>{children}</option>;
}
