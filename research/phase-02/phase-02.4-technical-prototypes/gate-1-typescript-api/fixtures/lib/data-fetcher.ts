import type { MetricDataPoint } from '@/types/analytics';

export async function fetchMetric<T = number>(endpoint: string): Promise<MetricDataPoint<T>> {
  // Dynamic import test
  const utils = await import('@/lib/utils');
  const now = new Date().toISOString();
  return {
    timestamp: now,
    metricName: endpoint,
    value: 42 as unknown as T,
    tags: { env: 'prototype' }
  };
}
