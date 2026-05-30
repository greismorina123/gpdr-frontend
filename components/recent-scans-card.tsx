import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DashboardStats } from "@/types/models";

export function RecentScansCard({ recent_scans }: { recent_scans: DashboardStats["recent_scans"] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent scans</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>scan_id</TableHead>
              <TableHead>scan_type</TableHead>
              <TableHead>completed_at</TableHead>
              <TableHead className="text-right">duration</TableHead>
              <TableHead className="text-right">processed</TableHead>
              <TableHead className="text-right">skipped</TableHead>
              <TableHead className="text-right">findings</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recent_scans.map((scan) => (
              <TableRow key={scan.id}>
                <TableCell className="font-mono text-xs">{scan.id}</TableCell>
                <TableCell>{scan.scan_type ?? "full"}</TableCell>
                <TableCell className="font-mono text-xs">{scan.completed_at}</TableCell>
                <TableCell className="text-right">{scan.duration_sec}s</TableCell>
                <TableCell className="text-right">{scan.files_processed}</TableCell>
                <TableCell className="text-right">{scan.files_skipped ?? 0}</TableCell>
                <TableCell className="text-right">{scan.findings_count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
