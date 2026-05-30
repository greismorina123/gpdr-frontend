import { Badge } from "@/components/ui/badge";

export function EntityBadge({ type }: { type: string }) {
  return <Badge className="bg-slate-100 text-slate-800">{type}</Badge>;
}
