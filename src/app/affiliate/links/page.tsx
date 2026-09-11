'use client';

import React, { useState } from 'react';
import {
  Link2,
  Plus,
  Copy,
  Trash2,
  ExternalLink,
  BarChart2,
  Check,
  MousePointerClick,
  Users2,
  DollarSign,
  Search,
} from 'lucide-react';
import { useAffiliateDemo } from '@/context/affiliate-demo-context';
import { formatCurrency, formatNumber } from '@/lib/affiliate/calculations';
import { useToast } from '@/context/toast-context';
import { ConfirmationModal } from '@/components/shared/confirmation-modal';

export default function ReferralLinksPage() {
  const { referralLinks, createReferralLink, deleteReferralLink, activeAffiliate, campaigns } = useAffiliateDemo();
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [campaignId, setCampaignId] = useState('');
  const [landingPage, setLandingPage] = useState('/sports/basketball');
  const [utmSource, setUtmSource] = useState('youtube');
  const [utmMedium, setUtmMedium] = useState('social_video');
  const [utmCampaign, setUtmCampaign] = useState('summer_growth');

  const links = referralLinks.filter(
    (l) => l.affiliateId === activeAffiliate.id || l.affiliateId === 'aff-1'
  );

  const filteredLinks = links.filter(
    (l) =>
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard?.writeText(url);
    setCopiedId(id);
    showToast('✓ Link Copied to Clipboard', url, 'success');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !code) return;

    createReferralLink({
      name,
      code: code.toUpperCase(),
      landingPage,
      campaignId: campaignId || undefined,
      utmSource,
      utmMedium,
      utmCampaign,
      affiliateId: activeAffiliate.id,
    });

    setName('');
    setCode('');
    setIsCreateModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">My Referral Links</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Create and track custom URLs to promote SquadDeck across your channels.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all self-start sm:self-auto"
        >
          <Plus className="size-4" />
          Create New Link
        </button>
      </div>

      {/* Summary KPI Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl border border-border bg-card flex items-center gap-3">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Link2 className="size-5" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Active Links</span>
            <p className="text-lg font-bold text-foreground">{links.length} Tracked URLs</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-border bg-card flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <MousePointerClick className="size-5" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Total Clicks</span>
            <p className="text-lg font-bold text-foreground">
              {formatNumber(links.reduce((acc, l) => acc + l.clicks, 0))}
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-border bg-card flex items-center gap-3">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <DollarSign className="size-5" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Commission Generated</span>
            <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
              {formatCurrency(links.reduce((acc, l) => acc + l.commission, 0))}
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="relative">
        <Search className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by link name, referral code, or URL..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-xs pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm"
        />
      </div>

      {/* Referral Links Table */}
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        {filteredLinks.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="size-12 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
              <Link2 className="size-6" />
            </div>
            <h4 className="text-sm font-bold text-foreground">No referral links found</h4>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Create your first customized referral link to start tracking visitors and earning recurring commissions.
            </p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold"
            >
              <Plus className="size-3.5" />
              Create Referral Link
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-muted/40 border-b border-border text-muted-foreground font-semibold uppercase tracking-wider text-[10px]">
                  <th className="p-4">Link Name & Code</th>
                  <th className="p-4">Destination URL</th>
                  <th className="p-4 text-center">Clicks</th>
                  <th className="p-4 text-center">Signups</th>
                  <th className="p-4 text-center">Paid Customers</th>
                  <th className="p-4 text-right">Commission</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredLinks.map((link) => (
                  <tr key={link.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-foreground">{link.name}</div>
                      <div className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded mt-0.5">
                        {link.code}
                      </div>
                    </td>
                    <td className="p-4 font-mono text-[11px] text-muted-foreground max-w-xs truncate">
                      <span title={link.url}>{link.url}</span>
                    </td>
                    <td className="p-4 text-center font-semibold text-foreground">
                      {formatNumber(link.clicks)}
                    </td>
                    <td className="p-4 text-center font-semibold text-foreground">
                      {formatNumber(link.signups)}
                    </td>
                    <td className="p-4 text-center font-semibold text-emerald-600 dark:text-emerald-400">
                      {link.customers}
                    </td>
                    <td className="p-4 text-right font-bold text-foreground">
                      {formatCurrency(link.commission)}
                    </td>
                    <td className="p-4 text-center">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800">
                        {link.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleCopy(link.url, link.id)}
                          className="p-1.5 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
                          title="Copy Link"
                        >
                          {copiedId === link.id ? (
                            <Check className="size-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="size-3.5" />
                          )}
                        </button>
                        <button
                          onClick={() => setDeleteTargetId(link.id)}
                          className="p-1.5 rounded-lg border border-border hover:bg-rose-50 dark:hover:bg-rose-950/50 text-muted-foreground hover:text-rose-600 transition-all"
                          title="Delete Link"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create Link Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-card border border-border rounded-2xl p-6 shadow-2xl animate-in zoom-in-95">
            <h3 className="text-lg font-bold text-foreground">Create New Referral Link</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Configure your tracking parameters for complete campaign attribution.
            </p>

            <form onSubmit={handleCreate} className="mt-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">Link Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. YouTube Description Sponsor"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs bg-background border border-border rounded-xl px-3 py-2 text-foreground focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">Referral Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. COACHPRO"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    className="w-full text-xs font-mono font-bold uppercase bg-background border border-border rounded-xl px-3 py-2 text-foreground focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">Landing Page</label>
                  <select
                    value={landingPage}
                    onChange={(e) => setLandingPage(e.target.value)}
                    className="w-full text-xs bg-background border border-border rounded-xl px-3 py-2 text-foreground focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="/sports/basketball">/sports/basketball (Basketball Clubs)</option>
                    <option value="/sports/football">/sports/football (Soccer / Football)</option>
                    <option value="/sports/hockey">/sports/hockey (Hockey Academies)</option>
                    <option value="/pricing">/pricing (SquadDeck Pricing)</option>
                    <option value="/demo">/demo (Interactive Product Tour)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">Associated Campaign</label>
                  <select
                    value={campaignId}
                    onChange={(e) => setCampaignId(e.target.value)}
                    className="w-full text-xs bg-background border border-border rounded-xl px-3 py-2 text-foreground focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="">None (Standalone)</option>
                    {campaigns.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-muted/40 border border-border space-y-3">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">UTM Tracking Parameters</span>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <label className="block text-[10px] text-muted-foreground mb-0.5">UTM Source</label>
                    <input
                      type="text"
                      value={utmSource}
                      onChange={(e) => setUtmSource(e.target.value)}
                      placeholder="youtube"
                      className="w-full text-xs bg-background border border-border rounded-lg px-2.5 py-1.5 text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-muted-foreground mb-0.5">UTM Medium</label>
                    <input
                      type="text"
                      value={utmMedium}
                      onChange={(e) => setUtmMedium(e.target.value)}
                      placeholder="social_video"
                      className="w-full text-xs bg-background border border-border rounded-lg px-2.5 py-1.5 text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-muted-foreground mb-0.5">UTM Campaign</label>
                    <input
                      type="text"
                      value={utmCampaign}
                      onChange={(e) => setUtmCampaign(e.target.value)}
                      placeholder="summer_2026"
                      className="w-full text-xs bg-background border border-border rounded-lg px-2.5 py-1.5 text-foreground"
                    />
                  </div>
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
                  Create Referral Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteTargetId !== null}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={() => {
          if (deleteTargetId) deleteReferralLink(deleteTargetId);
        }}
        title="Delete Referral Link?"
        description="Are you sure you want to delete this referral link? Any future clicks to this specific tracking code will no longer be attributed."
        confirmText="Yes, Delete Link"
      />
    </div>
  );
}
