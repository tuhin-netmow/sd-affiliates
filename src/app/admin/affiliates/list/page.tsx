'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users2,
  Search,
  Eye,
  ShieldAlert,
  ShieldCheck,
  Ban,
  UserX,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { useAffiliateDemo } from '@/context/affiliate-demo-context';
import { formatCurrency, formatNumber, getTierBadgeClass } from '@/lib/affiliate/calculations';
import { ConfirmationModal } from '@/components/shared/confirmation-modal';
import { AffiliateStatus } from '@/types/affiliate';

export default function AdminAffiliatesListPage() {
  const { affiliates, updateAffiliateStatus } = useAffiliateDemo();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [actionTarget, setActionTarget] = useState<{ id: string; name: string; action: 'Suspend' | 'Ban' | 'Reactivate' } | null>(null);

  const filteredAffiliates = affiliates.filter((aff) => {
    const matchesSearch =
      aff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      aff.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      aff.referralCode.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || aff.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Affiliate Directory</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Complete database of all approved, suspended, and banned affiliate partners.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search affiliates by name, company, or referral code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 no-scrollbar">
          {['All', 'Active', 'Pending', 'Suspended', 'Banned'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-2 text-xs font-semibold rounded-xl border whitespace-nowrap transition-all ${
                statusFilter === status
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-card text-muted-foreground border-border hover:bg-muted'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Affiliates Table */}
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        {filteredAffiliates.length === 0 ? (
          <div className="p-12 text-center text-xs text-muted-foreground">
            No affiliates found matching the selected filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-muted/40 border-b border-border text-muted-foreground font-semibold uppercase tracking-wider text-[10px]">
                  <th className="p-4">Affiliate & Company</th>
                  <th className="p-4">Referral Code</th>
                  <th className="p-4 text-center">Tier</th>
                  <th className="p-4 text-center">Clicks</th>
                  <th className="p-4 text-center">Paid Clubs</th>
                  <th className="p-4 text-right">Referral Spend</th>
                  <th className="p-4 text-right">Commission</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-right">Admin Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredAffiliates.map((aff) => {
                  const isActive = aff.status === 'Active';
                  const isSuspended = aff.status === 'Suspended';
                  const isBanned = aff.status === 'Banned';

                  return (
                    <tr key={aff.id} className="hover:bg-muted/30 transition-colors group">
                      <td className="p-4">
                        <Link href={`/admin/affiliates/${aff.id}`} className="flex items-center gap-3">
                          <img
                            src={aff.avatar}
                            alt={aff.name}
                            className="size-8 rounded-full object-cover border border-border"
                          />
                          <div>
                            <span className="font-bold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {aff.name}
                            </span>
                            <span className="text-[11px] text-muted-foreground block">{aff.company}</span>
                          </div>
                        </Link>
                      </td>
                      <td className="p-4">
                        <span className="font-mono font-bold text-xs bg-muted px-2 py-0.5 rounded border border-border">
                          {aff.referralCode}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getTierBadgeClass(aff.tier)}`}>
                          {aff.tier}
                        </span>
                      </td>
                      <td className="p-4 text-center font-bold text-foreground">
                        {formatNumber(aff.stats.totalClicks)}
                      </td>
                      <td className="p-4 text-center font-bold text-emerald-600 dark:text-emerald-400">
                        {aff.stats.paidCustomers}
                      </td>
                      <td className="p-4 text-right font-bold text-foreground">
                        {formatCurrency(aff.stats.totalRevenue)}
                      </td>
                      <td className="p-4 text-right font-extrabold text-foreground">
                        {formatCurrency(aff.stats.totalEarned + aff.stats.payableCommission)}
                      </td>
                      <td className="p-4 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                            isActive
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300'
                              : isSuspended
                              ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300'
                              : isBanned
                              ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300'
                              : 'bg-zinc-100 text-zinc-700 border-zinc-200'
                          }`}
                        >
                          {aff.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/admin/affiliates/${aff.id}`}
                            className="p-1.5 rounded-lg border border-border hover:bg-muted text-foreground transition-all"
                            title="Open Affiliate 360 View"
                          >
                            <Eye className="size-3.5" />
                          </Link>

                          {isActive && (
                            <button
                              onClick={() => setActionTarget({ id: aff.id, name: aff.name, action: 'Suspend' })}
                              className="p-1.5 rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 transition-all"
                              title="Suspend Affiliate"
                            >
                              <UserX className="size-3.5" />
                            </button>
                          )}

                          {(isSuspended || isBanned) && (
                            <button
                              onClick={() => updateAffiliateStatus(aff.id, 'Active')}
                              className="p-1.5 rounded-lg border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 transition-all"
                              title="Reactivate Affiliate"
                            >
                              <ShieldCheck className="size-3.5" />
                            </button>
                          )}

                          {!isBanned && (
                            <button
                              onClick={() => setActionTarget({ id: aff.id, name: aff.name, action: 'Ban' })}
                              className="p-1.5 rounded-lg border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 transition-all"
                              title="Ban Affiliate"
                            >
                              <Ban className="size-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={actionTarget !== null}
        onClose={() => setActionTarget(null)}
        onConfirm={() => {
          if (actionTarget) {
            updateAffiliateStatus(
              actionTarget.id,
              actionTarget.action === 'Suspend' ? 'Suspended' : 'Banned'
            );
          }
        }}
        title={`${actionTarget?.action} Affiliate: ${actionTarget?.name}?`}
        description={
          actionTarget?.action === 'Suspend'
            ? 'Suspended affiliates can no longer request payouts and their links are temporarily deactivated.'
            : 'Banning an affiliate permanently revokes commission attribution and freezes balance.'
        }
        confirmText={`Yes, ${actionTarget?.action}`}
      />
    </div>
  );
}
