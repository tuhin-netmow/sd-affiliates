'use client';

import React from 'react';
import Link from 'next/link';
import {
  DollarSign,
  Clock,
  CheckCircle2,
  SendHorizontal,
  CreditCard,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Info,
} from 'lucide-react';
import { useAffiliateDemo } from '@/context/affiliate-demo-context';
import { formatCurrency } from '@/lib/affiliate/calculations';
import { MetricCard } from '@/components/shared/metric-card';

export default function AffiliateEarningsPage() {
  const { activeAffiliate } = useAffiliateDemo();
  const stats = activeAffiliate.stats;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Earnings & Balance Breakdown</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Transparent breakdown of your earned, approved, payable, and paid out commissions.
          </p>
        </div>

        <Link
          href="/affiliate/payouts"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all self-start sm:self-auto"
        >
          <CreditCard className="size-4" />
          Withdraw Funds
        </Link>
      </div>

      {/* Main Balance Hero Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Current Withdrawable Balance
          </span>
          <div className="text-4xl sm:text-5xl font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight">
            {formatCurrency(stats.currentBalance)}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Minimum threshold for payout is $50.00. Automatic transfers processed on the 1st of every month.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-muted/40 border border-border/80 flex flex-col gap-2 min-w-[240px]">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Payout Method</span>
            <span className="font-semibold text-foreground">{activeAffiliate.payoutMethod}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Destination</span>
            <span className="font-mono text-foreground text-[11px] truncate max-w-[140px]">
              {activeAffiliate.payoutDetails}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs pt-1 border-t border-border">
            <span className="text-muted-foreground">Next Cycle</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">Apr 1, 2026</span>
          </div>
        </div>
      </div>

      {/* 6 Lifecycle Stage KPI Cards */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
          Earnings Breakdown by Status
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <MetricCard
            title="Lifetime Total"
            value={formatCurrency(stats.totalEarned + stats.payableCommission + stats.pendingCommission)}
            icon={<DollarSign className="size-4" />}
          />
          <MetricCard
            title="Pending"
            value={formatCurrency(stats.pendingCommission)}
            icon={<Clock className="size-4" />}
          />
          <MetricCard
            title="Approved"
            value={formatCurrency(stats.pendingCommission * 0.6)}
            icon={<CheckCircle2 className="size-4" />}
          />
          <MetricCard
            title="Payable"
            value={formatCurrency(stats.payableCommission)}
            highlight={true}
            icon={<SendHorizontal className="size-4" />}
          />
          <MetricCard
            title="Paid Out"
            value={formatCurrency(stats.totalEarned)}
            icon={<CreditCard className="size-4" />}
          />
          <MetricCard
            title="Reversed"
            value={formatCurrency(12.25)}
            changeType="negative"
            icon={<RotateCcw className="size-4" />}
          />
        </div>
      </div>

      {/* Explanatory Guide Section (tasks.md Section 20 Requirement) */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
        <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Info className="size-4 text-blue-500" />
          Understanding Commission Statuses
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40">
            <span className="font-bold text-xs text-amber-800 dark:text-amber-300">1. Pending</span>
            <p className="text-xs text-amber-900/80 dark:text-amber-300/80 mt-1 leading-relaxed">
              Commission is generated upon subscription payment and is waiting for automated anti-fraud validation.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40">
            <span className="font-bold text-xs text-blue-800 dark:text-blue-300">2. Approved</span>
            <p className="text-xs text-blue-900/80 dark:text-blue-300/80 mt-1 leading-relaxed">
              Commission has been validated. It stays in clearance holding for the 30-day refund window.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40">
            <span className="font-bold text-xs text-emerald-800 dark:text-emerald-300">3. Payable</span>
            <p className="text-xs text-emerald-900/80 dark:text-emerald-300/80 mt-1 leading-relaxed">
              Holding period has passed. Commission is immediately available for affiliate withdrawal.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/40">
            <span className="font-bold text-xs text-purple-800 dark:text-purple-300">4. Paid</span>
            <p className="text-xs text-purple-900/80 dark:text-purple-300/80 mt-1 leading-relaxed">
              Commission funds have been successfully transferred to your PayPal, Stripe, or bank account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
