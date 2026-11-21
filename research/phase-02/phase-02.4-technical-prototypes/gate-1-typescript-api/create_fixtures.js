const fs = require('fs');
const path = require('path');

const FIXTURES_DIR = path.join(__dirname, 'fixtures');

function createGate1Fixtures() {
  if (fs.existsSync(FIXTURES_DIR)) {
    fs.rmSync(FIXTURES_DIR, { recursive: true, force: true });
  }

  const dirs = [
    'components/ui',
    'components/dashboard',
    'lib',
    'types',
    'app/dashboard',
    'circular',
    'edge-cases'
  ];
  dirs.forEach(d => fs.mkdirSync(path.join(FIXTURES_DIR, d), { recursive: true }));

  // 1. Root tsconfig.json (with path aliases)
  fs.writeFileSync(path.join(FIXTURES_DIR, 'tsconfig.json'), JSON.stringify({
    compilerOptions: {
      target: "es2022",
      lib: ["dom", "dom.iterable", "esnext"],
      allowJs: true,
      skipLibCheck: true,
      strict: true,
      noEmit: true,
      esModuleInterop: true,
      module: "esnext",
      moduleResolution: "bundler",
      resolveJsonModule: true,
      isolatedModules: true,
      jsx: "react-jsx",
      baseUrl: ".",
      paths: {
        "@/*": ["./*"],
        "@components/*": ["components/*"],
        "@lib/*": ["lib/*"],
        "@types/*": ["types/*"]
      }
    },
    include: ["**/*.ts", "**/*.tsx", "**/*.d.ts"],
    exclude: ["node_modules", "edge-cases/malformed-syntax.tsx"]
  }, null, 2));

  // 2. Secondary tsconfig.build.json
  fs.writeFileSync(path.join(FIXTURES_DIR, 'tsconfig.build.json'), JSON.stringify({
    extends: "./tsconfig.json",
    compilerOptions: {
      noEmit: false,
      outDir: "./dist"
    },
    include: ["components/**/*", "lib/**/*"]
  }, null, 2));

  // 3. types/user.ts (Types & interfaces)
  fs.writeFileSync(path.join(FIXTURES_DIR, 'types/user.ts'), `/**
 * Core User entity interface definition.
 * Preserves JSDoc comments during AST surgery.
 */
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  avatarUrl?: string;
  createdAt: number;
}

export type UserRole = UserProfile['role'];
`);

  // 4. types/analytics.ts (Generic types & unions)
  fs.writeFileSync(path.join(FIXTURES_DIR, 'types/analytics.ts'), `import type { UserProfile } from './user';

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
`);

  // 5. types/global.d.ts (Ambient declaration)
  fs.writeFileSync(path.join(FIXTURES_DIR, 'types/global.d.ts'), `declare global {
  interface Window {
    __UIFORGE_ENV__: 'development' | 'production' | 'test';
  }
}

declare module 'react' {
  export const useState: any;
  export const forwardRef: any;
  export interface ButtonHTMLAttributes<T> {}
  export interface HTMLAttributes<T> {}
}

export {};
`);

  // 6. lib/utils.ts (Utility functions & unusual formatting)
  fs.writeFileSync(path.join(FIXTURES_DIR, 'lib/utils.ts'), `/* FORMATTING INVARIANT: Keep exact multiline indentation */
export function cn(
    ...inputs: (string | undefined | null | false)[]
): string {
  // Trim and join truthy tokens
  return inputs
    .filter(Boolean)
    .join(" ");
}

// Unicode math constants and identifiers
export const π = 3.141592653589793;
export const caféMenu = ['Espresso', 'Cortado', 'Cappuccino'] as const;
`);

  // 7. lib/data-fetcher.ts (Generic functions, dynamic imports)
  fs.writeFileSync(path.join(FIXTURES_DIR, 'lib/data-fetcher.ts'), `import type { MetricDataPoint } from '@/types/analytics';

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
`);

  // 8. components/ui/button.tsx (React component with comments and specific formatting)
  fs.writeFileSync(path.join(FIXTURES_DIR, 'components/ui/button.tsx'), `import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

/**
 * Accessible button component.
 * WARNING: Do not alter ref forwarding structure.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
          variant === 'default' && "bg-primary text-primary-foreground hover:bg-primary/90",
          variant === 'destructive' && "bg-destructive text-destructive-foreground hover:bg-destructive/90",
          size === 'default' && "h-10 px-4 py-2",
          size === 'sm' && "h-9 rounded-md px-3",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
`);

  // 9. components/ui/card.tsx (Card container with compound exports)
  fs.writeFileSync(path.join(FIXTURES_DIR, 'components/ui/card.tsx'), `import * as React from "react";
import { cn } from "@/lib/utils";

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("rounded-xl border bg-card text-card-foreground shadow", className)} {...props} />
  )
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("font-semibold leading-none tracking-tight", className)} {...props} />
  )
);
CardTitle.displayName = "CardTitle";

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";
`);

  // 10. components/dashboard/kpi-card.tsx (Domain component with props interface)
  fs.writeFileSync(path.join(FIXTURES_DIR, 'components/dashboard/kpi-card.tsx'), `import * as React from "react";
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
`);

  // 11. components/index.ts (Barrel re-export)
  fs.writeFileSync(path.join(FIXTURES_DIR, 'components/index.ts'), `// Barrel file re-exporting UI and domain components
export * from './ui/button';
export * from './ui/card';
export * from './dashboard/kpi-card';
`);

  // 12. app/dashboard/page.tsx (Next.js-like page with JSX, comments, state)
  fs.writeFileSync(path.join(FIXTURES_DIR, 'app/dashboard/page.tsx'), `import * as React from "react";
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
`);

  // 13. circular/circular-a.ts and circular/circular-b.ts (Circular module dependency)
  fs.writeFileSync(path.join(FIXTURES_DIR, 'circular/circular-a.ts'), `import { formatB } from './circular-b';

export function formatA(val: string): string {
  return "A[" + val + "]->" + (val.length > 5 ? "stop" : formatB(val + "."));
}
`);
  fs.writeFileSync(path.join(FIXTURES_DIR, 'circular/circular-b.ts'), `import { formatA } from './circular-a';

export function formatB(val: string): string {
  return "B(" + val + ")->" + (val.length > 5 ? "stop" : formatA(val + "!"));
}
`);

  // 14. edge-cases/scope-test.ts (Duplicate symbol names in different scopes)
  fs.writeFileSync(path.join(FIXTURES_DIR, 'edge-cases/scope-test.ts'), `export const status = "GLOBAL_ACTIVE";

export function getStatus(status: number): string {
  const innerStatus = status > 0 ? "POSITIVE" : "NON_POSITIVE";
  if (true) {
    const status = "BLOCK_SCOPED";
    return status + ":" + innerStatus;
  }
}
`);

  // 15. edge-cases/semantic-type-error.ts (Type error: string assigned to number)
  fs.writeFileSync(path.join(FIXTURES_DIR, 'edge-cases/semantic-type-error.ts'), `export interface StrictConfig {
  retries: number;
  timeoutMs: number;
}

export const badConfig: StrictConfig = {
  retries: "THREE" as any, // semantic mismatch
  timeoutMs: 5000
};

export const directTypeError: number = "THIS_IS_A_TYPE_ERROR";
`);

  // 16. edge-cases/malformed-syntax.tsx (Deliberately malformed file)
  fs.writeFileSync(path.join(FIXTURES_DIR, 'edge-cases/malformed-syntax.tsx'), `import * as React from 'react';

// MALFORMED FILE FOR PARSE ERROR HANDLING TEST
export function BrokenComponent( {
  return (
    <div>
      <h1>Unclosed tag
  );
}
`);

  console.log('GATE 1 FIXTURES CREATED SUCCESSFULLY: 16 files generated.');
}

createGate1Fixtures();
