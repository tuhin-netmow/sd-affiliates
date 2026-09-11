'use client';

import React, { useState } from 'react';
import {
  DollarSign,
  Search,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Edit3,
  Building2,
  Percent,
  Filter,
  AlertTriangle,
} from 'lucide-react';
import { useAffiliateDemo } from '@/context/affiliate-demo-context';
import { formatCurrency } from '@/lib/affiliate/calculations';
import { ConfirmationModal } from '@/components/shared/confirmation-modal';

const STATUSES = ['All', 'Pending', 'Approved', 'Payable', 'Paid', 'Reversed', 'Refunded'];
const TYPES = ['All', 'Recurring', 'One-time', 'Bonus', 'Reversal'];

export default function AdminCommissionsPage() {
  const { commissions, affiliates, customers, approveCommission, makeCommissionPayable } = useAffiliateDemo();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [confirmModal, setConfirmModal] = useState<{
    open: boolean; title: string; desc: string; action: () => void;
  }>({ open: false, title: '', desc: '', action: () => {} });

  const filtered = commissions.filter((c) => {
    const aff = affiliates.find((a) => a.id === c.affiliateId);
    const matchSearch =
      search === '' ||
      (aff?.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (c.orgName || '').toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || c.status === statusFilter;
    const matchType = typeFilter === 'All' || c.type === typeFilter;
    return matchSearch && matchStatus && matchType;
  });

  const totalPending = commissions.filter((c) => c.status === 'Pending').reduce((s, c) => s + c.amount, 0);
  const totalApproved = commissions.filter((c) => c.status === 'Approved').reduce((s, c) => s + c.amount, 0);
  const totalPayable = commissions.filter((c) => c.status === 'Payable').reduce((s, c) => s + c.amount, 0);
  const totalPaid = commissions.filter((c) => c.status === 'Paid').reduce((s, c) => s + c.amount, 0);

  const handleApprove = (id: string) => {
    setConfirmModal({
      open: true,
      title: 'Approve Commission',
      desc: 'This will mark the commission as Approved and notify the affiliate.',
      action: () => { approveCommission(id); setConfirmModal((p) => ({ ...p, open: false })); },
    });
  };

  const handleMakePayable = (id: string) => {
    setConfirmModal({
      open: true,
      title: 'Make Commission Payable',
      desc: 'This will make the commission available for payout request.',
      action: () => { makeCommissionPayable(id); setConfirmModal((p) => ({ ...p, open: false })); },
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <DollarSign className="size-6 text-blue-500" />
            Commission Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review, approve, and manage all affiliate commission transactions.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Pending', value: formatCurrency(totalPending), color: 'amber' },
          { label: 'Approved', value: formatCurrency(totalApproved), color: 'blue' },
          { label: 'Payable', value: formatCurrency(totalPayable), color: 'violet' },
          { label: 'Paid', value: formatCurrency(totalPaid), color: 'emerald' },
        ].map((s) => (
          <div key={s.label} className={`rounded-2xl border p-4 ${
            s.color === 'amber' ? 'bg-amber-500/5 border-amber-500/20' :
            s.color === 'blue' ? 'bg-blue-500/5 border-blue-500/20' :
            s.color === 'violet' ? 'bg-violet-500/5 border-violet-500/20' :
            'bg-emerald-500/5 border-emerald-500/20'
          }`}>
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className={`text-xl font-bold mt-1 ${
              s.color === 'amber' ? 'text-amber-600' :
              s.color === 'blue' ? 'text-blue-600' :
              s.color === 'violet' ? 'text-violet-600' :
              'text-emerald-600'
            }`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by affiliate, customer or ID..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none">
          {STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none">
          {TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border bg-card/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Date</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Affiliate</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Customer</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Type</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Calculation</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Amount</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((c) => {
                const aff = affiliates.find((a) => a.id === c.affiliateId);
                const cust = customers.find((cu) => cu.id === c.customerId);
                return (
                  <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 text-xs text-muted-foreground">{c.date?.substring(0, 10)}</td>
                    <td className="px-4 py-3 text-xs font-medium text-foreground">{aff?.name || '—'}</td>
                    <td className="px-4 py-3">
                      <p className="text-xs font-medium text-foreground">{c.orgName || '—'}</p>
                      <p className="text-[11px] text-muted-foreground">{cust?.plan} plan</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{c.type}</td>
                    <td className="px-4 py-3 text-xs font-mono text-muted-foreground">
                      {cust && c.amount > 0
                        ? `${formatCurrency(cust.monthlyRevenue)} × ${Math.round((c.amount / cust.monthlyRevenue) * 100)}%`
                        : c.reference}
                    </td>
                    <td className={`px-4 py-3 text-right font-mono text-xs font-bold ${c.amount < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {c.amount < 0 ? '-' : '+'}{formatCurrency(Math.abs(c.amount))}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
                        c.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' :
                        c.status === 'Payable' ? 'bg-violet-500/10 text-violet-600 border-violet-500/20' :
                        c.status === 'Approved' ? 'bg-blue-500/10 text-blue-600 border-blue-500/20' :
                        c.status === 'Pending' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' :
                        'bg-rose-500/10 text-rose-600 border-rose-500/20'
                      }`}>{c.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        {c.status === 'Pending' && (
                          <button
                            onClick={() => handleApprove(c.id)}
                            className="text-[11px] font-medium px-2 py-1 rounded-lg bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 transition-colors"
                          >
                            Approve
                          </button>
                        )}
                        {c.status === 'Approved' && (
                          <button
                            onClick={() => handleMakePayable(c.id)}
                            className="text-[11px] font-medium px-2 py-1 rounded-lg bg-violet-500/10 text-violet-600 hover:bg-violet-500/20 transition-colors"
                          >
                            Make Payable
                          </button>
                        )}
                        {(c.status === 'Paid' || c.status === 'Payable') && (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-16 text-center text-muted-foreground text-sm">
                    No commissions match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="border-t border-border px-4 py-3 text-xs text-muted-foreground">
          Showing {filtered.length} of {commissions.length} transactions
        </div>
      </div>

      <ConfirmationModal
        isOpen={confirmModal.open}
        onClose={() => setConfirmModal((p) => ({ ...p, open: false }))}
        onConfirm={confirmModal.action}
        title={confirmModal.title}
        description={confirmModal.desc}
      />
    </div>
  );
}
