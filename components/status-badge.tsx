import { Badge } from "@/components/ui/badge";
import { format_review_status } from "@/lib/utils";

type StatusKind =
  | "pending"
  | "confirmed_business_need"
  | "acknowledged_cleanup"
  | "high"
  | "medium"
  | "low"
  | "running"
  | "completed"
  | "failed"
  | "direct"
  | "master_of_data";

export function StatusBadge({ value }: { value: StatusKind }) {
  let class_name = "bg-gray-100 text-gray-700";

  if (value === "pending") {
    class_name = "bg-warning_yellow/20 text-amber-900";
  } else if (value === "confirmed_business_need") {
    class_name = "bg-bosch_blue/10 text-bosch_blue";
  } else if (value === "acknowledged_cleanup") {
    class_name = "bg-success_green/15 text-success_green";
  } else if (value === "high") {
    class_name = "bg-bosch_red/15 text-bosch_red";
  } else if (value === "medium") {
    class_name = "bg-warning_yellow/20 text-amber-900";
  } else if (value === "low") {
    class_name = "bg-success_green/15 text-success_green";
  } else if (value === "running") {
    class_name = "bg-process_cyan/15 text-bosch_blue";
  } else if (value === "completed") {
    class_name = "bg-success_green/15 text-success_green";
  } else if (value === "failed") {
    class_name = "bg-bosch_red/15 text-bosch_red";
  } else if (value === "master_of_data") {
    class_name = "bg-master_purple/15 text-master_purple";
  }

  return <Badge className={class_name}>{format_review_status(value)}</Badge>;
}
