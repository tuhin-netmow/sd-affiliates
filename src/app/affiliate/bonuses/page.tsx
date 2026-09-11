'use client';

import React from 'react';
import {
  Award,
  Sparkles,
  CheckCircle2,
  Trophy,
  Target,
  DollarSign,
  Calendar,
} from 'lucide-react';
import { useAffiliateDemo } from '@/context/affiliate-demo-context';
import { formatCurrency } from '@/lib/affiliate/calculations';

export default function AffiliateBonusesPage() {
  const { bonuses, activeAffiliate } = useAffiliateDemo();

  const affBonuses = bonuses.filter(
    (b) => !b.affiliateId || b.affiliateId === activeAffiliate.id
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Bonuses & Performance Rewards</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Earn extra cash rewards when hitting customer acquisition and monthly revenue milestones.
          </p>
        </div>
      </div>

      {/* Bonus Milestone Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {affBonuses.map((bon) => {
          const isDone = bon.achieved || bon.progress >= bon.maxProgress;
          const percentage = Math.min(100, Math.round((bon.progress / bon.maxProgress) * 100));

          return (
            <div
              key={bon.id}
              className={`rounded-2xl border p-6 flex flex-col justify-between shadow-sm transition-all duration-200 ${
                isDone
                  ? 'bg-emerald-50/40 border-emerald-300 dark:bg-emerald-950/20 dark:border-emerald-800'
                  : 'bg-card border-border hover:border-emerald-500/40'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`p-2.5 rounded-xl ${
                        isDone
                          ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                          : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                      }`}
                    >
                      {isDone ? <CheckCircle2 className="size-5" /> : <Award className="size-5" />}
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                        {bon.type}
                      </span>
                      <h3 className="text-base font-bold text-foreground">{bon.title}</h3>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      +{formatCurrency(bon.reward)} Reward
                    </span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                  {bon.requirement}
                </p>

                {/* Progress Bar */}
                <div className="mt-6 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-muted-foreground">Current Progress</span>
                    <span className={isDone ? 'text-emerald-600 font-bold' : 'text-foreground'}>
                      {bon.progress} / {bon.maxProgress} ({percentage}%)
                    </span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        isDone
                          ? 'bg-emerald-500'
                          : 'bg-gradient-to-r from-amber-500 to-emerald-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-6 pt-4 border-t border-border/80 flex items-center justify-between text-xs">
                {isDone ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="size-4" /> Milestone Unlocked & Credited!
                  </span>
                ) : (
                  <span className="text-muted-foreground">
                    Remaining: <strong className="text-foreground">{bon.maxProgress - bon.progress} to go</strong>
                  </span>
                )}

                {bon.expiryDate && (
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <Calendar className="size-3" /> Ends: {bon.expiryDate}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
