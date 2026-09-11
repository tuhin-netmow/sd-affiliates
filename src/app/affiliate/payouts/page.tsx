'use client';

import React, { useState } from 'react';
import {
  CreditCard,
  Plus,
  DollarSign,
  Calendar,
  CheckCircle2,
  Clock,
  SendHorizontal,
  Info,
} from 'lucide-react';
import { useAffiliateDemo } from '@/context/affiliate-demo-context';
import { formatCurrency, getPayoutStatusBadge } from '@/lib/affiliate/calculations';
import { PayoutMethod } from '@/types/affiliate';
import { useToast } from '@/context/toast-context';

export default function AffiliatePayoutsPage() {
  const { activeAffiliate, payouts, requestPayout } = useAffiliateDemo();
  const { showToast } = useToast();

  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [amount, setAmount] = useState<number>(activeAffiliate.stats.currentBalance || 100);
  const [method, setMethod] = useState<PayoutMethod>(activeAffiliate.payoutMethod || 'PayPal');
  const [accountDetails, setAccountDetails] = useState(activeAffiliate.payoutDetails || '');

  const affPayouts = payouts.filter(
    (p) => p.affiliateId === activeAffiliate.id || p.affiliateId === 'aff-1'
  );

  const handleRequestPayout = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount < 50) {
      showToast('Minimum payout is $50.00', undefined, 'warning');
      return;
    }

    requestPayout(activeAffiliate.id, amount, method, accountDetails);
    setIsRequestModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Payouts & Withdrawals</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Request manual withdrawals or configure your automated monthly disbursement method.
          </p>
        </div>

        <button
          onClick={() => {
            setAmount(activeAffiliate.stats.currentBalance > 50 ? activeAffiliate.stats.currentBalance : 50);
            setIsRequestModalOpen(true);
          }}
          disabled={activeAffiliate.stats.currentBalance < 50}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:pointer-events-none text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all self-start sm:self-auto"
        >
          <SendHorizontal className="size-4" />
          Request Payout ({formatCurrency(activeAffiliate.stats.currentBalance)})
        </button>
      </div>

      {/* Overview KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Available Balance</span>
          <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
            {formatCurrency(activeAffiliate.stats.currentBalance)}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">Ready for withdrawal</p>
        </div>

        <div className="p-5 rounded-2xl border border-border bg-card shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Minimum Threshold</span>
          <p className="text-2xl font-bold text-foreground mt-1">$50.00</p>
          <p className="text-[11px] text-muted-foreground mt-1">Standard partner limit</p>
        </div>

        <div className="p-5 rounded-2xl border border-border bg-card shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Next Scheduled Payout</span>
          <p className="text-2xl font-bold text-foreground mt-1">Apr 1, 2026</p>
          <p className="text-[11px] text-muted-foreground mt-1">Automated batch cycle</p>
        </div>

        <div className="p-5 rounded-2xl border border-border bg-card shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Payout Method</span>
          <p className="text-2xl font-bold text-foreground mt-1">{activeAffiliate.payoutMethod}</p>
          <p className="text-[11px] font-mono text-muted-foreground mt-1 truncate">
            {activeAffiliate.payoutDetails}
          </p>
        </div>
      </div>

      {/* Payout History Table */}
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border bg-muted/20">
          <h3 className="text-sm font-bold text-foreground">Disbursement History</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-muted/40 border-b border-border text-muted-foreground font-semibold uppercase tracking-wider text-[10px]">
                <th className="p-4">Reference ID</th>
                <th className="p-4">Requested Date</th>
                <th className="p-4">Payment Method & Account</th>
                <th className="p-4 text-right">Amount</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4">Processed Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {affPayouts.map((pay) => {
                const badge = getPayoutStatusBadge(pay.status);
                return (
                  <tr key={pay.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-mono font-bold text-foreground">{pay.reference}</td>
                    <td className="p-4 text-muted-foreground">{pay.requestedDate}</td>
                    <td className="p-4">
                      <span className="font-semibold text-foreground">{pay.method}</span>
                      <div className="text-[11px] font-mono text-muted-foreground truncate max-w-xs">
                        {pay.accountDetails}
                      </div>
                    </td>
                    <td className="p-4 text-right font-extrabold text-foreground text-sm">
                      {formatCurrency(pay.amount)}
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badge.className}`}>
                        {badge.text}
                      </span>
                    </td>
                    <td className="p-4 text-muted-foreground">{pay.processedDate || '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Request Payout Modal */}
      {isRequestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-card border border-border rounded-2xl p-6 shadow-2xl animate-in zoom-in-95">
            <h3 className="text-lg font-bold text-foreground">Request Commission Withdrawal</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Submit your available balance for manual disbursement.
            </p>

            <form onSubmit={handleRequestPayout} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Withdrawal Amount (Max: {formatCurrency(activeAffiliate.stats.currentBalance)})
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold text-xs">$</span>
                  <input
                    type="number"
                    step="0.01"
                    min={50}
                    max={activeAffiliate.stats.currentBalance}
                    required
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                    className="w-full text-xs pl-7 pr-4 py-2.5 bg-background border border-border rounded-xl font-bold text-foreground focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">Payout Method</label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value as PayoutMethod)}
                  className="w-full text-xs bg-background border border-border rounded-xl px-3 py-2.5 text-foreground focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="PayPal">PayPal</option>
                  <option value="Bank Transfer">Direct Bank Transfer</option>
                  <option value="Stripe Direct">Stripe Direct</option>
                  <option value="Wise">Wise (TransferWise)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">Account / Email Details</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. james.wilson@coachhub.io"
                  value={accountDetails}
                  onChange={(e) => setAccountDetails(e.target.value)}
                  className="w-full text-xs font-mono bg-background border border-border rounded-xl px-3 py-2 text-foreground focus:ring-2 focus:ring-emerald-500 outline-none"
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
                  Confirm & Submit Payout
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
