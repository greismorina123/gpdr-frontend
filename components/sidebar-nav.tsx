"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Database,
  FileSearch,
  FileText,
  Fingerprint,
  Gauge,
  Shield,
  Users
} from "lucide-react";
import { app_nav_items } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const nav_icons = [Shield, Activity, FileSearch, Gauge, Users, Fingerprint, Database];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 flex-col bg-charcoal text-slate-100">
      <div className="border-b border-slate-700 px-4 py-4">
        <p className="text-xs uppercase tracking-widest text-slate-300">Navigation</p>
      </div>
      <nav className="space-y-1 p-2">
        {app_nav_items.map((item, index) => {
          const Icon = nav_icons[index] ?? Shield;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                active
                  ? "border-l-4 border-bosch_red bg-slate-800 text-white"
                  : "border-l-4 border-transparent text-slate-300 hover:bg-slate-800 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
