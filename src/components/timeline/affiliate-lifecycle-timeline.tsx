'use client';

import React from 'react';
import { MousePointerClick, UserPlus, Shield, Zap, DollarSign, CheckCircle2, SendHorizontal, CreditCard } from 'lucide-react';

interface LifecycleStep {
  id: number;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
}

const STEPS: LifecycleStep[] = [
  { id: 1, label: 'Referral Click', sublabel: 'Attribution Cookied', icon: <MousePointerClick className="size-4" /> },
  { id: 2, label: 'Visitor Signup', sublabel: 'Organization Created', icon: <UserPlus className="size-4" /> },
  { id: 3, label: 'Free Account', sublabel: 'Onboarding & Setup', icon: <Shield className="size-4" /> },
  { id: 4, label: 'Paid Subscription', sublabel: 'Starter / Pro Plan', icon: <Zap className="size-4" /> },
  { id: 5, label: 'Commission Generated', sublabel: 'Pending Review', icon: <DollarSign className="size-4" /> },
  { id: 6, label: 'Payable Approved', sublabel: 'Holding Cleared', icon: <CheckCircle2 className="size-4" /> },
  { id: 7, label: 'Payout Requested', sublabel: 'Disbursement Queue', icon: <SendHorizontal className="size-4" /> },
  { id: 8, label: 'Payout Paid', sublabel: 'Transferred via PayPal/Bank', icon: <CreditCard className="size-4" /> },
];

interface AffiliateLifecycleTimelineProps {
  currentStep?: number; // 1 to 8
  highlightStep?: number;
  compact?: boolean;
}

export function AffiliateLifecycleTimeline({
  currentStep = 4,
  highlightStep,
  compact = false,
}: AffiliateLifecycleTimelineProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar">
        {STEPS.map((step, idx) => {
          const isDone = step.id <= currentStep;
          const isCurrent = step.id === (highlightStep || currentStep);
          const isPending = step.id > currentStep;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center text-center min-w-[100px] flex-1">
                {/* Step Circle */}
                <div
                  className={`flex size-9 items-center justify-center rounded-full border-2 transition-all duration-300 font-semibold text-xs shadow-sm ${
                    isCurrent
                      ? 'border-emerald-600 bg-emerald-600 text-white dark:border-emerald-500 dark:bg-emerald-500 ring-4 ring-emerald-500/20'
                      : isDone
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-700 dark:border-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-300'
                      : 'border-zinc-300 bg-zinc-100 text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-500'
                  }`}
                >
                  {isDone && !isCurrent ? <CheckCircle2 className="size-4" /> : step.icon}
                </div>

                {/* Label */}
                <div className="mt-2">
                  <p
                    className={`text-xs font-medium leading-tight ${
                      isCurrent
                        ? 'text-emerald-700 dark:text-emerald-400 font-semibold'
                        : isDone
                        ? 'text-zinc-900 dark:text-zinc-100'
                        : 'text-zinc-400 dark:text-zinc-500'
                    }`}
                  >
                    {step.label}
                  </p>
                  {!compact && (
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5 whitespace-nowrap">
                      {step.sublabel}
                    </p>
                  )}
                </div>
              </div>

              {/* Connecting line */}
              {idx < STEPS.length - 1 && (
                <div
                  className={`h-0.5 flex-1 min-w-4 max-w-10 rounded -mt-6 transition-colors duration-300 ${
                    step.id < currentStep
                      ? 'bg-emerald-500 dark:bg-emerald-600'
                      : 'bg-zinc-200 dark:bg-zinc-800'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
