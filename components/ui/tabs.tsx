"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Tabs({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn(className)}>{children}</div>;
}

export function TabsList({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("inline-flex rounded-lg border border-border_grey bg-gray-50 p-1", className)}>{children}</div>;
}

export function TabsTrigger({
  className,
  active,
  children,
  onClick
}: {
  className?: string;
  active?: boolean;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      className={cn(
        "rounded-md px-3 py-1.5 text-sm",
        active ? "bg-white text-text_dark shadow-sm" : "text-text_medium",
        className
      )}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

export function TabsContent({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn(className)}>{children}</div>;
}
