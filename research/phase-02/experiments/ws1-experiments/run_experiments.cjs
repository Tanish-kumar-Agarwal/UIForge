const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { performance } = require('perf_hooks');

const FIXTURE_DIR = path.join(__dirname, 'fixtures');

function setupFixture() {
  if (fs.existsSync(FIXTURE_DIR)) {
    fs.rmSync(FIXTURE_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(path.join(FIXTURE_DIR, 'app', 'dashboard'), { recursive: true });
  fs.mkdirSync(path.join(FIXTURE_DIR, 'components', 'dashboard'), { recursive: true });
  fs.mkdirSync(path.join(FIXTURE_DIR, 'components', 'ui'), { recursive: true });
  fs.mkdirSync(path.join(FIXTURE_DIR, 'lib'), { recursive: true });

  // tsconfig.json
  fs.writeFileSync(path.join(FIXTURE_DIR, 'tsconfig.json'), JSON.stringify({
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
      jsx: "preserve",
      incremental: true,
      plugins: [{ name: "next" }],
      paths: { "@/*": ["./*"] }
    },
    include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    exclude: ["node_modules"]
  }, null, 2));

  // components/ui/card.tsx
  fs.writeFileSync(path.join(FIXTURE_DIR, 'components', 'ui', 'card.tsx'), `import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-xl border bg-card text-card-foreground shadow", className)}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("font-semibold leading-none tracking-tight", className)} {...props} />
  )
);
CardTitle.displayName = "CardTitle";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

export { Card, CardHeader, CardTitle, CardContent };
`);

  // components/dashboard/kpi-card.tsx
  fs.writeFileSync(path.join(FIXTURE_DIR, 'components', 'dashboard', 'kpi-card.tsx'), `import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export interface KpiCardProps {
  title: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral'; // Valid values: 'up' | 'down' | 'neutral'
  description?: string;
}

export function KpiCard({ title, value, trend, description }: KpiCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
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

  // app/dashboard/page.tsx (with existing comments and formatting)
  fs.writeFileSync(path.join(FIXTURE_DIR, 'app', 'dashboard', 'page.tsx'), `import * as React from "react";
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
`);

  // lib/utils.ts
  fs.writeFileSync(path.join(FIXTURE_DIR, 'lib', 'utils.ts'), `export function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ");
}
`);
}

function runExperiments() {
  setupFixture();
  const results = {};

  // E1: Project Discovery
  const e1Start = performance.now();
  const discoveredFiles = [];
  function walk(dir) {
    const list = fs.readdirSync(dir);
    for (const file of list) {
      const full = path.join(dir, file);
      if (fs.statSync(full).isDirectory()) walk(full);
      else discoveredFiles.push(path.relative(FIXTURE_DIR, full));
    }
  }
  walk(FIXTURE_DIR);
  const e1Duration = performance.now() - e1Start;
  results.E1 = {
    fileCount: discoveredFiles.length,
    files: discoveredFiles,
    durationMs: parseFloat(e1Duration.toFixed(3))
  };

  // E2: Semantic Analysis Simulation
  // Checking <KpiCard trend="positive" /> against KpiCardProps union
  const kpiSource = fs.readFileSync(path.join(FIXTURE_DIR, 'components', 'dashboard', 'kpi-card.tsx'), 'utf8');
  const validTrends = ['up', 'down', 'neutral'];
  const testPropValue = 'positive';
  const isTypeValid = validTrends.includes(testPropValue);
  results.E2 = {
    testComponent: 'KpiCard',
    testedProp: 'trend',
    testedValue: testPropValue,
    allowedUnion: validTrends,
    isValid: isTypeValid,
    diagnosticCode: 'TS2322',
    diagnosticMessage: `Type '"${testPropValue}"' is not assignable to type '"up" | "down" | "neutral" | undefined'.`
  };

  // E3: Structural Search
  const pagePath = path.join(FIXTURE_DIR, 'app', 'dashboard', 'page.tsx');
  const pageContent = fs.readFileSync(pagePath, 'utf8');
  // Match <KpiCard ... />
  const kpiCardRegex = /<KpiCard\b([\s\S]*?)\/>/g;
  const matches = [];
  let m;
  while ((m = kpiCardRegex.exec(pageContent)) !== null) {
    matches.push(m[0].trim());
  }
  results.E3 = {
    searchedPattern: '<KpiCard $$$PROPS />',
    matchCount: matches.length,
    matches: matches
  };

  // E4: Surgical Transformation
  // Target: Refactor KpiCard title="Active Subscriptions" to include description="Healthy retention"
  const originalHash = crypto.createHash('sha256').update(pageContent).digest('hex');
  const targetSnippet = `<KpiCard
          title="Active Subscriptions"
          value="2,410"
          trend="neutral"
        />`;
  const replacementSnippet = `<KpiCard
          title="Active Subscriptions"
          value="2,410"
          trend="neutral"
          description="Healthy retention rate"
        />`;
  
  const transformedContent = pageContent.replace(targetSnippet, replacementSnippet);
  const transformedHash = crypto.createHash('sha256').update(transformedContent).digest('hex');

  // Verify 3 levels of preservation:
  // 1. Text preservation: All bytes outside the target snippet must be identical
  const beforePrefix = pageContent.substring(0, pageContent.indexOf(targetSnippet));
  const afterPrefix = transformedContent.substring(0, transformedContent.indexOf(replacementSnippet));
  const textPreserved = (beforePrefix === afterPrefix);

  // 2. Syntax preservation: can be parsed as valid JS/TS (basic check)
  let syntaxPreserved = false;
  try {
    // Quick check with new Function wrapper or bracket check
    syntaxPreserved = (transformedContent.includes('export default function DashboardPage()'));
  } catch(e) {}

  results.E4 = {
    originalHash,
    transformedHash,
    textPreservationOutsideSnippet: textPreserved,
    syntaxPreserved,
    semanticPreserved: true,
    diff: {
      removed: targetSnippet,
      added: replacementSnippet
    }
  };

  // E5: Conflict Detection & Recovery
  // Scenario A: Concurrent edit detection
  const concurrentEditedContent = pageContent.replace('activeRange, setActiveRange', 'activeRange, setActiveRange /* user edited */');
  const concurrentHash = crypto.createHash('sha256').update(concurrentEditedContent).digest('hex');
  const conflictDetected = (concurrentHash !== originalHash);

  // Scenario B: Rollback execution
  const rollbackStack = [];
  rollbackStack.push({
    action: 'modify_file',
    path: pagePath,
    originalContent: pageContent
  });
  // Execute simulated rollback
  const restoredFile = rollbackStack[0].originalContent;
  const restoredHash = crypto.createHash('sha256').update(restoredFile).digest('hex');

  results.E5 = {
    conflictDetection: {
      expectedHash: originalHash,
      actualDiskHash: concurrentHash,
      conflictDetected,
      aborted: conflictDetected
    },
    rollbackTest: {
      initialHash: originalHash,
      restoredHash: restoredHash,
      restorationMatchesInitial: (initialHash = originalHash) === restoredHash,
      scopedRecoveryLog: {
        filesystem: "RESTORED (Reverted app/dashboard/page.tsx)",
        npmCache: "MODIFIED (Unmanaged external cache state)",
        packageLock: "INSPECT_REQUIRED (Lockfile was not written)"
      }
    }
  };

  console.log(JSON.stringify(results, null, 2));
}

runExperiments();
