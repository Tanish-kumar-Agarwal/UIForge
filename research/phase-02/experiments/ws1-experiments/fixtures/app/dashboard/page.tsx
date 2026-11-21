import * as React from "react";
import { KpiCard } from "@/components/dashboard/kpi-card";

// CRITICAL USER COMMENT: Don't remove this comment during automated refactor
// Authors: Lead Frontend Engineer
export default function DashboardPage() {
  // Local state for interactive filtering
  const [activeRange, setActiveRange] = React.useState("7d");

  return (
    <main className="p-8 space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <div className="text-sm text-gray-500">Range: {activeRange}</div>
      </header>

      {/* Primary KPI Grid Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KpiCard
          title="Total Revenue"
          value="$128,430" /* Formatted in USD */
          trend="up"
          description="+14.2% from last month"
        />
        <KpiCard
          title="Active Subscriptions"
          value="2,410"
          trend="neutral"
        />
        <KpiCard
          title="Churn Rate"
          value="1.2%"
          trend="down"
          description="-0.4% from average"
        />
      </section>
    </main>
  );
}
