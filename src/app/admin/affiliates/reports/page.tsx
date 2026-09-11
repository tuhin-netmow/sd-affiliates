'use client';

import React, { useState } from 'react';
import { FileBarChart2, Download, Users2, GitFork, DollarSign, CreditCard, Megaphone, Tag, Award, ShieldAlert, Layers } from 'lucide-react';
import { useAffiliateDemo } from '@/context/affiliate-demo-context';
import { formatCurrency, formatNumber } from '@/lib/affiliate/calculations';
import { MiniAreaChart } from '@/components/shared/metric-charts';
import { useToast } from '@/context/toast-context';

const REPORT_SECTIONS = [
  { id: 'performance', label: 'Affiliate Performance', icon: <Users2 className="size-4" /> },
  { id: 'referrals', label: 'Referrals', icon: <GitFork className="size-4" /> },
  { id: 'revenue', label: 'Revenue', icon: <DollarSign className="size-4" /> },
  { id: 'commissions', label: 'Commissions', icon: <DollarSign className="size-4" /> },
  { id: 'payouts', label: 'Payouts', icon: <CreditCard className="size-4" /> },
  { id: 'campaigns', label: 'Campaigns', icon: <Megaphone className="size-4" /> },
  { id: 'coupons', label: 'Coupons', icon: <Tag className="size-4" /> },
  { id: 'tiers', label: 'Tiers', icon: <Layers className="size-4" /> },
  { id: 'bonuses', label: 'Bonuses', icon: <Award className="size-4" /> },
  { id: 'fraud', label: 'Fraud', icon: <ShieldAlert className="size-4" /> },
];

