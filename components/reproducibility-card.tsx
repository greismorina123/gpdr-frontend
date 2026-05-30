import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReproducibilitySnapshot } from "@/types/models";
import { StatusBadge } from "@/components/status-badge";

export function ReproducibilityCard({ data }: { data: ReproducibilitySnapshot }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reproducibility</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm text-text_medium">Last full scan result hash</p>
          <p className="font-mono text-xs text-text_dark">{data.last_full_scan_hash}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-text_medium">Previous full scan result hash</p>
          <p className="font-mono text-xs text-text_dark">{data.previous_full_scan_hash}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-text_medium">Matching status</p>
          <StatusBadge value={data.matching_status === "Match" ? "completed" : "failed"} />
        </div>
        <p className="pt-2 text-sm text-text_dark">{data.explanation}</p>
      </CardContent>
    </Card>
  );
}
