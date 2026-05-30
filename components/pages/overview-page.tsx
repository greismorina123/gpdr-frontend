import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { architecture_strip_steps, overview_summary_items, what_demo_proves } from "@/lib/mock-data";

export function OverviewPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-text_dark">GDPR data discovery overview</h1>
        <p className="mt-1 text-sm text-text_medium">
          Find, classify, and route GDPR-relevant data across OneDrive, SharePoint, file shares, and local
          folders.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {overview_summary_items.map((item) => (
          <Card key={item.title} className="p-3">
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text_medium">{item.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>What the demo proves</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-4">
            {what_demo_proves.map((item) => (
              <div key={item} className="rounded-lg border border-border_grey bg-gray-50 px-3 py-2 text-sm text-text_dark">
                {item}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Architecture strip</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-2">
            {architecture_strip_steps.map((step, index) => (
              <div key={step} className="flex items-center gap-2">
                <span className="rounded-md border border-border_grey bg-gray-50 px-3 py-1 text-xs text-text_dark">
                  {step}
                </span>
                {index < architecture_strip_steps.length - 1 ? (
                  <span className="text-xs text-text_medium">-&gt;</span>
                ) : null}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
