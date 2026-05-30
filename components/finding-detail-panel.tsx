"use client";

import { useEffect, useMemo, useState } from "react";
import { Finding } from "@/types/models";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EntityTable } from "@/components/entity-table";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "@/components/status-badge";
import { Textarea } from "@/components/ui/textarea";
import { format_document_type, format_timestamp } from "@/lib/utils";

export function FindingDetailPanel({
  finding,
  on_apply_action
}: {
  finding: Finding | null;
  on_apply_action: (
    finding_id: string,
    review_status: "confirmed_business_need" | "acknowledged_cleanup",
    review_note: string
  ) => void;
}) {
  const [review_note, set_review_note] = useState("");

  useEffect(() => {
    set_review_note(finding?.review_note ?? "");
  }, [finding?.id, finding?.review_note]);

  const note_is_valid = useMemo(() => review_note.trim().length > 0, [review_note]);

  if (!finding) {
    return (
      <Card className="h-full">
        <CardContent className="flex h-full items-center justify-center text-center text-sm text-text_medium">
          Select a finding to view details.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Finding detail</CardTitle>
        <p className="text-xs text-text_medium">
          The system does not automatically delete files. The responsible user confirms whether the data is
          still needed or acknowledges cleanup.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <p className="text-text_medium">file_name</p>
          <p className="font-medium text-text_dark">{finding.file_name}</p>
          <p className="text-text_medium">file_path</p>
          <p className="font-mono text-xs text-text_dark">{finding.file_path}</p>
          <p className="text-text_medium">file_sha256</p>
          <p className="font-mono text-xs text-text_dark">{finding.file_sha256}</p>
          <p className="text-text_medium">document_type</p>
          <p className="text-text_dark">{format_document_type(finding.document_type)}</p>
          <p className="text-text_medium">sensitivity_level</p>
          <p>
            <StatusBadge value={finding.sensitivity_level} />
          </p>
          <p className="text-text_medium">owner_name</p>
          <p>{finding.owner_name}</p>
          <p className="text-text_medium">owner_type</p>
          <p>
            <StatusBadge value={finding.owner_type} />
          </p>
          <p className="text-text_medium">master_of_data_id</p>
          <p className="font-mono text-xs">{finding.master_of_data_id ?? "null"}</p>
          <p className="text-text_medium">scan_timestamp</p>
          <p className="text-xs">{format_timestamp(finding.scan_timestamp)}</p>
          <p className="text-text_medium">review_status</p>
          <p>
            <StatusBadge value={finding.review_status} />
          </p>
        </div>

        <Separator />

        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-text_medium">Reasoning</p>
          <p className="text-sm text-text_dark">{finding.reasoning}</p>
        </div>

        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-text_medium">
            Retention recommendation
          </p>
          <p className="text-sm text-text_dark">{finding.retention_recommendation}</p>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text_medium">Entities</p>
          <EntityTable entities={finding.entities} />
        </div>

        <div className="rounded-lg border border-border_grey bg-gray-100 p-4">
          <p className="text-sm text-text_medium">
            PDF preview placeholder. In the real app this uses GET /files/{file_id}/preview.
          </p>
        </div>

        <Separator />

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-text_medium">Review note</p>
          <Textarea
            placeholder="Add context before applying review action"
            value={review_note}
            onChange={(event) => set_review_note(event.target.value)}
          />
          <div className="flex gap-2">
            <Button
              variant="secondary"
              disabled={!note_is_valid}
              onClick={() => on_apply_action(finding.id, "confirmed_business_need", review_note.trim())}
            >
              Confirm business need
            </Button>
            <Button
              variant="outline"
              disabled={!note_is_valid}
              onClick={() => on_apply_action(finding.id, "acknowledged_cleanup", review_note.trim())}
            >
              Acknowledge cleanup
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
