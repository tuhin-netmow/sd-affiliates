'use client';

import React, { useState } from 'react';
import { Award, Plus, Users2, DollarSign, BarChart3, Calendar, CheckCircle2, X } from 'lucide-react';
import { useAffiliateDemo } from '@/context/affiliate-demo-context';
import { formatCurrency } from '@/lib/affiliate/calculations';
import { useToast } from '@/context/toast-context';

const BONUS_TYPE_ICONS: Record<string, React.ReactNode> = {
  'customer-milestone': <Users2 className="size-4 text-blue-500" />,
  'revenue-milestone': <DollarSign className="size-4 text-emerald-500" />,
  'monthly': <Calendar className="size-4 text-violet-500" />,
  'campaign': <BarChart3 className="size-4 text-amber-500" />,
  'tier': <Award className="size-4 text-rose-500" />,
};

export default function AdminBonusesPage() {
  const { bonuses, affiliates } = useAffiliateDemo();
  const { showToast } = useToast();
  const [showCreate, setShowCreate] = useState(false);
  const [newBonus, setNewBonus] = useState({ name: '', description: '', reward: '100', type: 'customer-milestone' });

  const handleCreate = () => {
    if (!newBonus.name.trim()) { showToast('Bonus name is required.', 'error'); return; }
    showToast('Bonus milestone created!', 'success');
    setShowCreate(false);
    setNewBonus({ name: '', description: '', reward: '100', type: 'customer-milestone' });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Award className="size-6 text-blue-500" />
            Bonuses & Milestones
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Create performance bonus milestones to incentivize affiliate growth.
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors shadow-sm"
        >
          <Plus className="size-4" /> Create Bonus
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Bonuses', value: bonuses.length },
          { label: 'Achieved', value: bonuses.filter((b) => b.achieved).length },
          { label: 'In Progress', value: bonuses.filter((b) => !b.achieved && b.progress > 0).length },
          { label: 'Total Value', value: formatCurrency(bonuses.reduce((s, b) => s + b.reward, 0)) },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card/80 p-4 text-center">
            <p className="text-xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Bonus Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bonuses.map((bonus) => {
          const progressPct = Math.min(100, Math.round((bonus.progress / bonus.maxProgress) * 100));
          const aff = affiliates.find((a) => a.id === bonus.affiliateId);
          return (
            <div key={bonus.id} className={`rounded-2xl border p-5 space-y-4 transition-colors ${
              bonus.achieved ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-border bg-card/80'
            }`}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <div className="mt-0.5">{BONUS_TYPE_ICONS[bonus.type] || <Award className="size-4 text-muted-foreground" />}</div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                      {bonus.title}
                      {bonus.achieved && <CheckCircle2 className="size-4 text-emerald-500" />}
                    </h3>
                    {bonus.requirement && <p className="text-xs text-muted-foreground mt-0.5">{bonus.requirement}</p>}
                    {aff && <p className="text-xs text-blue-600 mt-0.5">Affiliate: {aff.name}</p>}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-lg font-extrabold text-foreground">{formatCurrency(bonus.reward)}</p>
                  <p className="text-xs text-muted-foreground">reward</p>
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold text-foreground">{bonus.progress} / {bonus.maxProgress}</span>
                </div>
                <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${bonus.achieved ? 'bg-emerald-500' : 'bg-blue-500'}`}
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{progressPct}% complete</span>
                  {bonus.achieved && <span className="text-emerald-600 font-semibold">✓ Achieved!</span>}
                </div>
              </div>

              {/* Type Badge */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border capitalize">
                  {bonus.type.replace('-', ' ')}
                </span>
                {bonus.expiryDate && (
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <Calendar className="size-3" /> Until {bonus.expiryDate.substring(0, 10)}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>


      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowCreate(false)}>
          <div className="w-full max-w-md bg-card border border-border rounded-2xl p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">Create Bonus Milestone</h2>
              <button onClick={() => setShowCreate(false)}><X className="size-5 text-muted-foreground hover:text-foreground" /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Bonus Name *</label>
                <input value={newBonus.name} onChange={(e) => setNewBonus((p) => ({ ...p, name: e.target.value }))} placeholder="e.g., First 10 Customers"
                  className="w-full mt-1.5 px-3 py-2.5 rounded-xl border border-border bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Bonus Type</label>
                <select value={newBonus.type} onChange={(e) => setNewBonus((p) => ({ ...p, type: e.target.value }))}
                  className="w-full mt-1.5 px-3 py-2.5 rounded-xl border border-border bg-muted text-sm focus:outline-none">
                  {['customer-milestone', 'revenue-milestone', 'monthly', 'campaign', 'tier'].map((t) => (
                    <option key={t} value={t} className="capitalize">{t.replace('-', ' ')}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Reward Amount ($)</label>
                <input type="number" min="1" value={newBonus.reward} onChange={(e) => setNewBonus((p) => ({ ...p, reward: e.target.value }))}
                  className="w-full mt-1.5 px-3 py-2.5 rounded-xl border border-border bg-muted text-sm focus:outline-none" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Description</label>
                <textarea value={newBonus.description} onChange={(e) => setNewBonus((p) => ({ ...p, description: e.target.value }))} rows={2}
                  className="w-full mt-1.5 px-3 py-2.5 rounded-xl border border-border bg-muted text-sm focus:outline-none resize-none" />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={handleCreate} className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">Create Bonus</button>
              <button onClick={() => setShowCreate(false)} className="flex-1 py-2.5 rounded-xl border border-border text-sm hover:bg-muted transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
