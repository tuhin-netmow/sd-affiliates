'use client';

import React, { useState } from 'react';
import {
  CreditCard,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Banknote,
  User,
  DollarSign,
  AlertTriangle,
} from 'lucide-react';
import { useAffiliateDemo } from '@/context/affiliate-demo-context';
import { formatCurrency } from '@/lib/affiliate/calculations';
import { ConfirmationModal } from '@/components/shared/confirmation-modal';

const STATUSES = ['All', 'Pending', 'Approved', 'Processing', 'Paid', 'Rejected'];

export default function AdminPayoutsPage() {
  const { payouts, affiliates, approvePayout, markPayoutPaid } = useAffiliateDemo();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [confirmModal, setConfirmModal] = useState<{
    open: boolean; title: string; desc: string; action: () => void;
  }>({ open: false, title: '', desc: '', action: () => {} });

  const filtered = payouts.filter((p) => {
    const aff = affiliates.find((a) => a.id === p.affiliateId);
    const matchSearch =
      search === '' ||
      (aff?.name || '').toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const pendingTotal = payouts.filter((p) => p.status === 'Pending').reduce((s, p) => s + p.amount, 0);
  const approvedTotal = payouts.filter((p) => p.status === 'Approved').reduce((s, p) => s + p.amount, 0);
  const paidTotal = payouts.filter((p) => p.status === 'Paid').reduce((s, p) => s + p.amount, 0);

  const handleApprove = (id: string) => {
    setConfirmModal({
      open: true,
      title: 'Approve Payout',
      desc: 'This will approve the payout and notify the affiliate to prepare for payment.',
      action: () => { approvePayout(id); setConfirmModal((p) => ({ ...p, open: false })); },
    });
  };

  const handleMarkPaid = (id: string) => {
    setConfirmModal({
      open: true,
      title: 'Mark Payout as Paid',
      desc: 'This confirms the payout was sent. This action cannot be undone.',
      action: () => { markPayoutPaid(id); setConfirmModal((p) => ({ ...p, open: false })); },
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <CreditCard className="size-6 text-blue-500" />
            Payout Queue
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review and process affiliate payout requests. Minimum payout: $50.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: 'Pending Review', value: formatCurrency(pendingTotal), count: payouts.filter((p) => p.status === 'Pending').length, color: 'amber' },
          { label: 'Approved', value: formatCurrency(approvedTotal), count: payouts.filter((p) => p.status === 'Approved').length, color: 'blue' },
          { label: 'Total Paid', value: formatCurrency(paidTotal), count: payouts.filter((p) => p.status === 'Paid').length, color: 'emerald' },
        ].map((s) => (
          <div key={s.label} className={`rounded-2xl border p-4 ${
            s.color === 'amber' ? 'bg-amber-500/5 border-amber-500/20' :
            s.color === 'blue' ? 'bg-blue-500/5 border-blue-500/20' :
            'bg-emerald-500/5 border-emerald-500/20'
          }`}>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                s.color === 'amber' ? 'bg-amber-500 text-white' :
                s.color === 'blue' ? 'bg-blue-500 text-white' :
                'bg-emerald-500 text-white'
              }`}>{s.count}</span>
            </div>
            <p className={`text-xl font-bold mt-2 ${
              s.color === 'amber' ? 'text-amber-600' :
              s.color === 'blue' ? 'text-blue-600' :
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
            placeholder="Search by affiliate or reference..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none">
          {STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border bg-card/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Affiliate</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Amount</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Method</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Requested</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Reference</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((p) => {
                const aff = affiliates.find((a) => a.id === p.affiliateId);
                return (
                  <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="size-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                          <User className="size-4 text-blue-500" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-xs">{aff?.name}</p>
                          <p className="text-[11px] text-muted-foreground">{aff?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-bold text-foreground text-sm">
                      {formatCurrency(p.amount)}
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Banknote className="size-3.5 text-muted-foreground" />
                        {p.method}
                      </div>
                      {p.accountDetails && <p className="text-[11px] font-mono text-muted-foreground/70">{p.accountDetails}</p>}
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{p.requestedDate?.substring(0, 10)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
                        p.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' :
                        p.status === 'Approved' || p.status === 'Processing' ? 'bg-blue-500/10 text-blue-600 border-blue-500/20' :
                        p.status === 'Pending' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' :
                        'bg-rose-500/10 text-rose-600 border-rose-500/20'
                      }`}>{p.status}</span>
                    </td>
                    <td className="px-4 py-3 text-xs font-mono text-muted-foreground">{p.reference || '—'}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1.5">
                        {p.status === 'Pending' && (
                          <button
                            onClick={() => handleApprove(p.id)}
                            className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 transition-colors"
                          >
                            Approve
                          </button>
                        )}
                        {(p.status === 'Approved' || p.status === 'Processing') && (
                          <button
                            onClick={() => handleMarkPaid(p.id)}
                            className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 transition-colors"
                          >
                            Mark Paid
                          </button>
                        )}
                        {p.status === 'Paid' && (
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <CheckCircle2 className="size-3.5 text-emerald-500" /> Paid {p.processedDate?.substring(0, 10)}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-16 text-center text-muted-foreground text-sm">
                    No payout requests match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
