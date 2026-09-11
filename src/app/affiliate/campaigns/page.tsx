'use client';

import React, { useState } from 'react';
import {
  Megaphone,
  Plus,
  Play,
  Pause,
  Calendar,
  MousePointerClick,
  Users2,
  DollarSign,
  TrendingUp,
} from 'lucide-react';
import { useAffiliateDemo } from '@/context/affiliate-demo-context';
import { formatCurrency, formatNumber } from '@/lib/affiliate/calculations';
import { Campaign } from '@/types/affiliate';

export default function AffiliateCampaignsPage() {
  const { campaigns, createCampaign, updateCampaignStatus } = useAffiliateDemo();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().substring(0, 10));
  const [endDate, setEndDate] = useState('2026-12-31');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    createCampaign({
      name,
      description,
      startDate,
      endDate,
      status: 'Active',
    });
    setName('');
    setDescription('');
    setIsCreateModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Marketing Campaigns</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Participate in official SquadDeck seasonal campaigns and track dedicated conversion performance.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all self-start sm:self-auto"
        >
          <Plus className="size-4" />
          Create Custom Campaign
        </button>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {campaigns.map((camp) => {
          const isActive = camp.status === 'Active';
          return (
            <div
              key={camp.id}
              className={`rounded-2xl border p-6 flex flex-col justify-between shadow-sm transition-all duration-200 ${
                isActive
                  ? 'bg-card border-border hover:border-emerald-500/40'
                  : 'bg-muted/30 border-border opacity-85'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <Megaphone className="size-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground">{camp.name}</h3>
                      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mt-0.5">
                        <Calendar className="size-3" />
                        <span>{camp.startDate} to {camp.endDate}</span>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                        : 'bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400'
                    }`}
                  >
                    {camp.status}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                  {camp.description}
                </p>

                {/* Metrics Grid */}
                <div className="grid grid-cols-4 gap-2 mt-5 p-3 rounded-xl bg-muted/40 border border-border/80 text-center">
                  <div>
                    <span className="text-[10px] text-muted-foreground">Clicks</span>
                    <p className="text-xs font-bold text-foreground">{formatNumber(camp.clicks)}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground">Signups</span>
                    <p className="text-xs font-bold text-foreground">{formatNumber(camp.signups)}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground">Customers</span>
                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{camp.customers}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground">Commission</span>
                    <p className="text-xs font-bold text-foreground">{formatCurrency(camp.commission)}</p>
                  </div>
                </div>
              </div>

              {/* Action Controls */}
              <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground">
                  Revenue: <strong className="text-foreground">{formatCurrency(camp.revenue)}</strong>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateCampaignStatus(camp.id, isActive ? 'Paused' : 'Active')}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border text-xs font-semibold hover:bg-muted text-foreground transition-all"
                  >
                    {isActive ? (
                      <>
                        <Pause className="size-3.5 text-amber-500" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="size-3.5 text-emerald-500" />
                        Activate
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Campaign Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-card border border-border rounded-2xl p-6 shadow-2xl animate-in zoom-in-95">
            <h3 className="text-lg font-bold text-foreground">Create Custom Campaign</h3>
            <p className="text-xs text-muted-foreground mt-1">Group your promotional activities under a seasonal campaign name.</p>

            <form onSubmit={handleCreate} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">Campaign Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Spring Academy Blitz 2026"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs bg-background border border-border rounded-xl px-3 py-2 text-foreground focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Goals and target audience for this campaign..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full text-xs bg-background border border-border rounded-xl p-3 text-foreground focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full text-xs bg-background border border-border rounded-xl px-3 py-2 text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full text-xs bg-background border border-border rounded-xl px-3 py-2 text-foreground"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-all"
                >
                  Create Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
