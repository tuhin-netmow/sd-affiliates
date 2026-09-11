'use client';

import React, { useState } from 'react';
import {
  DollarSign,
  Search,
  Filter,
  ArrowDownRight,
  ArrowUpRight,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { useAffiliateDemo } from '@/context/affiliate-demo-context';
import { formatCurrency, getCommissionStatusBadge } from '@/lib/affiliate/calculations';
import { CommissionStatus } from '@/types/affiliate';

export default function AffiliateCommissionsPage() {
  const { commissions, activeAffiliate } = useAffiliateDemo();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const affCommissions = commissions.filter(
    (c) => c.affiliateId === activeAffiliate.id || c.affiliateId === 'aff-1'
  );

  const filteredCommissions = affCommissions.filter((c) => {
    const matchesSearch =
      c.orgName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.reference.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Commission History</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Audit log of all recurring commissions, milestone bonuses, and adjustment credits.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by organization name or reference code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 no-scrollbar">
          {['All', 'Pending', 'Approved', 'Payable', 'Paid', 'Reversed'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-2 text-xs font-semibold rounded-xl border whitespace-nowrap transition-all ${
                statusFilter === status
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-card text-muted-foreground border-border hover:bg-muted'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Commissions Table */}
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        {filteredCommissions.length === 0 ? (
          <div className="p-12 text-center text-xs text-muted-foreground">
            No commission records found matching your filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-muted/40 border-b border-border text-muted-foreground font-semibold uppercase tracking-wider text-[10px]">
                  <th className="p-4">Transaction Date</th>
                  <th className="p-4">Referred Organization</th>
                  <th className="p-4">Plan / Rate</th>
                  <th className="p-4">Type</th>
                  <th className="p-4 text-right">Commission Amount</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-right">Reference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredCommissions.map((comm) => {
                  const badge = getCommissionStatusBadge(comm.status);
                  const isNegative = comm.amount < 0;
                  return (
                    <tr key={comm.id} className="hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium text-foreground">{comm.date}</td>
                      <td className="p-4">
                        <div className="font-bold text-foreground">{comm.orgName}</div>
                        <div className="text-[11px] text-muted-foreground">{comm.customerName}</div>
                      </td>
                      <td className="p-4">
                        <span className="font-semibold text-foreground">{comm.plan}</span>
                        <span className="text-muted-foreground text-[11px] ml-1">
                          ({(comm.rate * 100).toFixed(0)}%)
                        </span>
                      </td>
                      <td className="p-4 text-muted-foreground">
                        <span className="bg-muted px-2 py-0.5 rounded text-[11px] font-medium border border-border">
                          {comm.type}
                        </span>
                      </td>
                      <td className="p-4 text-right font-bold">
                        <span
                          className={`inline-flex items-center text-xs font-bold ${
                            isNegative
                              ? 'text-rose-600 dark:text-rose-400'
                              : 'text-emerald-600 dark:text-emerald-400'
                          }`}
                        >
                          {isNegative ? (
                            <ArrowDownRight className="size-3.5 mr-0.5" />
                          ) : (
                            <ArrowUpRight className="size-3.5 mr-0.5" />
                          )}
                          {formatCurrency(comm.amount)}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badge.className}`}
                        >
                          {badge.text}
                        </span>
                      </td>
                      <td className="p-4 text-right font-mono text-[11px] text-muted-foreground">
                        {comm.reference}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
