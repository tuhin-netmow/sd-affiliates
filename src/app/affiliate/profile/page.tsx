'use client';

import React, { useState } from 'react';
import {
  User,
  Building,
  Globe,
  Phone,
  Mail,
  Share2,
  Save,
  CheckCircle2,
} from 'lucide-react';
import { useAffiliateDemo } from '@/context/affiliate-demo-context';
import { getTierBadgeClass } from '@/lib/affiliate/calculations';
import { useToast } from '@/context/toast-context';

export default function AffiliateProfilePage() {
  const { activeAffiliate } = useAffiliateDemo();
  const { showToast } = useToast();

  const [name, setName] = useState(activeAffiliate.name);
  const [company, setCompany] = useState(activeAffiliate.company);
  const [website, setWebsite] = useState(activeAffiliate.website);
  const [phone, setPhone] = useState(activeAffiliate.phone);
  const [country, setCountry] = useState(activeAffiliate.country);
  const [channels, setChannels] = useState(activeAffiliate.promotionalChannels.join(', '));
  const [twitter, setTwitter] = useState(activeAffiliate.socialLinks.twitter || '');
  const [youtube, setYoutube] = useState(activeAffiliate.socialLinks.youtube || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('✓ Profile Updated Successfully', 'Changes saved to frontend memory', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in duration-300">
      {/* Top Header */}
      <div>
        <h2 className="text-xl font-bold text-foreground">Partner Profile</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Manage your public affiliate details and verified marketing promotion channels.
        </p>
      </div>

      {/* Profile Card */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={activeAffiliate.avatar}
          alt={name}
          className="size-20 rounded-full object-cover border-2 border-emerald-500/40 ring-4 ring-emerald-500/10 shrink-0"
        />
        <div className="space-y-1.5 text-center sm:text-left flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h3 className="text-lg font-bold text-foreground">{name}</h3>
            <span className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getTierBadgeClass(activeAffiliate.tier)}`}>
              {activeAffiliate.tier} Tier Partner
            </span>
          </div>
          <p className="text-xs text-muted-foreground">{company}</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
            <span className="text-[11px] font-mono bg-muted px-2 py-0.5 rounded border border-border">
              Code: {activeAffiliate.referralCode}
            </span>
            <span className="text-[11px] text-muted-foreground">Joined {activeAffiliate.joinDate}</span>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSave} className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-6">
        <h4 className="text-sm font-bold text-foreground pb-3 border-b border-border">
          Personal & Organization Details
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">Full Legal Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-xs bg-background border border-border rounded-xl px-3 py-2 text-foreground focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">Company / Organization</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full text-xs bg-background border border-border rounded-xl px-3 py-2 text-foreground focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">Website URL</label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full text-xs bg-background border border-border rounded-xl px-3 py-2 text-foreground focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full text-xs bg-background border border-border rounded-xl px-3 py-2 text-foreground focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">Country</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full text-xs bg-background border border-border rounded-xl px-3 py-2 text-foreground focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">Promotional Channels</label>
            <input
              type="text"
              value={channels}
              onChange={(e) => setChannels(e.target.value)}
              className="w-full text-xs bg-background border border-border rounded-xl px-3 py-2 text-foreground focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
        </div>

        <h4 className="text-sm font-bold text-foreground pb-3 border-b border-border pt-4">
          Social Media Handles
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">Twitter / X Handle</label>
            <input
              type="text"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              className="w-full text-xs bg-background border border-border rounded-xl px-3 py-2 text-foreground focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">YouTube Channel</label>
            <input
              type="text"
              value={youtube}
              onChange={(e) => setYoutube(e.target.value)}
              className="w-full text-xs bg-background border border-border rounded-xl px-3 py-2 text-foreground focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-end pt-4 border-t border-border">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all"
          >
            <Save className="size-4" />
            Save Profile Changes
          </button>
        </div>
      </form>
    </div>
  );
}
