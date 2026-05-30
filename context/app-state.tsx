"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState
} from "react";
import {
  audit_log_entries,
  base_scans,
  dashboard_stats,
  initial_findings,
  owner_summaries,
  reproducibility_snapshot,
  resource_intensity,
  users
} from "@/lib/mock-data";
import { AuditEntry, Finding, Scan, User } from "@/types/models";

type ApplyActionPayload = {
  finding_id: string;
  review_status: "confirmed_business_need" | "acknowledged_cleanup";
  review_note: string;
};

type AppStateContextValue = {
  users: User[];
  selected_user_id: string;
  set_selected_user_id: (user_id: string) => void;
  findings: Finding[];
  scans: Scan[];
  audit_entries: AuditEntry[];
  apply_finding_action: (payload: ApplyActionPayload) => void;
  append_scan: (scan: Scan) => void;
};

const AppStateContext = createContext<AppStateContextValue | undefined>(undefined);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [selected_user_id, set_selected_user_id] = useState<string>("u_001");
  const [findings, set_findings] = useState<Finding[]>(initial_findings);
  const [audit_entries, set_audit_entries] = useState<AuditEntry[]>(audit_log_entries);
  const [scans, set_scans] = useState<Scan[]>(base_scans);

  const apply_finding_action = useCallback(
    ({ finding_id, review_status, review_note }: ApplyActionPayload) => {
      const selected_user = users.find((user) => user.id === selected_user_id);
      if (!selected_user) {
        return;
      }

      const now = new Date().toISOString();
      let target_file_name = "";

      set_findings((current_findings) =>
        current_findings.map((finding) => {
          if (finding.id !== finding_id) {
            return finding;
          }

          target_file_name = finding.file_name;

          return {
            ...finding,
            review_status,
            review_note,
            reviewed_at: now,
            reviewed_by_user_id: selected_user_id
          };
        })
      );

      set_audit_entries((current_entries) => {
        if (!target_file_name) {
          return current_entries;
        }

        const next_entry: AuditEntry = {
          id: `audit_${String(current_entries.length + 1).padStart(3, "0")}`,
          timestamp: now,
          finding_id,
          file_name: target_file_name,
          user: selected_user.name,
          action:
            review_status === "confirmed_business_need"
              ? "Confirmed business need"
              : "Acknowledged cleanup",
          review_note,
          resulting_status: review_status
        };

        return [next_entry, ...current_entries];
      });
    },
    [selected_user_id]
  );

  const append_scan = useCallback((scan: Scan) => {
    set_scans((current_scans) => [scan, ...current_scans]);
  }, []);

  const value = useMemo(
    () => ({
      users,
      selected_user_id,
      set_selected_user_id,
      findings,
      scans,
      audit_entries,
      apply_finding_action,
      append_scan
    }),
    [apply_finding_action, append_scan, audit_entries, findings, scans, selected_user_id]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function use_app_state() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("use_app_state must be used within AppStateProvider");
  }

  return context;
}

export const static_admin_data = {
  dashboard_stats,
  owner_summaries,
  reproducibility_snapshot,
  resource_intensity
};
