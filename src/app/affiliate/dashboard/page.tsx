'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  MousePointerClick,
  UserPlus,
  Building2,
  Percent,
  DollarSign,
  Clock,
  CheckCircle2,
  TrendingUp,
  Link2,
  CreditCard,
  FolderDown,
  Award,
  ArrowRight,
  Sparkles,
  Plus,
  Share2,
} from 'lucide-react';
import { useAffiliateDemo } from '@/context/affiliate-demo-context';
import { formatCurrency, formatNumber, formatPercent, getTierBadgeClass, getCommissionStatusBadge, getReferralStatusBadge } from '@/lib/affiliate/calculations';
import { MetricCard } from '@/components/shared/metric-card';
import { MiniAreaChart, MiniBarChart } from '@/components/shared/metric-charts';
import { ExplanatoryCallout } from '@/components/shared/explanatory-callout';
import { OnboardingChecklist } from '@/components/affiliate/onboarding-checklist';
import { OnboardingWizard } from '@/components/affiliate/onboarding-wizard';

function OnboardingParamHandler() {
  const searchParams = useSearchParams();
  const { openOnboarding } = useAffiliateDemo();

  useEffect(() => {
    if (searchParams.get('onboarding') === 'true') {
      openOnboarding();
    }
  }, [searchParams, openOnboarding]);

  return null;
}

