'use client';

import React, { useState } from 'react';
import {
  Trophy,
  Medal,
  Crown,
  Users2,
  DollarSign,
  TrendingUp,
} from 'lucide-react';
import { useAffiliateDemo } from '@/context/affiliate-demo-context';
import { formatCurrency, formatNumber, getTierBadgeClass } from '@/lib/affiliate/calculations';

export default function AffiliateLeaderboardPage() {
  const { affiliates, activeAffiliate } = useAffiliateDemo();
  const [tab, setTab] = useState<'Monthly' | 'Quarterly' | 'All Time'>('Monthly');

  // Sorted affiliates by revenue/customers
  const sortedAffiliates = [...affiliates]
    .filter((a) => a.status === 'Active')
    .sort((a, b) => b.stats.totalRevenue - a.stats.totalRevenue);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header & Period Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Partner Leaderboard</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Top performing SquadDeck sports partners and coaches ranked by referred customer volume.
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-muted/50 rounded-xl border border-border">
          {['Monthly', 'Quarterly', 'All Time'].map((period) => (
            <button
              key={period}
              onClick={() => setTab(period as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                tab === period
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {/* 2nd Place */}
        {sortedAffiliates[1] && (
          <div className="order-2 md:order-1 rounded-2xl border border-border bg-card p-6 flex flex-col items-center text-center shadow-sm relative">
            <div className="absolute -top-4 size-8 rounded-full bg-slate-200 text-slate-800 font-extrabold text-sm flex items-center justify-center border-2 border-background shadow-md">
              2
            </div>
            <img
              src={sortedAffiliates[1].avatar}
              alt={sortedAffiliates[1].name}
              className="size-16 rounded-full object-cover border-2 border-slate-300 ring-2 ring-slate-400/20 mt-2"
            />
            <h3 className="text-sm font-bold text-foreground mt-3">{sortedAffiliates[1].name}</h3>
            <p className="text-[11px] text-muted-foreground">{sortedAffiliates[1].company}</p>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border mt-2 ${getTierBadgeClass(sortedAffiliates[1].tier)}`}>
              {sortedAffiliates[1].tier}
            </span>
            <div className="mt-4 pt-3 border-t border-border w-full grid grid-cols-2 text-xs">
              <div>
                <span className="text-muted-foreground text-[10px]">Clubs</span>
                <p className="font-bold text-foreground">{sortedAffiliates[1].stats.paidCustomers}</p>
              </div>
              <div>
                <span className="text-muted-foreground text-[10px]">Revenue</span>
                <p className="font-bold text-foreground">{formatCurrency(sortedAffiliates[1].stats.totalRevenue)}</p>
              </div>
            </div>
          </div>
        )}

        {/* 1st Place (Winner) */}
        {sortedAffiliates[0] && (
          <div className="order-1 md:order-2 rounded-2xl border-2 border-amber-400 bg-gradient-to-b from-amber-500/10 to-card p-6 flex flex-col items-center text-center shadow-lg relative -mt-3">
            <div className="absolute -top-5 size-10 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-950 font-black text-base flex items-center justify-center border-2 border-background shadow-lg">
              <Crown className="size-5" />
            </div>
            <img
              src={sortedAffiliates[0].avatar}
              alt={sortedAffiliates[0].name}
              className="size-20 rounded-full object-cover border-3 border-amber-400 ring-4 ring-amber-400/20 mt-2"
            />
            <h3 className="text-base font-extrabold text-foreground mt-3">{sortedAffiliates[0].name}</h3>
            <p className="text-xs text-muted-foreground">{sortedAffiliates[0].company}</p>
            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border mt-2 ${getTierBadgeClass(sortedAffiliates[0].tier)}`}>
              {sortedAffiliates[0].tier} Partner
            </span>
            <div className="mt-4 pt-3 border-t border-border w-full grid grid-cols-2 text-xs">
              <div>
                <span className="text-muted-foreground text-[10px]">Referred Clubs</span>
                <p className="font-extrabold text-foreground text-sm">{sortedAffiliates[0].stats.paidCustomers}</p>
              </div>
              <div>
                <span className="text-muted-foreground text-[10px]">Revenue</span>
                <p className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">
                  {formatCurrency(sortedAffiliates[0].stats.totalRevenue)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 3rd Place */}
        {sortedAffiliates[2] && (
          <div className="order-3 md:order-3 rounded-2xl border border-border bg-card p-6 flex flex-col items-center text-center shadow-sm relative">
            <div className="absolute -top-4 size-8 rounded-full bg-amber-700 text-amber-100 font-extrabold text-sm flex items-center justify-center border-2 border-background shadow-md">
              3
            </div>
            <img
              src={sortedAffiliates[2].avatar}
              alt={sortedAffiliates[2].name}
              className="size-16 rounded-full object-cover border-2 border-amber-600 ring-2 ring-amber-600/20 mt-2"
            />
            <h3 className="text-sm font-bold text-foreground mt-3">{sortedAffiliates[2].name}</h3>
            <p className="text-[11px] text-muted-foreground">{sortedAffiliates[2].company}</p>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border mt-2 ${getTierBadgeClass(sortedAffiliates[2].tier)}`}>
              {sortedAffiliates[2].tier}
            </span>
            <div className="mt-4 pt-3 border-t border-border w-full grid grid-cols-2 text-xs">
              <div>
                <span className="text-muted-foreground text-[10px]">Clubs</span>
                <p className="font-bold text-foreground">{sortedAffiliates[2].stats.paidCustomers}</p>
              </div>
              <div>
                <span className="text-muted-foreground text-[10px]">Revenue</span>
                <p className="font-bold text-foreground">{formatCurrency(sortedAffiliates[2].stats.totalRevenue)}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Complete Rankings Table */}
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border bg-muted/20">
          <h3 className="text-sm font-bold text-foreground">Complete Leaderboard Rankings</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-muted/40 border-b border-border text-muted-foreground font-semibold uppercase tracking-wider text-[10px]">
                <th className="p-4 text-center w-16">Rank</th>
                <th className="p-4">Affiliate Partner</th>
                <th className="p-4 text-center">Tier</th>
                <th className="p-4 text-center">Paid Customers</th>
                <th className="p-4 text-right">Revenue Generated</th>
                <th className="p-4 text-right">Total Commission</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sortedAffiliates.map((aff, index) => {
                const isCurrentUser = aff.id === activeAffiliate.id;
                return (
                  <tr
                    key={aff.id}
                    className={`transition-colors ${
                      isCurrentUser
                        ? 'bg-emerald-500/10 font-bold'
                        : 'hover:bg-muted/30'
                    }`}
                  >
                    <td className="p-4 text-center">
                      <span className={`inline-flex size-6 items-center justify-center rounded-full text-xs font-bold ${
                        index === 0
                          ? 'bg-amber-400 text-amber-950'
                          : index === 1
                          ? 'bg-slate-300 text-slate-900'
                          : index === 2
                          ? 'bg-amber-700 text-amber-100'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {index + 1}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={aff.avatar}
                          alt={aff.name}
                          className="size-8 rounded-full object-cover border border-border"
                        />
                        <div>
                          <span className="font-bold text-foreground flex items-center gap-1.5">
                            {aff.name}
                            {isCurrentUser && (
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-500 text-white">
                                You
                              </span>
                            )}
                          </span>
                          <span className="text-[11px] text-muted-foreground">{aff.company}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${getTierBadgeClass(aff.tier)}`}>
                        {aff.tier}
                      </span>
                    </td>
                    <td className="p-4 text-center font-bold text-foreground">
                      {aff.stats.paidCustomers}
                    </td>
                    <td className="p-4 text-right font-bold text-foreground">
                      {formatCurrency(aff.stats.totalRevenue)}
                    </td>
                    <td className="p-4 text-right font-extrabold text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(aff.stats.totalEarned + aff.stats.payableCommission)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
