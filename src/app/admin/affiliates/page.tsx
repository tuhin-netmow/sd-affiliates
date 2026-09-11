'use client';

import React from 'react';
import Link from 'next/link';
import {
  Users2,
  FileCheck2,
  MousePointerClick,
  UserPlus,
  Building2,
  Percent,
  TrendingUp,
  DollarSign,
  CreditCard,
  ShieldAlert,
  ArrowRight,
  Shield,
  Clock,
  Sparkles,
  Award,
} from 'lucide-react';
import { useAffiliateDemo } from '@/context/affiliate-demo-context';
import { formatCurrency, formatNumber, formatPercent, getTierBadgeClass } from '@/lib/affiliate/calculations';
import { MetricCard } from '@/components/shared/metric-card';
import { MiniAreaChart, MiniBarChart } from '@/components/shared/metric-charts';

export default function AdminDashboardPage() {
  const {
    affiliates,
    applications,
    customers,
    commissions,
    payouts,
    fraudCases,
  } = useAffiliateDemo();

  const totalAffiliates = affiliates.length;
  const activeAffiliates = affiliates.filter((a) => a.status === 'Active').length;
  const pendingApplications = applications.filter((a) => a.status === 'Pending').length;
  const totalClicks = affiliates.reduce((acc, a) => acc + a.stats.totalClicks, 0);
  const totalSignups = affiliates.reduce((acc, a) => acc + a.stats.signups, 0);
  const totalPaidCustomers = customers.filter((c) => c.subscriptionStatus === 'Active').length;
  const avgConversionRate = totalClicks > 0 ? totalPaidCustomers / totalClicks : 0.055;
  const totalReferralRevenue = affiliates.reduce((acc, a) => acc + a.stats.totalRevenue, 0);
  const totalCommissionGenerated = commissions.reduce((acc, c) => acc + (c.amount > 0 ? c.amount : 0), 0);
  const pendingPayoutsCount = payouts.filter((p) => p.status === 'Pending' || p.status === 'Approved').length;
  const activeFraudCases = fraudCases.filter((f) => f.status === 'Under Review').length;

  const revenueGrowthData = [
    { label: 'Oct', value: 24500 },
    { label: 'Nov', value: 38200 },
    { label: 'Dec', value: 49800 },
    { label: 'Jan', value: 64200 },
    { label: 'Feb', value: 89000 },
    { label: 'Mar', value: totalReferralRevenue || 112000 },
  ];

  const affiliateGrowthData = [
    { label: 'Oct', value: 8, value2: 32 },
    { label: 'Nov', value: 12, value2: 54 },
    { label: 'Dec', value: 16, value2: 78 },
    { label: 'Jan', value: 19, value2: 95 },
    { label: 'Feb', value: 22, value2: 120 },
    { label: 'Mar', value: totalAffiliates, value2: totalPaidCustomers },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Hero Admin Bar */}
      <div className="rounded-3xl bg-gradient-to-r from-[#27125B] via-[#431D80] to-[#8B14C2] p-6 sm:p-8 text-white shadow-xl shadow-[#27125B]/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-purple-100 border border-white/20">
            <Shield className="size-3.5" />
            <span>SquadDeck Master Admin</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Affiliate Ecosystem Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-purple-100/80 leading-relaxed">
            Manage partner applications, commission calculation rules, tiered payout approvals, and fraud monitoring.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/affiliates/applications"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold shadow-lg transition-all"
          >
            <FileCheck2 className="size-4" />
            {pendingApplications} Pending Applications
          </Link>
          <Link
            href="/admin/affiliates/payouts"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 backdrop-blur-md transition-all"
          >
            <CreditCard className="size-4" />
            Payouts Queue ({pendingPayoutsCount})
          </Link>
        </div>
      </div>

      {/* Primary KPI Grid (11 Metrics as requested in section 30 of tasks.md) */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
          Global Program Metrics
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Affiliates"
            value={formatNumber(totalAffiliates)}
            subtitle="Registered coaches & partners"
            icon={<Users2 className="size-4" />}
          />
          <MetricCard
            title="Active Affiliates"
            value={formatNumber(activeAffiliates)}
            change="+4 this mo"
            icon={<Users2 className="size-4" />}
          />
          <MetricCard
            title="Pending Applications"
            value={formatNumber(pendingApplications)}
            changeType="neutral"
            icon={<Clock className="size-4" />}
            subtitle="Awaiting admin approval"
          />
          <MetricCard
            title="Total Clicks"
            value={formatNumber(totalClicks)}
            change="+28.4%"
            icon={<MousePointerClick className="size-4" />}
          />
          <MetricCard
            title="Total Signups"
            value={formatNumber(totalSignups)}
            change="+19.2%"
            icon={<UserPlus className="size-4" />}
          />
          <MetricCard
            title="Paid Customers"
            value={formatNumber(totalPaidCustomers)}
            change="+14.0%"
            icon={<Building2 className="size-4" />}
          />
          <MetricCard
            title="Conversion Rate"
            value={formatPercent(avgConversionRate)}
            change="+0.8%"
            icon={<Percent className="size-4" />}
          />
          <MetricCard
            title="Referral Revenue"
            value={formatCurrency(totalReferralRevenue)}
            change="+31.5%"
            highlight={true}
            icon={<TrendingUp className="size-4" />}
          />
          <MetricCard
            title="Total Commission"
            value={formatCurrency(totalCommissionGenerated)}
            icon={<DollarSign className="size-4" />}
          />
          <MetricCard
            title="Pending Payouts"
            value={formatNumber(pendingPayoutsCount)}
            changeType="neutral"
            icon={<CreditCard className="size-4" />}
          />
          <MetricCard
            title="Active Fraud Cases"
            value={formatNumber(activeFraudCases)}
            changeType="negative"
            icon={<ShieldAlert className="size-4" />}
          />
          <MetricCard
            title="Attribution Window"
            value="90 Days"
            subtitle="Last Touch eligible affiliate"
            icon={<Sparkles className="size-4" />}
          />
        </div>
      </div>

      {/* Global Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-bold text-foreground">Global Referral Revenue ($)</h4>
              <p className="text-xs text-muted-foreground">Monthly subscription spend generated by affiliates</p>
            </div>
          </div>
          <MiniAreaChart data={revenueGrowthData} isCurrency={true} color="#8B14C2" height={220} />
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-bold text-foreground">Affiliate Recruitment vs Paying Clubs</h4>
              <p className="text-xs text-muted-foreground">Monthly growth comparison</p>
            </div>
          </div>
          <MiniBarChart data={affiliateGrowthData} height={220} barColor="#27125B" bar2Color="#8B14C2" label1="Affiliates" label2="Paid Clubs" />
        </div>
      </div>

      {/* Pending Applications & Recent Flagged Fraud Quick Review */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Applications Box */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-border">
              <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                <FileCheck2 className="size-4 text-amber-500" />
                Applications Awaiting Review
              </h4>
              <Link href="/admin/affiliates/applications" className="text-xs font-semibold text-[#8B14C2] hover:underline flex items-center gap-1">
                View All <ArrowRight className="size-3" />
              </Link>
            </div>

            <div className="space-y-3">
              {applications.slice(0, 4).map((app) => (
                <div key={app.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/60">
                  <div>
                    <h5 className="text-xs font-bold text-foreground">{app.applicantName}</h5>
                    <p className="text-[11px] text-muted-foreground">{app.company} • {app.country}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    app.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-emerald-50 text-emerald-700'
                  }`}>
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* High Risk Fraud Alerts */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-border">
              <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                <ShieldAlert className="size-4 text-rose-500" />
                Flagged Fraud & Risk Alerts
              </h4>
              <Link href="/admin/affiliates/fraud" className="text-xs font-semibold text-[#8B14C2] hover:underline flex items-center gap-1">
                Fraud Center <ArrowRight className="size-3" />
              </Link>
            </div>

            <div className="space-y-3">
              {fraudCases.slice(0, 4).map((fraud) => (
                <div key={fraud.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/60">
                  <div>
                    <h5 className="text-xs font-bold text-foreground">{fraud.type}</h5>
                    <p className="text-[11px] text-muted-foreground">{fraud.affiliateName} • {fraud.flaggedDate}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    fraud.riskScore === 'Critical' || fraud.riskScore === 'High'
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    {fraud.riskScore} Risk
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