export default function AffiliateDashboard() {
  const {
    activeAffiliate,
    referrals,
    commissions,
    referralLinks,
    simulateAddDemoCustomer,
    createReferralLink,
    openOnboarding,
  } = useAffiliateDemo();

  const [isCreateLinkOpen, setIsCreateLinkOpen] = useState(false);
  const [newLinkName, setNewLinkName] = useState('');
  const [newLinkCode, setNewLinkCode] = useState('');

  const stats = activeAffiliate.stats;

  // Chart data
  const revenueChartData = [
    { label: 'Oct', value: 1240 },
    { label: 'Nov', value: 1890 },
    { label: 'Dec', value: 2450 },
    { label: 'Jan', value: 3100 },
    { label: 'Feb', value: 5200 },
    { label: 'Mar', value: stats.totalRevenue },
  ];

  const clicksSignupsData = [
    { label: 'Mon', value: 42, value2: 6 },
    { label: 'Tue', value: 58, value2: 9 },
    { label: 'Wed', value: 65, value2: 11 },
    { label: 'Thu', value: 74, value2: 12 },
    { label: 'Fri', value: 92, value2: 16 },
    { label: 'Sat', value: 110, value2: 18 },
    { label: 'Sun', value: 128, value2: 22 },
  ];

  const handleCreateLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLinkName || !newLinkCode) return;
    createReferralLink({
      name: newLinkName,
      code: newLinkCode.toUpperCase(),
      affiliateId: activeAffiliate.id,
    });
    setNewLinkName('');
    setNewLinkCode('');
    setIsCreateLinkOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <Suspense fallback={null}>
        <OnboardingParamHandler />
      </Suspense>

      {/* Top Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#27125B] via-[#431D80] to-[#8B14C2] p-6 sm:p-8 text-white shadow-xl shadow-[#27125B]/20">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-emerald-100 border border-white/20">
              <Sparkles className="size-3.5" />
              <span>SquadDeck Certified Partner</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {activeAffiliate.name}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-50 leading-relaxed">
              Track your sports club referrals, view real-time commission earnings, and withdraw your funds.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => openOnboarding()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#27125B] text-xs font-extrabold shadow-lg shadow-black/10 hover:bg-purple-50 active:scale-95 transition-all"
            >
              <Sparkles className="size-4 text-[#8B14C2]" />
              Start Onboarding Tour
            </button>
            <button
              onClick={() => setIsCreateLinkOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold border border-white/20 backdrop-blur-md active:scale-95 transition-all"
            >
              <Plus className="size-4" />
              Create Link
            </button>
          </div>
        </div>

        {/* Decorative background blur circles */}
        <div className="absolute -top-12 -right-12 size-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-12 size-64 rounded-full bg-teal-400/20 blur-3xl pointer-events-none" />
      </div>

      {/* Onboarding Checklist Card */}
      <OnboardingChecklist />

      {/* Explanatory callout for client understanding */}
      <ExplanatoryCallout
        title="SquadDeck Affiliate Attribution"
        description="When coaches, athletic directors, or sports club organizers click your referral link, attribution is cookied for 90 days. You receive recurring monthly commissions for the lifetime of their paid subscription."
        variant="tip"
      />

      {/* Primary KPI Grid (8 Cards as requested in tasks.md section 12) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Performance Overview</h3>
          <span className="text-xs text-muted-foreground">Live Mock State</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Clicks"
            value={formatNumber(stats.totalClicks)}
            change="+18.4%"
            icon={<MousePointerClick className="size-4" />}
            subtitle="Across all campaigns & links"
          />
          <MetricCard
            title="Signups"
            value={formatNumber(stats.signups)}
            change="+12.1%"
            icon={<UserPlus className="size-4" />}
            subtitle="Free sports accounts created"
          />
          <MetricCard
            title="Paid Customers"
            value={formatNumber(stats.paidCustomers)}
            change="+8.5%"
            icon={<Building2 className="size-4" />}
            subtitle="Active Starter & Pro clubs"
          />
          <MetricCard
            title="Conversion Rate"
            value={formatPercent(stats.conversionRate)}
            change="+1.2%"
            icon={<Percent className="size-4" />}
            subtitle="Clicks to paid customer ratio"
          />
          <MetricCard
            title="Revenue Generated"
            value={formatCurrency(stats.totalRevenue)}
            change="+24.0%"
            icon={<TrendingUp className="size-4" />}
            subtitle="Total customer spend referred"
          />
          <MetricCard
            title="Pending Commission"
            value={formatCurrency(stats.pendingCommission)}
            changeType="neutral"
            icon={<Clock className="size-4" />}
            subtitle="Awaiting clearance period"
          />
          <MetricCard
            title="Payable Commission"
            value={formatCurrency(stats.payableCommission)}
            highlight={true}
            icon={<CheckCircle2 className="size-4" />}
            subtitle="Ready for withdrawal"
          />
          <MetricCard
            title="Total Earned"
            value={formatCurrency(stats.totalEarned)}
            change="+32.0%"
            icon={<DollarSign className="size-4" />}
            subtitle="Lifetime payout disbursements"
          />
        </div>
      </div>

      {/* Tier Progress & Quick Actions Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tier Progression */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-foreground">Current Tier:</span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${getTierBadgeClass(activeAffiliate.tier)}`}>
                  {activeAffiliate.tier} Tier ({activeAffiliate.tier === 'Bronze' ? '20%' : activeAffiliate.tier === 'Silver' ? '25%' : activeAffiliate.tier === 'Gold' ? '30%' : '35%'} Commission)
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Refer more paying sports organizations to automatically unlock higher commission tiers.
              </p>
            </div>

            <button
              onClick={() => simulateAddDemoCustomer(activeAffiliate.id)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-xs font-semibold transition-all self-start sm:self-auto"
            >
              <Award className="size-3.5" />
              Simulate Customer ({stats.paidCustomers}/25)
            </button>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-foreground">Progress to Gold Tier (25 Customers)</span>
              <span className="font-bold text-[#8B14C2]">
                {stats.paidCustomers} / 25 Clubs ({Math.min(100, Math.round((stats.paidCustomers / 25) * 100))}%)
              </span>
            </div>
            <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#27125B] to-[#8B14C2] transition-all duration-500 rounded-full"
                style={{ width: `${Math.min(100, (stats.paidCustomers / 25) * 100)}%` }}
              />
            </div>
            <div className="grid grid-cols-4 text-center text-[11px] text-muted-foreground pt-1">
              <div>
                <span className="font-bold text-amber-700 dark:text-amber-400">Bronze</span>
                <p>0-9 Clubs (20%)</p>
              </div>
              <div>
                <span className="font-bold text-slate-700 dark:text-slate-300">Silver</span>
                <p>10-24 Clubs (25%)</p>
              </div>
              <div>
                <span className="font-bold text-yellow-600 dark:text-yellow-400">Gold</span>
                <p>25-49 Clubs (30%)</p>
              </div>
              <div>
                <span className="font-bold text-purple-600 dark:text-purple-400">Platinum</span>
                <p>50+ Clubs (35%)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-foreground mb-1">Quick Actions</h4>
            <p className="text-xs text-muted-foreground mb-4">Promote and manage your affiliate account.</p>

            <div className="space-y-2">
              <button
                onClick={() => setIsCreateLinkOpen(true)}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-border bg-muted/30 hover:bg-muted/70 transition-all text-xs font-semibold text-foreground"
              >
                <div className="flex items-center gap-2.5">
                  <Link2 className="size-4 text-emerald-500" />
                  <span>Create Referral Link</span>
                </div>
                <ArrowRight className="size-3.5 text-muted-foreground" />
              </button>

              <Link
                href="/affiliate/referrals"
                className="w-full flex items-center justify-between p-3 rounded-xl border border-border bg-muted/30 hover:bg-muted/70 transition-all text-xs font-semibold text-foreground"
              >
                <div className="flex items-center gap-2.5">
                  <Building2 className="size-4 text-blue-500" />
                  <span>View All Referrals</span>
                </div>
                <ArrowRight className="size-3.5 text-muted-foreground" />
              </Link>

              <Link
                href="/affiliate/payouts"
                className="w-full flex items-center justify-between p-3 rounded-xl border border-border bg-muted/30 hover:bg-muted/70 transition-all text-xs font-semibold text-foreground"
              >
                <div className="flex items-center gap-2.5">
                  <CreditCard className="size-4 text-indigo-500" />
                  <span>Request Payout</span>
                </div>
                <ArrowRight className="size-3.5 text-muted-foreground" />
              </Link>

              <Link
                href="/affiliate/marketing"
                className="w-full flex items-center justify-between p-3 rounded-xl border border-border bg-muted/30 hover:bg-muted/70 transition-all text-xs font-semibold text-foreground"
              >
                <div className="flex items-center gap-2.5">
                  <FolderDown className="size-4 text-purple-500" />
                  <span>Marketing Materials</span>
                </div>
                <ArrowRight className="size-3.5 text-muted-foreground" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-bold text-foreground">Monthly Referred Revenue Growth</h4>
              <p className="text-xs text-muted-foreground">Cumulative monthly revenue from referred clubs</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
              {formatCurrency(stats.totalRevenue)}
            </span>
          </div>
          <MiniAreaChart data={revenueChartData} isCurrency={true} color="#10B981" height={220} />
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-bold text-foreground">Weekly Clicks vs Signups</h4>
              <p className="text-xs text-muted-foreground">Traffic activity over the past 7 days</p>
            </div>
          </div>
          <MiniBarChart data={clicksSignupsData} height={220} barColor="#3B82F6" bar2Color="#10B981" />
        </div>
      </div>

      {/* Recent Referrals & Commissions Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Referrals */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-border">
            <h4 className="text-sm font-bold text-foreground">Recent Referrals</h4>
            <Link href="/affiliate/referrals" className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1">
              View All <ArrowRight className="size-3" />
            </Link>
          </div>

          <div className="space-y-3 flex-1">
            {referrals.slice(0, 5).map((ref) => {
              const statusBadge = getReferralStatusBadge(ref.status);
              return (
                <div key={ref.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/60 hover:bg-muted/60 transition-colors">
                  <div>
                    <h5 className="text-xs font-bold text-foreground">{ref.orgName}</h5>
                    <p className="text-[11px] text-muted-foreground">{ref.customerName} • {ref.signupDate}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusBadge.className}`}>
                      {statusBadge.text}
                    </span>
                    <p className="text-xs font-semibold text-foreground mt-0.5">
                      {ref.plan} Plan {ref.revenue > 0 && `(${formatCurrency(ref.revenue)})`}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Commissions */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-border">
            <h4 className="text-sm font-bold text-foreground">Recent Commission Transactions</h4>
            <Link href="/affiliate/commissions" className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1">
              View All <ArrowRight className="size-3" />
            </Link>
          </div>

          <div className="space-y-3 flex-1">
            {commissions.slice(0, 5).map((comm) => {
              const badge = getCommissionStatusBadge(comm.status);
              const isNegative = comm.amount < 0;
              return (
                <div key={comm.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/60 hover:bg-muted/60 transition-colors">
                  <div>
                    <h5 className="text-xs font-bold text-foreground">{comm.orgName}</h5>
                    <p className="text-[11px] text-muted-foreground">{comm.date} • Ref: {comm.reference}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-bold ${isNegative ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                      {formatCurrency(comm.amount)}
                    </span>
                    <div>
                      <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge.className}`}>
                        {badge.text}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Create Referral Link Modal */}
      {isCreateLinkOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-card border border-border rounded-2xl p-6 shadow-2xl animate-in zoom-in-95">
            <h3 className="text-lg font-bold text-foreground">Create Referral Link</h3>
            <p className="text-xs text-muted-foreground mt-1">Generate a custom tracking link for your social channels or website.</p>

            <form onSubmit={handleCreateLink} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">Link Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Summer Basketball Camp Header"
                  value={newLinkName}
                  onChange={(e) => setNewLinkName(e.target.value)}
                  className="w-full text-xs bg-background border border-border rounded-xl px-3 py-2 text-foreground focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">Referral Code</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. HOOPS2026"
                  value={newLinkCode}
                  onChange={(e) => setNewLinkCode(e.target.value.toUpperCase())}
                  className="w-full text-xs font-mono font-bold bg-background border border-border rounded-xl px-3 py-2 text-foreground focus:ring-2 focus:ring-emerald-500 outline-none uppercase"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateLinkOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-all"
                >
                  Create Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Onboarding Tour Modal Wizard */}
      <OnboardingWizard />
    </div>
  );
}
