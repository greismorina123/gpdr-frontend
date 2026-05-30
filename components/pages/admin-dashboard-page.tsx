import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileSearch,
  Gauge,
  HardDrive,
  Server
} from "lucide-react";
import { DocumentTypeBarChart } from "@/components/charts/document-type-bar-chart";
import { SensitivityChart } from "@/components/charts/sensitivity-chart";
import { KpiCard } from "@/components/kpi-card";
import { RecentScansCard } from "@/components/recent-scans-card";
import { ReproducibilityCard } from "@/components/reproducibility-card";
import { ResourceIntensityCard } from "@/components/resource-intensity-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { static_admin_data } from "@/context/app-state";
import { format_bytes_to_gb, format_number } from "@/lib/utils";

export function AdminDashboardPage() {
  const { dashboard_stats, reproducibility_snapshot, resource_intensity } = static_admin_data;

  const document_type_data = [
    { name: "Expense report", value: dashboard_stats.findings_by_document_type.expense_report },
    { name: "IT access request", value: dashboard_stats.findings_by_document_type.it_access_request },
    { name: "Incident report", value: dashboard_stats.findings_by_document_type.incident_report },
    { name: "Supplier onboarding", value: dashboard_stats.findings_by_document_type.supplier_onboarding },
    { name: "Training evaluation", value: dashboard_stats.findings_by_document_type.training_evaluation },
    { name: "Unknown", value: dashboard_stats.findings_by_document_type.unknown }
  ];

  const sensitivity_data = [
    { name: "High", value: dashboard_stats.findings_by_sensitivity.high },
    { name: "Medium", value: dashboard_stats.findings_by_sensitivity.medium },
    { name: "Low", value: dashboard_stats.findings_by_sensitivity.low }
  ];

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-text_dark">Data discovery overview</h1>
        <p className="mt-1 text-sm text-text_medium">Last scan completed 4 minutes ago - 1,247 files processed</p>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          icon={HardDrive}
          label="Total files scanned"
          value={format_number(dashboard_stats.total_files_scanned)}
          subtitle="across 3 sources"
        />
        <KpiCard
          icon={Server}
          label="Total data volume"
          value={format_bytes_to_gb(dashboard_stats.total_size_bytes)}
        />
        <KpiCard
          icon={AlertTriangle}
          label="Files flagged"
          value="89"
          value_class_name="text-bosch_red"
        />
        <KpiCard icon={FileSearch} label="Total findings" value={String(dashboard_stats.total_findings)} />
        <KpiCard icon={Gauge} label="Scan speed" value={`${dashboard_stats.scan_speed_files_per_sec} files/sec`} />
        <KpiCard icon={Clock} label="Avg file scan" value={`${format_number(dashboard_stats.avg_file_scan_ms)} ms`} />
        <KpiCard
          icon={CheckCircle}
          label="Detection precision"
          value={`${dashboard_stats.precision_pct}%`}
          subtitle={`F1: ${dashboard_stats.f1_score}`}
          value_class_name="text-success_green"
        />
        <KpiCard icon={Activity} label="Recall" value={`${dashboard_stats.recall_pct}%`} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Evaluation strip</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 md:grid-cols-2 xl:grid-cols-6 text-sm">
          <Metric label="Precision" value="94.2%" />
          <Metric label="Recall" value="87.0%" />
          <Metric label="F1 score" value="0.91" />
          <Metric label="Reproducibility" value="100%" />
          <Metric label="Resource load" value="21%" />
          <Metric label="Last result hash" value="b91e4c..." monospace />
        </CardContent>
      </Card>

      <div className="grid gap-3 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Findings by document type</CardTitle>
          </CardHeader>
          <CardContent>
            <DocumentTypeBarChart data={document_type_data} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sensitivity distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <SensitivityChart data={sensitivity_data} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-3 xl:grid-cols-[1.6fr_1fr]">
        <RecentScansCard recent_scans={dashboard_stats.recent_scans} />
        <div className="space-y-3">
          <ReproducibilityCard data={reproducibility_snapshot} />
          <ResourceIntensityCard data={resource_intensity} />
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value, monospace }: { label: string; value: string; monospace?: boolean }) {
  return (
    <div className="rounded-lg border border-border_grey bg-gray-50 px-3 py-2">
      <p className="text-xs uppercase tracking-wide text-text_medium">{label}</p>
      <p className={`${monospace ? "font-mono text-xs" : "text-base"} mt-1 font-semibold text-text_dark`}>
        {value}
      </p>
    </div>
  );
}
