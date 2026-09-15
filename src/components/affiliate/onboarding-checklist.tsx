'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Circle,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  X,
  PlayCircle,
  Copy,
  Download,
  CreditCard,
  Award,
} from 'lucide-react';
import { useAffiliateDemo } from '@/context/affiliate-demo-context';

export function OnboardingChecklist() {
  const {
    onboardingCompletedSteps,
    openOnboarding,
    setOnboardingCurrentStep,
    completeOnboardingStep,
  } = useAffiliateDemo();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  const tasks = [
    {
      id: 'welcome',
      stepNum: 1,
      title: 'Program Overview & Tier Structure',
      description: 'Learn commission rates, recurring payout terms, and target sports clubs.',
      actionText: 'Review Tiers',
      icon: Award,
    },
    {
      id: 'links',
      stepNum: 2,
      title: 'Get Referral Link & Promo Coupon',
      description: 'Copy your unique link and 20% off coupon code to start sharing.',
      actionText: 'View Link',
      icon: Copy,
    },
    {
      id: 'marketing',
      stepNum: 3,
      title: 'Explore Marketing Materials',
      description: 'Download pitch decks, social media banners, and email swipe copy.',
      actionText: 'Browse Kit',
      icon: Download,
    },
    {
      id: 'payouts',
      stepNum: 4,
      title: 'Set Up Payout Preferences',
      description: 'Configure PayPal or Direct Bank Deposit for monthly payouts.',
      actionText: 'Payment Setup',
      icon: CreditCard,
    },
    {
      id: 'testdrive',
      stepNum: 5,
      title: 'Interactive Referral Test Drive',
      description: 'Simulate your first referred club and watch commission post live.',
      actionText: 'Try Simulator',
      icon: PlayCircle,
    },
  ];

  const completedCount = onboardingCompletedSteps.length;
  const totalCount = tasks.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);
  const isFullyCompleted = completedCount >= totalCount;

  const handleLaunchStep = (stepNum: number) => {
    setOnboardingCurrentStep(stepNum);
    openOnboarding();
  };

  return (
    <div className="rounded-3xl bg-white border border-purple-200/80 shadow-xl shadow-purple-950/5 overflow-hidden transition-all">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-[#27125B] via-[#3B1578] to-[#8B14C2] p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300">
            <Sparkles className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base text-white">Getting Started Checklist</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-200 border border-emerald-400/30">
                {completedCount} / {totalCount} Completed ({progressPercent}%)
              </span>
            </div>
            <p className="text-xs text-purple-100/90 mt-0.5">
              Complete these 5 quick steps to activate your partner features and maximize conversions.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <Link
            href="/affiliate/onboarding"
            className="px-3.5 py-1.5 rounded-xl bg-white text-[#27125B] text-xs font-bold shadow-md hover:bg-purple-50 transition-all flex items-center gap-1.5 shrink-0"
          >
            <span>Open Onboarding Guide Page</span>
            <ArrowRight className="size-3.5" />
          </Link>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 transition-colors"
            title={isCollapsed ? 'Expand' : 'Collapse'}
          >
            {isCollapsed ? <ChevronDown className="size-4" /> : <ChevronUp className="size-4" />}
          </button>
        </div>
      </div>

      {/* Progress Track */}
      <div className="w-full h-2 bg-slate-100 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-[#8B14C2] transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      {/* Checklist Content */}
      {!isCollapsed && (
        <div className="p-5 space-y-3 bg-slate-50/50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {tasks.map((t) => {
              const isDone = onboardingCompletedSteps.includes(t.id);
              const IconComp = t.icon;

              return (
                <div
                  key={t.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                    isDone
                      ? 'bg-emerald-50/60 border-emerald-200/90 text-slate-800'
                      : 'bg-white border-slate-200/90 hover:border-purple-300 text-slate-800 shadow-sm'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          isDone
                            ? 'bg-emerald-200/80 text-emerald-900'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        Step {t.stepNum}
                      </span>
                      {isDone ? (
                        <CheckCircle2 className="size-5 text-emerald-600" />
                      ) : (
                        <Circle className="size-5 text-slate-300" />
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <IconComp className={`size-4 ${isDone ? 'text-emerald-700' : 'text-[#8B14C2]'}`} />
                      <h4 className="font-extrabold text-xs text-slate-900 line-clamp-1">
                        {t.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug line-clamp-2">
                      {t.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handleLaunchStep(t.stepNum)}
                    className={`w-full py-1.5 px-2.5 rounded-xl font-bold text-[11px] transition-all flex items-center justify-center gap-1 ${
                      isDone
                        ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900'
                        : 'bg-[#27125B] hover:bg-[#8B14C2] text-white shadow-sm'
                    }`}
                  >
                    <span>{t.actionText}</span>
                    <ArrowRight className="size-3" />
                  </button>
                </div>
              );
            })}
          </div>

          {isFullyCompleted && (
            <div className="p-3.5 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 flex items-center justify-between text-xs animate-in fade-in duration-300">
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="size-4 text-emerald-700" />
                <span>Awesome job! You have completed all onboarding guide tasks.</span>
              </div>
              <button
                onClick={() => setIsDismissed(true)}
                className="text-emerald-800 font-semibold hover:underline text-[11px]"
              >
                Dismiss Banner
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
