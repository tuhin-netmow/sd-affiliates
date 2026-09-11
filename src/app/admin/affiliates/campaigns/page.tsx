'use client';

import React, { useState } from 'react';
import {
  Megaphone,
  Plus,
  Search,
  Play,
  Pause,
  Square,
  Edit3,
  Trash2,
  Calendar,
  MousePointerClick,
  UserPlus,
  DollarSign,
  X,
} from 'lucide-react';
import { useAffiliateDemo } from '@/context/affiliate-demo-context';
import { formatCurrency } from '@/lib/affiliate/calculations';
import { ConfirmationModal } from '@/components/shared/confirmation-modal';
import { useToast } from '@/context/toast-context';
import type { CampaignStatus } from '@/types/affiliate';

const STATUS_COLORS: Record<string, string> = {
  Active: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  Paused: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  Ended: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
  Draft: 'bg-muted text-muted-foreground border-border',
};

export default function AdminCampaignsPage() {
  const { campaigns, updateCampaignStatus, createCampaign, affiliates } = useAffiliateDemo();
  const { showToast } = useToast();
  const [search, setSearch] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [newCampaignName, setNewCampaignName] = useState('');
  const [newCampaignDesc, setNewCampaignDesc] = useState('');
  const [confirmModal, setConfirmModal] = useState<{
    open: boolean; title: string; desc: string; action: () => void;
  }>({ open: false, title: '', desc: '', action: () => {} });

  const filtered = campaigns.filter(
    (c) => search === '' || c.name.toLowerCase().includes(search.toLowerCase()) || (c.description || '').toLowerCase().includes(search.toLowerCase())
  );

  const handleStatusChange = (id: string, status: CampaignStatus, label: string) => {
    setConfirmModal({
      open: true,
      title: `${label} Campaign`,
      desc: `Are you sure you want to ${label.toLowerCase()} this campaign?`,
      action: () => { updateCampaignStatus(id, status); setConfirmModal((p) => ({ ...p, open: false })); },
    });
  };

  const handleCreate = () => {
    if (!newCampaignName.trim()) { showToast('Campaign name is required.', 'error'); return; }
    createCampaign({ name: newCampaignName, description: newCampaignDesc, status: 'Active' });
    setNewCampaignName('');
    setNewCampaignDesc('');
    setShowCreate(false);
    showToast('Campaign created successfully!', 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Megaphone className="size-6 text-blue-500" />
            Campaign Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Create, activate, pause, and end affiliate campaigns.
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors shadow-sm"
        >
          <Plus className="size-4" />
          Create Campaign
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {['Active', 'Paused', 'Ended', 'Draft'].map((status) => (
          <div key={status} className="rounded-2xl border border-border bg-card/80 p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{campaigns.filter((c) => c.status === status).length}</p>
            <p className="text-xs text-muted-foreground mt-1">{status}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search campaigns..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
        />
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((campaign) => (
          <div key={campaign.id} className="rounded-2xl border border-border bg-card/80 p-5 space-y-4 hover:border-blue-500/30 transition-colors">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-foreground">{campaign.name}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${STATUS_COLORS[campaign.status]}`}>
                    {campaign.status}
                  </span>
                </div>
                {campaign.description && <p className="text-xs text-muted-foreground mt-1">{campaign.description}</p>}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Clicks', value: campaign.clicks || 0, icon: <MousePointerClick className="size-3" /> },
                { label: 'Signups', value: campaign.signups || 0, icon: <UserPlus className="size-3" /> },
                { label: 'Revenue', value: formatCurrency(campaign.revenue || 0), icon: <DollarSign className="size-3" /> },
              ].map((s) => (
                <div key={s.label} className="rounded-xl bg-muted/40 p-2.5 text-center">
                  <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">{s.icon}<span className="text-[10px]">{s.label}</span></div>
                  <p className="text-sm font-bold text-foreground">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Dates */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Calendar className="size-3" /> Start: {campaign.startDate?.substring(0, 10)}</span>
              {campaign.endDate && <span>End: {campaign.endDate.substring(0, 10)}</span>}
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-1 border-t border-border">
              {campaign.status !== 'Active' && campaign.status !== 'Completed' && (
                <button
                  onClick={() => handleStatusChange(campaign.id, 'Active', 'Activate')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 text-xs font-semibold hover:bg-emerald-500/20 transition-colors"
                >
                  <Play className="size-3.5" /> Activate
                </button>
              )}
              {campaign.status === 'Active' && (
                <button
                  onClick={() => handleStatusChange(campaign.id, 'Paused', 'Pause')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-600 text-xs font-semibold hover:bg-amber-500/20 transition-colors"
                >
                  <Pause className="size-3.5" /> Pause
                </button>
              )}
              {campaign.status !== 'Completed' && (
                <button
                  onClick={() => handleStatusChange(campaign.id, 'Completed', 'End')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-600 text-xs font-semibold hover:bg-rose-500/20 transition-colors"
                >
                  <Square className="size-3.5" /> End
                </button>
              )}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-2 rounded-2xl border border-dashed border-border p-16 text-center">
            <Megaphone className="size-10 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No campaigns found.</p>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowCreate(false)}>
          <div className="w-full max-w-md bg-card border border-border rounded-2xl p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">Create Campaign</h2>
              <button onClick={() => setShowCreate(false)} className="text-muted-foreground hover:text-foreground"><X className="size-5" /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Campaign Name *</label>
                <input
                  value={newCampaignName}
                  onChange={(e) => setNewCampaignName(e.target.value)}
                  placeholder="e.g., Summer Sports Campaign"
                  className="w-full mt-1.5 px-3 py-2.5 rounded-xl border border-border bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Description</label>
                <textarea
                  value={newCampaignDesc}
                  onChange={(e) => setNewCampaignDesc(e.target.value)}
                  rows={3}
                  placeholder="Campaign description..."
                  className="w-full mt-1.5 px-3 py-2.5 rounded-xl border border-border bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 resize-none"
                />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={handleCreate} className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
                Create Campaign
              </button>
              <button onClick={() => setShowCreate(false)} className="flex-1 py-2.5 rounded-xl border border-border text-sm hover:bg-muted transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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
