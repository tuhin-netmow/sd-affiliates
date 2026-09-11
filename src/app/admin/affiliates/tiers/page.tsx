'use client';

import React, { useState } from 'react';
import { Layers, Edit3, Save, CheckCircle2, Users2, DollarSign, Percent, Star } from 'lucide-react';
import { useAffiliateDemo } from '@/context/affiliate-demo-context';
import { formatCurrency } from '@/lib/affiliate/calculations';
import { useToast } from '@/context/toast-context';

const TIER_STYLES: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  Bronze: {
    bg: 'from-amber-900/20 to-amber-800/10',
    border: 'border-amber-700/40',
    text: 'text-amber-700 dark:text-amber-400',
    badge: 'bg-amber-500/20 text-amber-700 dark:text-amber-300',
  },
  Silver: {
    bg: 'from-slate-500/20 to-slate-400/10',
    border: 'border-slate-500/40',
    text: 'text-slate-600 dark:text-slate-300',
    badge: 'bg-slate-500/20 text-slate-700 dark:text-slate-300',
  },
  Gold: {
    bg: 'from-yellow-500/20 to-yellow-400/10',
    border: 'border-yellow-500/40',
    text: 'text-yellow-700 dark:text-yellow-400',
    badge: 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300',
  },
  Platinum: {
    bg: 'from-cyan-500/20 to-cyan-400/10',
    border: 'border-cyan-500/40',
    text: 'text-cyan-700 dark:text-cyan-300',
    badge: 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300',
  },
};

export default function AdminTiersPage() {
  const { tiers, affiliates } = useAffiliateDemo();
  const { showToast } = useToast();
  const [localTiers, setLocalTiers] = useState(tiers);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editBuf, setEditBuf] = useState<Record<string, Partial<typeof tiers[0]>>>({});

  const startEdit = (tier: typeof tiers[0]) => {
    setEditingId(tier.id);
    setEditBuf({ [tier.id]: { ...tier } });
  };

  const saveEdit = (tierId: string) => {
    setLocalTiers((prev) => prev.map((t) => t.id === tierId ? { ...t, ...editBuf[tierId] } : t));
    setEditingId(null);
    showToast('Tier configuration updated.', 'success');
  };

  const updateBuf = (tierId: string, key: string, value: string | number) => {
    setEditBuf((prev) => ({ ...prev, [tierId]: { ...prev[tierId], [key]: value } }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Layers className="size-6 text-blue-500" />
          Affiliate Tiers
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Configure tier thresholds, commission rates, and benefits. Affiliates advance automatically as they grow.
        </p>
      </div>

      {/* Affiliate Distribution */}
      <div className="rounded-2xl border border-border bg-card/80 p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Current Affiliate Distribution</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {['Bronze', 'Silver', 'Gold', 'Platinum'].map((tier) => {
            const count = affiliates.filter((a) => a.tier === tier).length;
            const style = TIER_STYLES[tier];
            return (
              <div key={tier} className={`rounded-xl p-3 text-center border ${style.border}`}>
                <p className={`text-xl font-extrabold ${style.text}`}>{count}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{tier} affiliates</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {localTiers.map((tier) => {
          const style = TIER_STYLES[tier.name] || TIER_STYLES.Bronze;
          const isEditing = editingId === tier.id;
          const buf = editBuf[tier.id] || {};
          const affiliateCount = affiliates.filter((a) => a.tier === tier.name).length;

          return (
            <div key={tier.id} className={`rounded-2xl border bg-gradient-to-br ${style.bg} ${style.border} p-5 space-y-4`}>
              {/* Tier Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className={`size-5 ${style.text}`} />
                  <span className={`text-lg font-extrabold ${style.text}`}>{tier.name}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${style.badge}`}>
                    {affiliateCount} affiliates
                  </span>
                </div>
                {!isEditing && (
                  <button onClick={() => startEdit(tier)} className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-muted transition-colors">
                    <Edit3 className="size-4" />
                  </button>
                )}
              </div>

              {/* Commission Rate */}
              <div className="rounded-xl bg-background/60 border border-border p-3">
                <p className="text-xs text-muted-foreground mb-1">Commission Rate</p>
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={(buf.commissionRate || tier.commissionRate) * 100}
                      onChange={(e) => updateBuf(tier.id, 'commissionRate', parseFloat(e.target.value) / 100)}
                      className="w-20 px-2 py-1 rounded-lg border border-border bg-background text-lg font-bold text-center focus:outline-none"
                    />
                    <span className="text-xl font-bold text-foreground">%</span>
                  </div>
                ) : (
                  <p className={`text-2xl font-extrabold ${style.text}`}>{Math.round(tier.commissionRate * 100)}%</p>
                )}
              </div>

              {/* Thresholds */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-background/60 border border-border p-3">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    <Users2 className="size-3" /> Min. Customers
                  </div>
                  {isEditing ? (
                    <input
                      type="number"
                      min="0"
                      value={buf.minCustomers ?? tier.minCustomers}
                      onChange={(e) => updateBuf(tier.id, 'minCustomers', parseInt(e.target.value))}
                      className="w-full px-2 py-1 rounded-lg border border-border bg-background text-sm font-bold focus:outline-none"
                    />
                  ) : (
                    <p className="text-lg font-bold text-foreground">{tier.minCustomers}</p>
                  )}
                </div>
                <div className="rounded-xl bg-background/60 border border-border p-3">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    <DollarSign className="size-3" /> Min. Revenue
                  </div>
                  {isEditing ? (
                    <input
                      type="number"
                      min="0"
                      value={buf.minRevenue ?? tier.minRevenue}
                      onChange={(e) => updateBuf(tier.id, 'minRevenue', parseInt(e.target.value))}
                      className="w-full px-2 py-1 rounded-lg border border-border bg-background text-sm font-bold focus:outline-none"
                    />
                  ) : (
                    <p className="text-lg font-bold text-foreground">{formatCurrency(tier.minRevenue)}</p>
                  )}
                </div>
              </div>

              {/* Benefits */}
              <div className="rounded-xl bg-background/60 border border-border p-3">
                <p className="text-xs text-muted-foreground mb-2">Benefits</p>
                <ul className="space-y-1">
                  {tier.benefits.map((b, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-foreground">
                      <CheckCircle2 className={`size-3.5 shrink-0 ${style.text}`} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Edit Buttons */}
              {isEditing && (
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => saveEdit(tier.id)}
                    className="flex-1 py-2 rounded-xl text-xs font-bold bg-foreground text-background hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
                  >
                    <Save className="size-3.5" /> Save Changes
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="flex-1 py-2 rounded-xl text-xs font-medium border border-border hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Tier Progression Table */}
      <div className="rounded-2xl border border-border bg-card/80 overflow-hidden">
        <div className="px-4 py-3 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">Tier Progression Overview</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Tier</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Commission</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Min. Customers</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Min. Revenue</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground">Current Members</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {localTiers.map((tier) => {
                const style = TIER_STYLES[tier.name];
                return (
                  <tr key={tier.id} className="hover:bg-muted/30">
                    <td className={`px-4 py-3 font-bold ${style.text}`}>{tier.name}</td>
                    <td className={`px-4 py-3 text-center font-mono font-bold ${style.text}`}>{Math.round(tier.commissionRate * 100)}%</td>
                    <td className="px-4 py-3 text-center text-foreground">{tier.minCustomers}+</td>
                    <td className="px-4 py-3 text-center text-foreground">{formatCurrency(tier.minRevenue)}+</td>
                    <td className="px-4 py-3 text-center font-semibold text-foreground">
                      {affiliates.filter((a) => a.tier === tier.name).length}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
