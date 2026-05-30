"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/status-badge";
import { use_app_state } from "@/context/app-state";
import { format_timestamp } from "@/lib/utils";

export function AuditLogPage() {
  const { audit_entries } = use_app_state();

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-text_dark">Audit log</h1>
        <p className="mt-1 text-sm text-text_medium">Traceability of human review actions and outcomes.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Review actions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Finding ID</TableHead>
                <TableHead>File name</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Review note</TableHead>
                <TableHead>Resulting status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {audit_entries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="text-xs">{format_timestamp(entry.timestamp)}</TableCell>
                  <TableCell className="font-mono text-xs">{entry.finding_id}</TableCell>
                  <TableCell>{entry.file_name}</TableCell>
                  <TableCell>{entry.user}</TableCell>
                  <TableCell>{entry.action}</TableCell>
                  <TableCell className="text-text_medium">{entry.review_note}</TableCell>
                  <TableCell>
                    <StatusBadge value={entry.resulting_status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Policy</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-text_dark">
          The system suggests classifications and retention recommendations. Final review and cleanup decisions
          remain with the responsible user or Master of Data.
        </CardContent>
      </Card>
    </div>
  );
}
