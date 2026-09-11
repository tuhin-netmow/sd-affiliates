'use client';

import React, { useState } from 'react';
import { Tag, Plus, Search, CheckCircle2, XCircle, Edit3, Power, X, Percent, DollarSign } from 'lucide-react';
import { useAffiliateDemo } from '@/context/affiliate-demo-context';
import { formatCurrency } from '@/lib/affiliate/calculations';
import { useToast } from '@/context/toast-context';

const STATUS_COLORS: Record<string, string> = {
  Active: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  Inactive: 'bg-muted text-muted-foreground border-border',
  Pending: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  Expired: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
};

export default function AdminCouponsPage() {
  const { coupons, approveCoupon, affiliates, requestCoupon } = useAffiliateDemo();
  const { showToast } = useToast();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showCreate, setShowCreate] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [newDiscount, setNewDiscount] = useState('20');
  const [newAffId, setNewAffId] = useState(affiliates[0]?.id || '');

  const filtered = coupons.filter((c) => {
    const aff = affiliates.find((a) => a.id === c.affiliateId);
    const matchSearch = search === '' || c.code.toLowerCase().includes(search.toLowerCase()) || (aff?.name || '').toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleApprove = (id: string) => {
    approveCoupon(id);
    showToast('Coupon approved and activated.', 'success');
  };

  const handleCreate = () => {
    if (!newCode.trim()) { showToast('Coupon code is required.', 'error'); return; }
    requestCoupon({
      code: newCode.toUpperCase(),
      discountPercent: parseFloat(newDiscount),
      affiliateId: newAffId,
      status: 'Active',
    });
    setNewCode('');
    setNewDiscount('20');
    setShowCreate(false);
    showToast('Coupon created!', 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Tag className="size-6 text-blue-500" />
            Coupon Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Approve, create, and manage affiliate discount coupons.
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors shadow-sm"
        >
          <Plus className="size-4" /> Create Coupon
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {['Active', 'Pending', 'Inactive', 'Expired'].map((status) => (
          <div key={status} className={`rounded-2xl border p-4 text-center ${STATUS_COLORS[status]}`}>
            <p className="text-2xl font-bold">{coupons.filter((c) => c.status === status).length}</p>
            <p className="text-xs mt-1">{status}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by code or affiliate..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none">
          {['All', 'Active', 'Pending', 'Inactive', 'Expired'].map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border bg-card/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Code</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Affiliate</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Discount</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Uses</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Revenue</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Commission</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Expires</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((c) => {
                const aff = affiliates.find((a) => a.id === c.affiliateId);
                return (
                  <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-lg">{c.code}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-foreground">{aff?.name || '—'}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="font-bold text-violet-600">{c.discountPercent}% OFF</span>
                    </td>
                    <td className="px-4 py-3 text-center text-xs font-semibold text-foreground">{c.usageCount}</td>
                    <td className="px-4 py-3 text-right font-mono text-xs text-foreground">{formatCurrency(c.revenueGenerated || 0)}</td>
                    <td className="px-4 py-3 text-right font-mono text-xs text-emerald-600">{formatCurrency(c.commissionGenerated || 0)}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{c.expirationDate?.substring(0, 10) || '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${STATUS_COLORS[c.status]}`}>{c.status}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {c.status === 'Pending' && (
                        <button onClick={() => handleApprove(c.id)}
                          className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 transition-colors">
                          Approve
                        </button>
                      )}
                      {c.status !== 'Pending' && <span className="text-xs text-muted-foreground">—</span>}
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-16 text-center text-muted-foreground text-sm">
                    No coupons found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowCreate(false)}>
          <div className="w-full max-w-md bg-card border border-border rounded-2xl p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">Create Coupon</h2>
              <button onClick={() => setShowCreate(false)}><X className="size-5 text-muted-foreground hover:text-foreground" /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Coupon Code *</label>
                <input value={newCode} onChange={(e) => setNewCode(e.target.value.toUpperCase())} placeholder="e.g., SQUAD20"
                  className="w-full mt-1.5 px-3 py-2.5 rounded-xl border border-border bg-muted text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-blue-500/30" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Discount Percent</label>
                <div className="flex items-center gap-2 mt-1.5">
                  <input type="number" min="1" max="100" value={newDiscount} onChange={(e) => setNewDiscount(e.target.value)}
                    className="w-24 px-3 py-2.5 rounded-xl border border-border bg-muted text-sm font-bold text-center focus:outline-none" />
                  <span className="text-lg font-bold text-foreground">%</span>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Assign to Affiliate</label>
                <select value={newAffId} onChange={(e) => setNewAffId(e.target.value)}
                  className="w-full mt-1.5 px-3 py-2.5 rounded-xl border border-border bg-muted text-sm focus:outline-none">
                  {affiliates.filter((a) => a.status === 'Active').map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={handleCreate} className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">Create</button>
              <button onClick={() => setShowCreate(false)} className="flex-1 py-2.5 rounded-xl border border-border text-sm hover:bg-muted transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
