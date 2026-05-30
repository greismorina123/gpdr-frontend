import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api_endpoints, out_of_scope_items } from "@/lib/mock-data";

export function SystemContractPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-text_dark">System contract</h1>
        <p className="mt-1 text-sm text-text_medium">Backend-ready contract view for the frontend prototype.</p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Runtime settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-text_dark">
            <p>
              API base URL: <span className="font-mono">http://localhost:8000</span>
            </p>
            <p>Mock mode enabled</p>
            <p>Data model naming: snake_case</p>
            <p>IDs are strings</p>
            <p>Timestamps are ISO 8601 UTC with Z suffix</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Future fetch examples</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 font-mono text-xs text-text_dark">
            <p>fetch("http://localhost:8000/admin/dashboard")</p>
            <p>fetch("http://localhost:8000/admin/owners")</p>
            <p>fetch("http://localhost:8000/findings/by-user/u_001?status=pending")</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Endpoint contract</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
            {api_endpoints.map((endpoint) => (
              <div key={endpoint} className="rounded-lg border border-border_grey bg-gray-50 px-3 py-2">
                <p className="font-mono text-xs text-text_dark">{endpoint}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Out of scope</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-text_dark">
          {out_of_scope_items.map((item) => (
            <p key={item}>- {item}</p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
