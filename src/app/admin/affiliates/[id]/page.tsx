'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  User,
  Users2,
  Building2,
  DollarSign,
  CreditCard,
  Megaphone,
  Tag,
  ShieldAlert,
  ScrollText,
  Save,
  CheckCircle2,
  Sliders,
  Plus,
} from 'lucide-react';
import { useAffiliateDemo } from '@/context/affiliate-demo-context';
import { formatCurrency, formatNumber, getTierBadgeClass, getCommissionStatusBadge, getReferralStatusBadge } from '@/lib/affiliate/calculations';
import { AffiliateTierName, AffiliateStatus } from '@/types/affiliate';
import { useToast } from '@/context/toast-context';

export default function AffiliateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const {
    affiliates,
    referrals,
    customers,
    commissions,
    payouts,
    campaigns,
    coupons,
    fraudCases,
    auditLogs,
    updateAffiliateStatus,
    updateAffiliateTier,
  } = useAffiliateDemo();

  const { showToast } = useToast();

  const affiliate = affiliates.find((a) => a.id === id) || affiliates[0];

  const [activeTab, setActiveTab] = useState<
    | 'Overview'
    | 'Referrals'
    | 'Customers'
    | 'Commissions'
    | 'Payouts'
    | 'Campaigns'
    | 'Coupons'
    | 'Fraud'
    | 'Activity'
  >('Overview');

  const [tier, setTier] = useState<AffiliateTierName>(affiliate.tier);
  const [status, setStatus] = useState<AffiliateStatus>(affiliate.status);
  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState<string[]>(affiliate.notes || []);

  const affReferrals = referrals.filter((r) => r.affiliateId === affiliate.id || r.affiliateId === 'aff-1');
  const affCustomers = customers.filter((c) => c.affiliateId === affiliate.id || c.affiliateId === 'aff-1');
  const affCommissions = commissions.filter((c) => c.affiliateId === affiliate.id || c.affiliateId === 'aff-1');
  const affPayouts = payouts.filter((p) => p.affiliateId === affiliate.id || p.affiliateId === 'aff-1');
  const affCoupons = coupons.filter((c) => c.affiliateId === affiliate.id);
  const affFraud = fraudCases.filter((f) => f.affiliateId === affiliate.id);
  const affAudit = auditLogs.filter((a) => a.entityId === affiliate.id || a.user.includes(affiliate.name));

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateAffiliateStatus(affiliate.id, status);
    updateAffiliateTier(affiliate.id, tier);
    showToast('✓ Affiliate Updated', 'Tier and status saved successfully', 'success');
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    setNotes([noteText.trim(), ...notes]);
    setNoteText('');
    showToast('✓ Note Appended', 'Admin note recorded to affiliate history', 'info');
  };

  const tabs = [
    { id: 'Overview', label: 'Overview', icon: <User className="size-4" /> },
    { id: 'Referrals', label: `Referrals (${affReferrals.length})`, icon: <Users2 className="size-4" /> },
    { id: 'Customers', label: `Customers (${affCustomers.length})`, icon: <Building2 className="size-4" /> },
    { id: 'Commissions', label: `Commissions (${affCommissions.length})`, icon: <DollarSign className="size-4" /> },
    { id: 'Payouts', label: `Payouts (${affPayouts.length})`, icon: <CreditCard className="size-4" /> },
    { id: 'Campaigns', label: 'Campaigns', icon: <Megaphone className="size-4" /> },
    { id: 'Coupons', label: `Coupons (${affCoupons.length})`, icon: <Tag className="size-4" /> },
    { id: 'Fraud', label: `Fraud (${affFraud.length})`, icon: <ShieldAlert className="size-4" /> },
    { id: 'Activity', label: `Activity (${affAudit.length})`, icon: <ScrollText className="size-4" /> },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Back Link & Header */}
      <div>
        <Link
          href="/admin/affiliates/list"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground mb-3"
        >
          <ArrowLeft className="size-3.5" /> Back to Affiliate Directory
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={affiliate.avatar}
              alt={affiliate.name}
              className="size-16 rounded-full object-cover border-2 border-border ring-4 ring-blue-500/10 shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-foreground">{affiliate.name}</h2>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getTierBadgeClass(affiliate.tier)}`}>
                  {affiliate.tier}
                </span>
                <span className="text-[10px] font-mono bg-muted px-2 py-0.5 rounded font-bold border border-border">
                  Code: {affiliate.referralCode}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{affiliate.company} • {affiliate.email} • {affiliate.country}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 9 Tabs Horizontal Navigation */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar border-b border-border">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold rounded-t-xl transition-all border-b-2 -mb-px whitespace-nowrap ${
              activeTab === t.id
                ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-500/5'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            {t.icon}
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      {activeTab === 'Overview' && (
        <div className="space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl border border-border bg-card">
              <span className="text-xs text-muted-foreground">Total Clicks</span>
              <p className="text-xl font-bold text-foreground mt-1">{formatNumber(affiliate.stats.totalClicks)}</p>
            </div>
            <div className="p-4 rounded-2xl border border-border bg-card">
              <span className="text-xs text-muted-foreground">Paid Customers</span>
              <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{affiliate.stats.paidCustomers}</p>
            </div>
            <div className="p-4 rounded-2xl border border-border bg-card">
              <span className="text-xs text-muted-foreground">Referral Spend</span>
              <p className="text-xl font-bold text-foreground mt-1">{formatCurrency(affiliate.stats.totalRevenue)}</p>
            </div>
            <div className="p-4 rounded-2xl border border-border bg-card">
              <span className="text-xs text-muted-foreground">Withdrawable Balance</span>
              <p className="text-xl font-bold text-blue-600 dark:text-blue-400 mt-1">{formatCurrency(affiliate.stats.currentBalance)}</p>
            </div>
          </div>

          {/* Admin Override Form */}
          <form onSubmit={handleSaveSettings} className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-foreground">Admin Status & Tier Overrides</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-foreground mb-1">Partner Tier</label>
                <select
                  value={tier}
                  onChange={(e) => setTier(e.target.value as any)}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2 text-foreground"
                >
                  <option value="Bronze">Bronze (20%)</option>
                  <option value="Silver">Silver (25%)</option>
                  <option value="Gold">Gold (30%)</option>
                  <option value="Platinum">Platinum (35%)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-foreground mb-1">Account Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2 text-foreground"
                >
                  <option value="Active">Active</option>
                  <option value="Suspended">Suspended</option>
                  <option value="Banned">Banned</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm"
              >
                <Save className="size-3.5" /> Save Changes
              </button>
            </div>
          </form>

          {/* Admin Notes Section */}
          <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-foreground">Internal Admin Notes</h4>
            <form onSubmit={handleAddNote} className="flex gap-2">
              <input
                type="text"
                placeholder="Add a new internal note regarding this affiliate..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                className="flex-1 text-xs bg-background border border-border rounded-xl px-3 py-2 text-foreground outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-xl text-xs font-semibold border border-border"
              >
                Add Note
              </button>
            </form>

            <div className="space-y-2 pt-2">
              {notes.map((n, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-muted/40 border border-border/60 text-xs text-foreground">
                  {n}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Referrals' && (
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-muted/40 border-b border-border text-muted-foreground font-semibold uppercase text-[10px]">
                <th className="p-4">Organization</th>
                <th className="p-4">Plan</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Commission</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {affReferrals.map((ref) => (
                <tr key={ref.id} className="hover:bg-muted/30">
                  <td className="p-4 font-bold text-foreground">{ref.orgName}</td>
                  <td className="p-4">{ref.plan}</td>
                  <td className="p-4">{ref.status}</td>
                  <td className="p-4 text-right font-bold text-emerald-600">{formatCurrency(ref.commission)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'Customers' && (
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-muted/40 border-b border-border text-muted-foreground font-semibold uppercase text-[10px]">
                <th className="p-4">Customer</th>
                <th className="p-4">Monthly Spend</th>
                <th className="p-4">Lifetime Revenue</th>
                <th className="p-4 text-right">Commission</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {affCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-muted/30">
                  <td className="p-4 font-bold text-foreground">{cust.orgName}</td>
                  <td className="p-4">{formatCurrency(cust.monthlyRevenue)}/mo</td>
                  <td className="p-4">{formatCurrency(cust.lifetimeRevenue)}</td>
                  <td className="p-4 text-right font-bold text-emerald-600">{formatCurrency(cust.commissionEarned)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'Commissions' && (
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-muted/40 border-b border-border text-muted-foreground font-semibold uppercase text-[10px]">
                <th className="p-4">Date</th>
                <th className="p-4">Organization</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {affCommissions.map((comm) => (
                <tr key={comm.id} className="hover:bg-muted/30">
                  <td className="p-4 text-muted-foreground">{comm.date}</td>
                  <td className="p-4 font-bold text-foreground">{comm.orgName}</td>
                  <td className="p-4">{comm.status}</td>
                  <td className="p-4 text-right font-bold text-emerald-600">{formatCurrency(comm.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'Payouts' && (
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-muted/40 border-b border-border text-muted-foreground font-semibold uppercase text-[10px]">
                <th className="p-4">Reference</th>
                <th className="p-4">Method</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {affPayouts.map((pay) => (
                <tr key={pay.id} className="hover:bg-muted/30">
                  <td className="p-4 font-mono font-bold text-foreground">{pay.reference}</td>
                  <td className="p-4">{pay.method}</td>
                  <td className="p-4">{pay.status}</td>
                  <td className="p-4 text-right font-bold">{formatCurrency(pay.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'Coupons' && (
        <div className="p-6 rounded-2xl border border-border bg-card space-y-3">
          {affCoupons.length === 0 ? (
            <p className="text-xs text-muted-foreground">No customized coupons assigned to this partner.</p>
          ) : (
            affCoupons.map((c) => (
              <div key={c.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/40 text-xs">
                <span className="font-mono font-bold text-foreground">{c.code} ({c.discount})</span>
                <span className="text-muted-foreground">{c.usageCount} Uses • {formatCurrency(c.revenueGenerated)} Spend</span>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'Fraud' && (
        <div className="p-6 rounded-2xl border border-border bg-card space-y-3">
          {affFraud.length === 0 ? (
            <div className="text-xs text-emerald-600 flex items-center gap-2">
              <CheckCircle2 className="size-4" /> No suspicious traffic or fraud cases recorded.
            </div>
          ) : (
            affFraud.map((f) => (
              <div key={f.id} className="p-3 rounded-xl border border-border bg-muted/30 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-foreground">
                  <span>{f.type}</span>
                  <span className="text-rose-600">{f.riskScore} Risk</span>
                </div>
                <p className="text-muted-foreground">{f.details}</p>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'Activity' && (
        <div className="p-6 rounded-2xl border border-border bg-card space-y-3">
          {affAudit.map((a) => (
            <div key={a.id} className="p-3 rounded-xl bg-muted/30 text-xs space-y-0.5">
              <div className="flex items-center justify-between font-semibold text-foreground">
                <span>{a.action}</span>
                <span className="text-muted-foreground text-[10px]">{a.timestamp}</span>
              </div>
              <p className="text-muted-foreground">{a.reason || a.newValue}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