export default function AdminReportsPage() {
  const { affiliates, referrals, customers, commissions, payouts, campaigns, coupons, tiers, bonuses, fraudCases } = useAffiliateDemo();
  const { showToast } = useToast();
  const [activeSection, setActiveSection] = useState('performance');

  const handleExport = (reportName: string) => {
    showToast(`Demo export generated: ${reportName}.csv`, 'success');
  };

  const revenueData = [
    { label: 'Oct', value: 24500 },
    { label: 'Nov', value: 38200 },
    { label: 'Dec', value: 49800 },
    { label: 'Jan', value: 64200 },
    { label: 'Feb', value: 89000 },
    { label: 'Mar', value: affiliates.reduce((s, a) => s + a.stats.totalRevenue, 0) },
  ];

  const topAffiliates = [...affiliates].sort((a, b) => b.stats.totalRevenue - a.stats.totalRevenue).slice(0, 10);

  const renderSection = () => {
    switch (activeSection) {
      case 'performance':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Affiliate Performance Report</h3>
              <button onClick={() => handleExport('affiliate_performance')} className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-border hover:bg-muted transition-colors">
                <Download className="size-3.5" /> Export CSV
              </button>
            </div>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">#</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Affiliate</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Tier</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Clicks</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Customers</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Revenue</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Commission</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {topAffiliates.map((aff, i) => (
                    <tr key={aff.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 text-xs font-bold text-muted-foreground">#{i + 1}</td>
                      <td className="px-4 py-3">
                        <p className="text-xs font-semibold text-foreground">{aff.name}</p>
                        <p className="text-[11px] text-muted-foreground font-mono">{aff.referralCode}</p>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{aff.tier}</td>
                      <td className="px-4 py-3 text-center text-xs font-medium text-foreground">{formatNumber(aff.stats.totalClicks)}</td>
                      <td className="px-4 py-3 text-center text-xs font-medium text-foreground">{aff.stats.paidCustomers}</td>
                      <td className="px-4 py-3 text-right font-mono text-xs text-foreground">{formatCurrency(aff.stats.totalRevenue)}</td>
                      <td className="px-4 py-3 text-right font-mono text-xs text-emerald-600">{formatCurrency(aff.stats.totalEarned)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'revenue':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Revenue Report</h3>
              <button onClick={() => handleExport('revenue')} className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-border hover:bg-muted transition-colors">
                <Download className="size-3.5" /> Export CSV
              </button>
            </div>
            <div className="rounded-xl border border-border bg-card/60 p-4">
              <MiniAreaChart data={revenueData} height={180} color="#3b82f6" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Total Referral Revenue', value: formatCurrency(affiliates.reduce((s, a) => s + a.stats.totalRevenue, 0)) },
                { label: 'Avg Revenue/Affiliate', value: formatCurrency(affiliates.reduce((s, a) => s + a.stats.totalRevenue, 0) / affiliates.length) },
                { label: 'Top Affiliate Revenue', value: formatCurrency(topAffiliates[0]?.stats.totalRevenue || 0) },
                { label: 'Paid Customer Count', value: customers.filter((c) => c.subscriptionStatus === 'Active').length },
              ].map((s) => (
                <div key={s.label} className="rounded-xl bg-muted/40 border border-border p-3">
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="text-lg font-bold text-foreground mt-1">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'commissions':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Commission Report</h3>
              <button onClick={() => handleExport('commissions')} className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-border hover:bg-muted transition-colors">
                <Download className="size-3.5" /> Export CSV
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { label: 'Total Generated', value: formatCurrency(commissions.filter((c) => c.amount > 0).reduce((s, c) => s + c.amount, 0)), color: 'text-foreground' },
                { label: 'Pending', value: formatCurrency(commissions.filter((c) => c.status === 'Pending').reduce((s, c) => s + c.amount, 0)), color: 'text-amber-600' },
                { label: 'Approved', value: formatCurrency(commissions.filter((c) => c.status === 'Approved').reduce((s, c) => s + c.amount, 0)), color: 'text-blue-600' },
                { label: 'Payable', value: formatCurrency(commissions.filter((c) => c.status === 'Payable').reduce((s, c) => s + c.amount, 0)), color: 'text-violet-600' },
                { label: 'Paid', value: formatCurrency(commissions.filter((c) => c.status === 'Paid').reduce((s, c) => s + c.amount, 0)), color: 'text-emerald-600' },
                { label: 'Reversed', value: formatCurrency(Math.abs(commissions.filter((c) => c.amount < 0).reduce((s, c) => s + c.amount, 0))), color: 'text-rose-600' },
              ].map((s) => (
                <div key={s.label} className="rounded-xl bg-muted/40 border border-border p-3">
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className={`text-xl font-bold mt-1 ${s.color}`}>{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'fraud':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Fraud Report</h3>
              <button onClick={() => handleExport('fraud')} className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-border hover:bg-muted transition-colors">
                <Download className="size-3.5" /> Export CSV
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['Under Review', 'Resolved', 'Safe', 'Closed'].map((status) => (
                <div key={status} className="rounded-xl bg-muted/40 border border-border p-3 text-center">
                  <p className="text-xl font-bold text-foreground">{fraudCases.filter((f) => f.status === status).length}</p>
                  <p className="text-xs text-muted-foreground mt-1">{status}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Type</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Count</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {Array.from(new Set(fraudCases.map((f) => f.type))).map((type) => (
                    <tr key={type} className="hover:bg-muted/30">
                      <td className="px-4 py-3 text-xs text-foreground">{type}</td>
                      <td className="px-4 py-3 text-center text-xs font-bold text-foreground">{fraudCases.filter((f) => f.type === type).length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return (
          <div className="rounded-xl border border-dashed border-border p-12 text-center">
            <FileBarChart2 className="size-10 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground font-medium">Report: {REPORT_SECTIONS.find((r) => r.id === activeSection)?.label}</p>
            <p className="text-xs text-muted-foreground mt-1">Demo data shown in the Affiliate Performance report. Select another report to view.</p>
            <button onClick={() => handleExport(activeSection)} className="mt-4 flex items-center gap-1.5 px-3 py-2 mx-auto text-xs rounded-lg border border-border hover:bg-muted transition-colors">
              <Download className="size-3.5" /> Export Demo CSV
            </button>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <FileBarChart2 className="size-6 text-blue-500" />
          Reports & Analytics
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Generate and export reports across all affiliate program dimensions.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Report Navigation */}
        <div className="lg:w-56 shrink-0">
          <div className="rounded-2xl border border-border bg-card/80 p-2 space-y-0.5">
            {REPORT_SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium text-left transition-all ${
                  activeSection === section.id
                    ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                }`}
              >
                <span className={activeSection === section.id ? 'text-blue-500' : 'text-muted-foreground'}>
                  {section.icon}
                </span>
                {section.label}
              </button>
            ))}
          </div>
        </div>

        {/* Report Content */}
        <div className="flex-1 rounded-2xl border border-border bg-card/80 p-5">
          {renderSection()}
        </div>
      </div>
    </div>
  );
}
