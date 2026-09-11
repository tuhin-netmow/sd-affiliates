'use client';

import React, { useState } from 'react';
import {
  Settings,
  Bell,
  CreditCard,
  Shield,
  Lock,
  FileText,
  Save,
  CheckCircle2,
} from 'lucide-react';
import { useAffiliateDemo } from '@/context/affiliate-demo-context';
import { useToast } from '@/context/toast-context';

export default function AffiliateSettingsPage() {
  const { activeAffiliate } = useAffiliateDemo();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'Account' | 'Notifications' | 'Payouts' | 'Security' | 'Privacy' | 'Terms'>('Account');

  // Form states
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [payoutAlerts, setPayoutAlerts] = useState(true);
  const [marketingTips, setMarketingTips] = useState(false);
  const [payoutMethod, setPayoutMethod] = useState(activeAffiliate.payoutMethod);
  const [payoutDetails, setPayoutDetails] = useState(activeAffiliate.payoutDetails);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('✓ Settings Updated', 'Preferences saved to demo state', 'success');
  };

  const tabs: Array<{ id: typeof activeTab; label: string; icon: React.ReactNode }> = [
    { id: 'Account', label: 'Account', icon: <Settings className="size-4" /> },
    { id: 'Notifications', label: 'Notifications', icon: <Bell className="size-4" /> },
    { id: 'Payouts', label: 'Payout Preferences', icon: <CreditCard className="size-4" /> },
    { id: 'Security', label: 'Security & 2FA', icon: <Shield className="size-4" /> },
    { id: 'Privacy', label: 'Privacy', icon: <Lock className="size-4" /> },
    { id: 'Terms', label: 'Affiliate Terms', icon: <FileText className="size-4" /> },
  ];

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in duration-300">
      {/* Top Header */}
      <div>
        <h2 className="text-xl font-bold text-foreground">Account & Partner Settings</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Configure withdrawal preferences, notification triggers, and security controls.
        </p>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all border-b-2 -mb-px ${
              activeTab === tab.id
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <form onSubmit={handleSave} className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-6">
        {activeTab === 'Account' && (
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-foreground">General Account Preferences</h4>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-foreground mb-1">Email Address</label>
                <input
                  type="email"
                  defaultValue={activeAffiliate.email}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2 text-foreground"
                />
              </div>
              <div>
                <label className="block font-semibold text-foreground mb-1">Timezone</label>
                <select className="w-full bg-background border border-border rounded-xl px-3 py-2 text-foreground">
                  <option>Eastern Time (US & Canada) - UTC-05:00</option>
                  <option>Pacific Time (US & Canada) - UTC-08:00</option>
                  <option>Greenwich Mean Time (London) - UTC+00:00</option>
                  <option>Central European Time (Berlin) - UTC+01:00</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Notifications' && (
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-foreground">Email & In-App Alerts</h4>
            <div className="space-y-3 text-xs">
              <label className="flex items-center justify-between p-3 rounded-xl border border-border bg-muted/20 cursor-pointer">
                <div>
                  <span className="font-semibold text-foreground block">New Referral Signup Alert</span>
                  <span className="text-[11px] text-muted-foreground">Receive instant email when a club signs up via your link</span>
                </div>
                <input
                  type="checkbox"
                  checked={emailNotifs}
                  onChange={(e) => setEmailNotifs(e.target.checked)}
                  className="size-4 accent-emerald-600 rounded"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-border bg-muted/20 cursor-pointer">
                <div>
                  <span className="font-semibold text-foreground block">Commission Approval & Payout Notifications</span>
                  <span className="text-[11px] text-muted-foreground">Alert when monthly commissions are approved and disbursed</span>
                </div>
                <input
                  type="checkbox"
                  checked={payoutAlerts}
                  onChange={(e) => setPayoutAlerts(e.target.checked)}
                  className="size-4 accent-emerald-600 rounded"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-border bg-muted/20 cursor-pointer">
                <div>
                  <span className="font-semibold text-foreground block">Partner Growth Tips & Campaign Announcements</span>
                  <span className="text-[11px] text-muted-foreground">Quarterly promotion bonus announcements and marketing assets</span>
                </div>
                <input
                  type="checkbox"
                  checked={marketingTips}
                  onChange={(e) => setMarketingTips(e.target.checked)}
                  className="size-4 accent-emerald-600 rounded"
                />
              </label>
            </div>
          </div>
        )}

        {activeTab === 'Payouts' && (
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-foreground">Default Payout Settings</h4>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-foreground mb-1">Primary Payment Gateway</label>
                <select
                  value={payoutMethod}
                  onChange={(e) => setPayoutMethod(e.target.value as any)}
                  className="w-full bg-background border border-border rounded-xl px-3 py-2 text-foreground"
                >
                  <option value="PayPal">PayPal</option>
                  <option value="Bank Transfer">Direct Bank Wire</option>
                  <option value="Stripe Direct">Stripe Direct Connect</option>
                  <option value="Wise">Wise Multi-Currency</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-foreground mb-1">Account / IBAN / Email Identifier</label>
                <input
                  type="text"
                  value={payoutDetails}
                  onChange={(e) => setPayoutDetails(e.target.value)}
                  className="w-full font-mono bg-background border border-border rounded-xl px-3 py-2 text-foreground"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Security' && (
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-foreground">Security & Two-Factor Authentication</h4>
            <div className="p-4 rounded-xl bg-muted/40 border border-border text-xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-foreground">Two-Factor Authentication (2FA)</span>
                  <p className="text-[11px] text-muted-foreground">Authenticator app (TOTP) protection enabled</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Active
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Privacy' && (
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-foreground">Privacy & Data Sharing</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Your contact details are strictly kept private and only utilized for commission disbursement compliance.
            </p>
          </div>
        )}

        {activeTab === 'Terms' && (
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-foreground">SquadDeck Affiliate Agreement</h4>
            <div className="p-4 rounded-xl bg-muted/40 border border-border text-xs text-muted-foreground space-y-2 max-h-48 overflow-y-auto">
              <p>1. Commissions are earned on valid, paid customer subscriptions from unique sports clubs.</p>
              <p>2. Attribution is calculated on a 90-day cookie window on a last-touch basis.</p>
              <p>3. Self-referrals and search-ad bidding on brand trademarks are strictly prohibited.</p>
              <p>4. Payouts require a minimum available balance of $50.00 USD.</p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-end pt-4 border-t border-border">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all"
          >
            <Save className="size-4" />
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
}
