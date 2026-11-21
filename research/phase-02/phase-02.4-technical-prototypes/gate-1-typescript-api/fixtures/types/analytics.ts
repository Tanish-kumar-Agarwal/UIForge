import type { UserProfile } from './user';

export interface MetricDataPoint<TValue = number> {
  timestamp: string;
  metricName: string;
  value: TValue;
  tags?: Record<string, string>;
}

export interface DashboardSummary {
  totalRevenue: number;
  activeUsers: number;
  churnRate: number;
  topContributor: UserProfile;
}
