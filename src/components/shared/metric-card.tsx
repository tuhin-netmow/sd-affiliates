import React from 'react';
import { ArrowUpRight, ArrowDownRight, Info } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  subtitle?: string;
  icon?: React.ReactNode;
  tooltip?: string;
  highlight?: boolean;
}

export function MetricCard({
  title,
  value,
  change,
  changeType = 'positive',
  subtitle,
  icon,
  tooltip,
  highlight = false,
}: MetricCardProps) {
  return (
    <div
      className={`rounded-2xl border p-5 transition-all duration-200 shadow-sm ${
        highlight
          ? 'bg-gradient-to-br from-[#8B14C2]/10 via-[#27125B]/5 to-transparent border-[#8B14C2]/30'
          : 'bg-card text-card-foreground border-border hover:border-zinc-300 dark:hover:border-zinc-700'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</span>
          {tooltip && (
            <span title={tooltip} className="cursor-help text-muted-foreground/60 hover:text-foreground">
              <Info className="size-3.5" />
            </span>
          )}
        </div>
        {icon && <div className="text-muted-foreground p-2 rounded-xl bg-muted/60">{icon}</div>}
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-bold tracking-tight text-foreground">{value}</span>
        {change && (
          <span
            className={`inline-flex items-center text-xs font-semibold px-1.5 py-0.5 rounded-md ${
              changeType === 'positive'
                ? 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-300'
                : changeType === 'negative'
                ? 'text-rose-700 bg-rose-50 dark:bg-rose-950/60 dark:text-rose-300'
                : 'text-zinc-600 bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-300'
            }`}
          >
            {changeType === 'positive' ? (
              <ArrowUpRight className="size-3 mr-0.5" />
            ) : changeType === 'negative' ? (
              <ArrowDownRight className="size-3 mr-0.5" />
            ) : null}
            {change}
          </span>
        )}
      </div>

      {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
