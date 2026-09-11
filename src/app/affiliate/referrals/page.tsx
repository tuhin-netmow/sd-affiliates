'use client';

import React, { useState } from 'react';
import {
  Users2,
  Search,
  Filter,
  Eye,
  Building2,
  Calendar,
  Globe,
  Tag,
  DollarSign,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { useAffiliateDemo } from '@/context/affiliate-demo-context';
import { formatCurrency, getReferralStatusBadge } from '@/lib/affiliate/calculations';
import { Referral, ReferralStatus } from '@/types/affiliate';
import { DrawerSheet } from '@/components/shared/drawer-sheet';
import { AffiliateLifecycleTimeline } from '@/components/timeline/affiliate-lifecycle-timeline';
import { ExplanatoryCallout } from '@/components/shared/explanatory-callout';

export default function AffiliateReferralsPage() {
  const { referrals, activeAffiliate } = useAffiliateDemo();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);

  const affReferrals = referrals.filter(
    (r) => r.affiliateId === activeAffiliate.id || r.affiliateId === 'aff-1'
  );

  const filteredReferrals = affReferrals.filter((r) => {
    const matchesSearch =
      r.orgName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Referrals Directory</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Full lifecycle tracking of all visitors, signups, and paying sports clubs attributed to you.
          </p>
        </div>
      </div>

      <ExplanatoryCallout
        title="Referral Lifecycle & Attribution"
        description="Clicking any referral below inspects their full 8-step lifecycle progression from initial click attribution to paid subscription and commission clearance."
        variant="info"
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by organization name, coach contact, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 no-scrollbar">
          {['All', 'Paid', 'Signed Up', 'Free', 'Trial', 'Cancelled', 'Refunded'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-2 text-xs font-semibold rounded-xl border whitespace-nowrap transition-all ${
                statusFilter === status
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-card text-muted-foreground border-border hover:bg-muted'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Referrals Table */}
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        {filteredReferrals.length === 0 ? (
          <div className="p-12 text-center text-xs text-muted-foreground">
            No referrals found matching the selected criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-muted/40 border-b border-border text-muted-foreground font-semibold uppercase tracking-wider text-[10px]">
                  <th className="p-4">Organization & Contact</th>
                  <th className="p-4">Referral / Signup Date</th>
                  <th className="p-4 text-center">Plan</th>
                  <th className="p-4 text-center">Lifecycle Status</th>
                  <th className="p-4 text-right">Revenue</th>
                  <th className="p-4 text-right">Commission</th>
                  <th className="p-4">Attribution / Campaign</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredReferrals.map((ref) => {
                  const badge = getReferralStatusBadge(ref.status);
                  return (
                    <tr
                      key={ref.id}
                      onClick={() => setSelectedReferral(ref)}
                      className="hover:bg-muted/30 transition-colors cursor-pointer group"
                    >
                      <td className="p-4">
                        <div className="font-bold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {ref.orgName}
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                          {ref.customerName} ({ref.email})
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground">
                        <div>Click: {ref.clickDate}</div>
                        <div className="text-[11px] text-foreground font-medium">Signup: {ref.signupDate}</div>
                      </td>
                      <td className="p-4 text-center font-bold text-foreground">
                        <span className="bg-muted px-2 py-1 rounded-md text-[11px] border border-border">
                          {ref.plan}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badge.className}`}>
                          {badge.text}
                        </span>
                      </td>
                      <td className="p-4 text-right font-bold text-foreground">
                        {ref.revenue > 0 ? formatCurrency(ref.revenue) : '—'}
                      </td>
                      <td className="p-4 text-right font-bold text-emerald-600 dark:text-emerald-400">
                        {ref.commission > 0 ? formatCurrency(ref.commission) : '—'}
                      </td>
                      <td className="p-4 text-muted-foreground">
                        <div className="truncate max-w-[180px] font-medium text-foreground">{ref.attributionType}</div>
                        {ref.campaign && <div className="text-[10px] text-emerald-600">{ref.campaign}</div>}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedReferral(ref);
                          }}
                          className="p-1.5 rounded-lg border border-border bg-background hover:bg-muted text-foreground transition-all"
                          title="View Lifecycle Timeline"
                        >
                          <Eye className="size-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Slide-Over Drawer with Lifecycle Timeline */}
      <DrawerSheet
        isOpen={selectedReferral !== null}
        onClose={() => setSelectedReferral(null)}
        title={selectedReferral?.orgName || 'Referral Detail'}
        subtitle={`Attributed Customer: ${selectedReferral?.customerName}`}
      >
        {selectedReferral && (
          <div className="space-y-6">
            {/* Reusable Lifecycle Timeline (Section 17 requirement) */}
            <div className="p-5 rounded-2xl bg-card border border-border shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
                Affiliate Lifecycle Timeline
              </h4>
              <AffiliateLifecycleTimeline currentStep={selectedReferral.lifecycleStep} />
            </div>

            {/* Overview Metadata */}
            <div className="p-5 rounded-2xl bg-muted/30 border border-border space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Attribution & Account Info
              </h4>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-muted-foreground">Organization</span>
                  <p className="font-bold text-foreground mt-0.5">{selectedReferral.orgName}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Primary Contact</span>
                  <p className="font-bold text-foreground mt-0.5">{selectedReferral.customerName}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Contact Email</span>
                  <p className="font-mono text-foreground mt-0.5">{selectedReferral.email}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Country / Region</span>
                  <p className="font-medium text-foreground mt-0.5">{selectedReferral.country}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Subscription Plan</span>
                  <p className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {selectedReferral.plan} Plan ({selectedReferral.plan === 'Pro' ? '$49/mo' : selectedReferral.plan === 'Starter' ? '$19/mo' : '$0'})
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Attribution Model</span>
                  <p className="font-medium text-foreground mt-0.5">{selectedReferral.attributionType}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Campaign</span>
                  <p className="font-medium text-foreground mt-0.5">{selectedReferral.campaign || 'Direct / None'}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Coupon Used</span>
                  <p className="font-mono font-bold text-foreground mt-0.5">{selectedReferral.coupon || 'None'}</p>
                </div>
              </div>
            </div>

            {/* Financial Summary */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl border border-border bg-card">
                <span className="text-xs text-muted-foreground">Total Customer Revenue</span>
                <p className="text-xl font-bold text-foreground mt-1">{formatCurrency(selectedReferral.revenue)}</p>
              </div>
              <div className="p-4 rounded-2xl border border-border bg-card">
                <span className="text-xs text-muted-foreground">Your Lifetime Commission</span>
                <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                  {formatCurrency(selectedReferral.commission)}
                </p>
              </div>
            </div>
          </div>
        )}
      </DrawerSheet>
    </div>
  );
}
