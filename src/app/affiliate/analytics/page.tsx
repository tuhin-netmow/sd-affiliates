'use client';

import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  MousePointerClick,
  Users2,
  Building2,
  DollarSign,
  Percent,
} from 'lucide-react';
import { useAffiliateDemo } from '@/context/affiliate-demo-context';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/affiliate/calculations';
import { MetricCard } from '@/components/shared/metric-card';
import { MiniAreaChart, MiniBarChart } from '@/components/shared/metric-charts';

export default function AffiliateAnalyticsPage() {
  const { activeAffiliate } = useAffiliateDemo();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  const stats = activeAffiliate.stats;

  // Chart datasets depending on range
  const chartDatasets = {
    '7d': [
      { label: 'Mon', value: 42, value2: 6 },
      { label: 'Tue', value: 58, value2: 9 },
      { label: 'Wed', value: 65, value2: 11 },
      { label: 'Thu', value: 74, value2: 12 },
      { label: 'Fri', value: 92, value2: 16 },
      { label: 'Sat', value: 110, value2: 18 },
      { label: 'Sun', value: 128, value2: 22 },
    ],
    '30d': [
      { label: 'Week 1', value: 240, value2: 38 },
      { label: 'Week 2', value: 310, value2: 46 },
      { label: 'Week 3', value: 420, value2: 58 },
      { label: 'Week 4', value: 520, value2: 74 },
    ],
    '90d': [
      { label: 'Jan', value: 920, value2: 140 },
      { label: 'Feb', value: 1240, value2: 186 },
      { label: 'Mar', value: 1680, value2: 240 },
    ],
    '1y': [
      { label: 'Q1', value: 2100, value2: 320 },
      { label: 'Q2', value: 2800, value2: 410 },
      { label: 'Q3', value: 3600, value2: 530 },
      { label: 'Q4', value: 4800, value2: 710 },
    ],
  };

  const revenueData = [
    { label: 'Wk 1', value: 1450 },
    { label: 'Wk 2', value: 2890 },
    { label: 'Wk 3', value: 4620 },
    { label: 'Wk 4', value: 6890 },
    { label: 'Wk 5', value: stats.totalRevenue },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header & Range Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Traffic & Performance Analytics</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Deep dive into click conversion funnels, visitor demographics, and revenue attribution.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1.5 p-1 bg-muted/50 rounded-xl border border-border">
          {[
            { id: '7d', label: 'Last 7 Days' },
            { id: '30d', label: 'Last 30 Days' },
            { id: '90d', label: 'Last 90 Days' },
            { id: '1y', label: 'This Year' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTimeRange(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                timeRange === tab.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Matrix (7 metrics requested in tasks.md section 22) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        <MetricCard title="Clicks" value={formatNumber(stats.totalClicks)} icon={<MousePointerClick className="size-4" />} />
        <MetricCard title="Visitors" value={formatNumber(Math.round(stats.totalClicks * 0.72))} icon={<Users2 className="size-4" />} />
        <MetricCard title="Signups" value={formatNumber(stats.signups)} icon={<Building2 className="size-4" />} />
        <MetricCard title="Conversions" value={formatNumber(stats.paidCustomers)} icon={<TrendingUp className="size-4" />} />
        <MetricCard title="Conv Rate" value={formatPercent(stats.conversionRate)} icon={<Percent className="size-4" />} />
        <MetricCard title="Revenue" value={formatCurrency(stats.totalRevenue)} icon={<DollarSign className="size-4" />} />
        <MetricCard title="Commission" value={formatCurrency(stats.payableCommission + stats.totalEarned)} highlight={true} icon={<DollarSign className="size-4" />} />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-bold text-foreground">Traffic vs Signup Funnel</h4>
              <p className="text-xs text-muted-foreground">Clicks compared against accounts created</p>
            </div>
          </div>
          <MiniBarChart data={chartDatasets[timeRange]} height={240} barColor="#3B82F6" bar2Color="#10B981" />
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-bold text-foreground">Revenue Generated ($)</h4>
              <p className="text-xs text-muted-foreground">Cumulative customer subscription earnings</p>
            </div>
          </div>
          <MiniAreaChart data={revenueData} isCurrency={true} color="#10B981" height={240} />
        </div>
      </div>
    </div>
  );
}
