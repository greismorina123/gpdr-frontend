"use client";

import { Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserSwitcher } from "@/components/user-switcher";

export function TopBar({ on_open_run_scan }: { on_open_run_scan: () => void }) {
  return (
    <header className="border-b border-border_grey bg-white px-6 py-3">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-bosch_red/10 p-2 text-bosch_red">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-semibold text-text_dark">GDPR Sentinel</p>
            <p className="text-sm text-text_medium">Automated GDPR data discovery</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <UserSwitcher />
          <Badge className="bg-slate-100 text-slate-700">Mock mode</Badge>
          <Button onClick={on_open_run_scan}>Run new scan</Button>
        </div>
      </div>
    </header>
  );
}
