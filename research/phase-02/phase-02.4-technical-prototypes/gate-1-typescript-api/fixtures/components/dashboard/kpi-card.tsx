import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@components/ui/card";

export interface KpiCardProps {
  title: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  description?: string;
  onRefresh?: () => void;
}

export function KpiCard({ title, value, trend, description, onRefresh }: KpiCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {onRefresh && (
          <button onClick={onRefresh} className="text-xs text-blue-500 hover:underline">
            Refresh
          </button>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p className="text-xs text-muted-foreground mt-1">
            Trend: <span className={trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}>{trend}</span>
          </p>
        )}
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </CardContent>
    </Card>
  );
}
