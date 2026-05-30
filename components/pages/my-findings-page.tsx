"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FindingDetailPanel } from "@/components/finding-detail-panel";
import { StatusBadge } from "@/components/status-badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { use_app_state } from "@/context/app-state";
import { format_document_type, format_timestamp } from "@/lib/utils";

export function MyFindingsPage() {
  const { users, selected_user_id, findings, apply_finding_action } = use_app_state();
  const [selected_finding_id, set_selected_finding_id] = useState<string | null>(null);

  const selected_user = useMemo(
    () => users.find((user) => user.id === selected_user_id) ?? users[0],
    [selected_user_id, users]
  );

  const my_findings = useMemo(() => {
    return findings.filter((finding) => {
      if (finding.owner_user_id === selected_user_id) {
        return true;
      }

      if (selected_user.is_master_of_data && finding.master_of_data_id === selected_user_id) {
        return true;
      }

      return false;
    });
  }, [findings, selected_user.is_master_of_data, selected_user_id]);

  useEffect(() => {
    if (my_findings.length === 0) {
      set_selected_finding_id(null);
      return;
    }

    const still_exists = my_findings.some((finding) => finding.id === selected_finding_id);
    if (!still_exists) {
      set_selected_finding_id(my_findings[0].id);
    }
  }, [my_findings, selected_finding_id]);

  const selected_finding = useMemo(
    () => my_findings.find((finding) => finding.id === selected_finding_id) ?? null,
    [my_findings, selected_finding_id]
  );

  const pending_reviews = my_findings.filter((finding) => finding.review_status === "pending").length;
  const high_sensitivity = my_findings.filter((finding) => finding.sensitivity_level === "high").length;
  const medium_sensitivity = my_findings.filter((finding) => finding.sensitivity_level === "medium").length;
  const confirmed_business_need = my_findings.filter(
    (finding) => finding.review_status === "confirmed_business_need"
  ).length;
  const cleanup_acknowledged = my_findings.filter(
    (finding) => finding.review_status === "acknowledged_cleanup"
  ).length;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-text_dark">My flagged files</h1>
        <p className="mt-1 text-sm text-text_medium">
          Review files you own or are responsible for. The scanner suggests actions, but you have the final
          word.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        <SummaryCard title="Pending reviews" value={pending_reviews} accent="text-bosch_red" />
        <SummaryCard title="High sensitivity" value={high_sensitivity} accent="text-bosch_red" />
        <SummaryCard title="Medium sensitivity" value={medium_sensitivity} accent="text-amber-700" />
        <SummaryCard title="Confirmed business need" value={confirmed_business_need} accent="text-bosch_blue" />
        <SummaryCard title="Cleanup acknowledged" value={cleanup_acknowledged} accent="text-success_green" />
      </div>

      {my_findings.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-lg font-semibold text-text_dark">No findings assigned to {selected_user.name}</p>
            <p className="mt-2 text-sm text-text_medium">
              Try switching to Sara Hoffmann (`u_001`) to review the primary demo workflow.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3 xl:grid-cols-[1.45fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Findings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-[72vh] overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>File name</TableHead>
                      <TableHead>Document type</TableHead>
                      <TableHead>Sensitivity</TableHead>
                      <TableHead className="text-right">Entity count</TableHead>
                      <TableHead>Scan timestamp</TableHead>
                      <TableHead>Review status</TableHead>
                      <TableHead>Retention recommendation</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {my_findings.map((finding) => {
                      const active = finding.id === selected_finding_id;

                      return (
                        <TableRow
                          key={finding.id}
                          className={active ? "bg-bosch_red/5" : "cursor-pointer hover:bg-gray-50"}
                          onClick={() => set_selected_finding_id(finding.id)}
                        >
                          <TableCell className="font-medium">{finding.file_name}</TableCell>
                          <TableCell>{format_document_type(finding.document_type)}</TableCell>
                          <TableCell>
                            <StatusBadge value={finding.sensitivity_level} />
                          </TableCell>
                          <TableCell className="text-right">{finding.entities.length}</TableCell>
                          <TableCell className="text-xs">{format_timestamp(finding.scan_timestamp)}</TableCell>
                          <TableCell>
                            <StatusBadge value={finding.review_status} />
                          </TableCell>
                          <TableCell className="text-xs text-text_medium">{finding.retention_recommendation}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <FindingDetailPanel
            finding={selected_finding}
            on_apply_action={(finding_id, review_status, review_note) => {
              // TODO backend integration: POST /findings/{finding_id}/action
              apply_finding_action({ finding_id, review_status, review_note });
            }}
          />
        </div>
      )}
    </div>
  );
}

function SummaryCard({ title, value, accent }: { title: string; value: number; accent?: string }) {
  return (
    <Card className="p-3">
      <p className="text-xs uppercase tracking-wide text-text_medium">{title}</p>
      <p className={`mt-1 text-2xl font-semibold ${accent ?? "text-text_dark"}`}>{value}</p>
    </Card>
  );
}
