'use client';

import React, { useState } from 'react';
import {
  Building2,
  Search,
  Eye,
  CreditCard,
  DollarSign,
  Calendar,
  Zap,
  CheckCircle2,
} from 'lucide-react';
import { useAffiliateDemo } from '@/context/affiliate-demo-context';
import { formatCurrency, getCommissionStatusBadge } from '@/lib/affiliate/calculations';
import { Customer } from '@/types/affiliate';
import { DrawerSheet } from '@/components/shared/drawer-sheet';

export default function AffiliateCustomersPage() {
  const { customers, activeAffiliate } = useAffiliateDemo();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const affCustomers = customers.filter(
    (c) => c.affiliateId === activeAffiliate.id || c.affiliateId === 'aff-1'
  );

  const filteredCustomers = affCustomers.filter(
    (c) =>
      c.orgName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Referred Customers</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Sports organizations currently subscribed to SquadDeck through your affiliate attribution.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by sports club, director name, or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-xs pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm"
        />
      </div>

      {/* Customers Table */}
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        {filteredCustomers.length === 0 ? (
          <div className="p-12 text-center text-xs text-muted-foreground">
            No customers found matching the search criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-muted/40 border-b border-border text-muted-foreground font-semibold uppercase tracking-wider text-[10px]">
                  <th className="p-4">Sports Organization & Contact</th>
                  <th className="p-4">Signup Date</th>
                  <th className="p-4 text-center">Active Plan</th>
                  <th className="p-4 text-center">Subscription Status</th>
                  <th className="p-4 text-right">Monthly Spend</th>
                  <th className="p-4 text-right">Lifetime Revenue</th>
                  <th className="p-4 text-right">Commission Earned</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredCustomers.map((cust) => (
                  <tr
                    key={cust.id}
                    onClick={() => setSelectedCustomer(cust)}
                    className="hover:bg-muted/30 transition-colors cursor-pointer group"
                  >
                    <td className="p-4">
                      <div className="font-bold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {cust.orgName}
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        {cust.contactName} • {cust.email}
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground">{cust.signupDate}</td>
                    <td className="p-4 text-center font-bold text-foreground">
                      <span className="bg-muted px-2 py-1 rounded-md text-[11px] border border-border">
                        {cust.plan} Plan
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800">
                        {cust.subscriptionStatus}
                      </span>
                    </td>
                    <td className="p-4 text-right font-bold text-foreground">
                      {formatCurrency(cust.monthlyRevenue)}/mo
                    </td>
                    <td className="p-4 text-right font-bold text-foreground">
                      {formatCurrency(cust.lifetimeRevenue)}
                    </td>
                    <td className="p-4 text-right font-bold text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(cust.commissionEarned)}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCustomer(cust);
                        }}
                        className="p-1.5 rounded-lg border border-border bg-background hover:bg-muted text-foreground transition-all"
                        title="View Customer Profile"
                      >
                        <Eye className="size-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Customer Detail Drawer */}
      <DrawerSheet
        isOpen={selectedCustomer !== null}
        onClose={() => setSelectedCustomer(null)}
        title={selectedCustomer?.orgName || 'Customer Details'}
        subtitle={`Primary Contact: ${selectedCustomer?.contactName}`}
      >
        {selectedCustomer && (
          <div className="space-y-6">
            {/* Overview Card */}
            <div className="p-5 rounded-2xl bg-muted/30 border border-border space-y-3 text-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Subscription & Attribution
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-muted-foreground">Contact Email</span>
                  <p className="font-mono font-medium text-foreground mt-0.5">{selectedCustomer.email}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Subscription Plan</span>
                  <p className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {selectedCustomer.plan} (${selectedCustomer.monthlyRevenue}/mo)
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Attribution Source</span>
                  <p className="font-medium text-foreground mt-0.5">{selectedCustomer.attribution}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Coupon Applied</span>
                  <p className="font-mono font-bold text-foreground mt-0.5">{selectedCustomer.coupon || 'None'}</p>
                </div>
              </div>
            </div>

            {/* Financial Summary */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl border border-border bg-card">
                <span className="text-xs text-muted-foreground">Lifetime Revenue</span>
                <p className="text-xl font-bold text-foreground mt-1">
                  {formatCurrency(selectedCustomer.lifetimeRevenue)}
                </p>
              </div>
              <div className="p-4 rounded-2xl border border-border bg-card">
                <span className="text-xs text-muted-foreground">Commission Earned</span>
                <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                  {formatCurrency(selectedCustomer.commissionEarned)}
                </p>
              </div>
            </div>

            {/* Payment History */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Payment History ({selectedCustomer.paymentHistory.length} Transactions)
              </h4>
              <div className="space-y-2">
                {selectedCustomer.paymentHistory.map((pay) => (
                  <div key={pay.id} className="flex items-center justify-between p-3 rounded-xl border border-border bg-card text-xs">
                    <div>
                      <span className="font-bold text-foreground">{pay.plan} Subscription</span>
                      <p className="text-[11px] text-muted-foreground">{pay.date}</p>
                    </div>
                    <div className="text-right">
                      <span className={`font-bold ${pay.amount < 0 ? 'text-rose-600' : 'text-foreground'}`}>
                        {formatCurrency(pay.amount)}
                      </span>
                      <span className="block text-[10px] text-emerald-600 font-semibold">{pay.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Commission History */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Commission History
              </h4>
              <div className="space-y-2">
                {selectedCustomer.commissionHistory.map((comm) => {
                  const badge = getCommissionStatusBadge(comm.status);
                  return (
                    <div key={comm.id} className="flex items-center justify-between p-3 rounded-xl border border-border bg-card text-xs">
                      <div>
                        <span className="font-bold text-foreground">Recurring Commission</span>
                        <p className="text-[11px] text-muted-foreground">{comm.date}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          {formatCurrency(comm.amount)}
                        </span>
                        <div>
                          <span className={`inline-block px-2 py-0.2 rounded-full text-[9px] font-bold border ${badge.className}`}>
                            {badge.text}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </DrawerSheet>
    </div>
  );
}
