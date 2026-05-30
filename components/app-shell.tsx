"use client";

import { ReactNode, useState } from "react";
import { SidebarNav } from "@/components/sidebar-nav";
import { TopBar } from "@/components/top-bar";
import { RunScanDialog } from "@/components/run-scan-dialog";

export function AppShell({ children }: { children: ReactNode }) {
  const [dialog_open, set_dialog_open] = useState(false);

  return (
    <div className="min-h-screen bg-page_bg">
      <div className="h-1.5 w-full bg-[linear-gradient(90deg,#E00420_0_20%,#7A1FA2_20%_40%,#005691_40%_60%,#00A8E1_60%_80%,#00884A_80%_100%)]" />
      <div className="flex min-h-[calc(100vh-6px)]">
        <SidebarNav />
        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar on_open_run_scan={() => set_dialog_open(true)} />
          <main className="flex-1 p-5">{children}</main>
        </div>
      </div>
      <RunScanDialog open={dialog_open} onOpenChange={set_dialog_open} />
    </div>
  );
}
