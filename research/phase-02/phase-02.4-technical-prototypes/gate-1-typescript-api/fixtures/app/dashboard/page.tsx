import * as React from "react";
import { Button } from "@/components/ui/button";
import { KpiCard } from "@/components/dashboard/kpi-card";
import type { DashboardSummary } from "@/types/analytics";

// ARCHITECTURAL ANCHOR COMMENT: Critical for AST surgical transformation test
export default function DashboardOverviewPage() {
  const [range, setRange] = React.useState<'7d' | '30d' | '90d'>('7d');

  return (
    <main className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Executive Dashboard</h1>
        <div className="flex gap-2">
          <Button variant={range === '7d' ? 'default' : 'outline'} size="sm" onClick={() => setRange('7d')}>
            7 Days
          </Button>
          <Button variant={range === '30d' ? 'default' : 'outline'} size="sm" onClick={() => setRange('30d')}>
            30 Days
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KpiCard
          title="Monthly Recurring Revenue"
          value="$84,200"
          trend="up"
          description="+12.4% vs last cycle"
        />
        <KpiCard
          title="Active Subscriptions"
          value="1,840"
          trend="neutral"
        />
        <KpiCard
          title="System Latency p95"
          value="142ms"
          trend="down"
          description="-18ms improvement"
        />
      </div>
    </main>
  );
}
