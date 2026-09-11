'use client';

import React, { useState } from 'react';
import {
  Tag,
  Plus,
  Copy,
  Check,
  Percent,
  Play,
  Calendar,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';
import { useAffiliateDemo } from '@/context/affiliate-demo-context';
import { formatCurrency, formatNumber } from '@/lib/affiliate/calculations';
import { useToast } from '@/context/toast-context';

export default function AffiliateCouponsPage() {
  const { coupons, activeAffiliate, requestCoupon, simulateCouponUsage } = useAffiliateDemo();
  const { showToast } = useToast();

  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Request form state
  const [code, setCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(20);
  const [description, setDescription] = useState('');

  const affiliateCoupons = coupons.filter(
    (c) => !c.affiliateId || c.affiliateId === activeAffiliate.id
  );

  const handleCopy = (couponCode: string) => {
    navigator.clipboard?.writeText(couponCode);
    setCopiedCode(couponCode);
    showToast('✓ Coupon Code Copied', couponCode, 'success');
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;

    requestCoupon({
      code: code.toUpperCase(),
      discount: `${discountPercent}% OFF First 3 Months`,
      discountPercent,
      description,
      affiliateId: activeAffiliate.id,
    });

    setCode('');
    setDescription('');
    setIsRequestModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Discount Coupons</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Offer exclusive discount codes to your club audience. Coupon redemptions automatically attribute referrals to your account.
          </p>
        </div>

        <button
          onClick={() => setIsRequestModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all self-start sm:self-auto"
        >
          <Plus className="size-4" />
          Request Custom Coupon
        </button>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl border border-border bg-card flex items-center gap-3">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Tag className="size-5" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Active Coupons</span>
            <p className="text-lg font-bold text-foreground">
              {affiliateCoupons.filter((c) => c.status === 'Active').length} Active Promo Codes
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-border bg-card flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <ShoppingBag className="size-5" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Total Redemptions</span>
            <p className="text-lg font-bold text-foreground">
              {formatNumber(affiliateCoupons.reduce((acc, c) => acc + c.usageCount, 0))} Uses
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-border bg-card flex items-center gap-3">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <Sparkles className="size-5" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Coupon Commission</span>
            <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
              {formatCurrency(affiliateCoupons.reduce((acc, c) => acc + c.commissionGenerated, 0))}
            </p>
          </div>
        </div>
      </div>

      {/* Coupons List Table */}
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border bg-muted/20 flex items-center justify-between">
          <h3 className="text-sm font-bold text-foreground">Available Coupons</h3>
          <span className="text-xs text-muted-foreground">Simulate coupon redemptions for client walkthrough</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-muted/40 border-b border-border text-muted-foreground font-semibold uppercase tracking-wider text-[10px]">
                <th className="p-4">Coupon Code</th>
                <th className="p-4">Discount Value</th>
                <th className="p-4 text-center">Redemptions</th>
                <th className="p-4 text-center">Paid Clubs</th>
                <th className="p-4 text-right">Commission</th>
                <th className="p-4">Expires</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {affiliateCoupons.map((coup) => {
                const isActive = coup.status === 'Active';
                return (
                  <tr key={coup.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-foreground bg-muted/80 px-2 py-1 rounded-lg border border-border">
                          {coup.code}
                        </span>
                        <button
                          onClick={() => handleCopy(coup.code)}
                          className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
                          title="Copy Code"
                        >
                          {copiedCode === coup.code ? (
                            <Check className="size-3 text-emerald-500" />
                          ) : (
                            <Copy className="size-3" />
                          )}
                        </button>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-1 max-w-xs truncate">
                        {coup.description}
                      </p>
                    </td>
                    <td className="p-4 font-semibold text-emerald-600 dark:text-emerald-400">
                      {coup.discount}
                    </td>
                    <td className="p-4 text-center font-bold text-foreground">
                      {formatNumber(coup.usageCount)}
                    </td>
                    <td className="p-4 text-center font-bold text-foreground">
                      {coup.customersReferred}
                    </td>
                    <td className="p-4 text-right font-bold text-foreground">
                      {formatCurrency(coup.commissionGenerated)}
                    </td>
                    <td className="p-4 text-muted-foreground">{coup.expirationDate}</td>
                    <td className="p-4 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          isActive
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                            : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300'
                        }`}
                      >
                        {coup.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {isActive ? (
                        <button
                          onClick={() => simulateCouponUsage(coup.id, 'Oakland Soccer Club')}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-all"
                          title="Simulate a customer using this coupon code"
                        >
                          <Play className="size-3" />
                          Simulate Usage
                        </button>
                      ) : (
                        <span className="text-[11px] text-muted-foreground italic">Pending Review</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Request Coupon Modal */}
      {isRequestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-card border border-border rounded-2xl p-6 shadow-2xl animate-in zoom-in-95">
            <h3 className="text-lg font-bold text-foreground">Request Custom Coupon Code</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Create a personalized voucher code for your audience. Requests appear immediately in the Admin Coupon Management queue.
            </p>

            <form onSubmit={handleRequest} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">Desired Coupon Code *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SQUADJAMES25"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="w-full text-xs font-mono font-bold uppercase bg-background border border-border rounded-xl px-3 py-2 text-foreground focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">Discount Level</label>
                <select
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(Number(e.target.value))}
                  className="w-full text-xs bg-background border border-border rounded-xl px-3 py-2 text-foreground focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value={10}>10% OFF First 3 Months</option>
                  <option value={15}>15% OFF First 3 Months</option>
                  <option value={20}>20% OFF First 3 Months (Standard)</option>
                  <option value={25}>25% OFF First 3 Months (Gold Partner)</option>
                  <option value={50}>50% OFF Month 1 (Promotional Blitz)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">Intended Audience & Placement</label>
                <textarea
                  rows={3}
                  placeholder="e.g. For our upcoming YouTube clinic video and podcast listeners..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full text-xs bg-background border border-border rounded-xl p-3 text-foreground focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsRequestModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-all"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
