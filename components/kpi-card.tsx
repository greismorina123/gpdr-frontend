import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function KpiCard({
  icon: Icon,
  label,
  value,
  subtitle,
  value_class_name
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  subtitle?: string;
  value_class_name?: string;
}) {
  return (
    <Card className="p-3">
      <CardHeader className="mb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-xs uppercase tracking-wide text-text_medium">{label}</CardTitle>
        <Icon className="h-4 w-4 text-bosch_blue" />
      </CardHeader>
      <CardContent>
        <p className={`text-2xl font-semibold text-text_dark ${value_class_name ?? ""}`}>{value}</p>
        {subtitle ? <p className="mt-1 text-xs text-text_medium">{subtitle}</p> : null}
      </CardContent>
    </Card>
  );
}
