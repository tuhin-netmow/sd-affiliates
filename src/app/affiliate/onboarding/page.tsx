'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  Share2,
  Download,
  CreditCard,
  Building2,
  DollarSign,
  TrendingUp,
  Zap,
  Gift,
  ExternalLink,
  ShieldCheck,
  Award,
  PlayCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Target,
  Mail,
  FileText,
  Users2,
  Clock,
  Percent,
} from 'lucide-react';
import { useAffiliateDemo } from '@/context/affiliate-demo-context';
import { formatCurrency, formatNumber } from '@/lib/affiliate/calculations';
import { ExplanatoryCallout } from '@/components/shared/explanatory-callout';

export default function DedicatedOnboardingPage() {
  const {
    activeAffiliate,
    referralLinks,
    simulateAddDemoCustomer,
    onboardingCompletedSteps,
    completeOnboardingStep,
  } = useAffiliateDemo();

  const [activeTab, setActiveTab] = useState<'roadmap' | 'calculator' | 'links' | 'playbook' | 'simulator' | 'faq'>('roadmap');
  
  // Interactive Calculator State
  const [calcClubs, setCalcClubs] = useState<number>(15);
  const [calcAvgPrice, setCalcAvgPrice] = useState<number>(199);

  // Copy state
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Simulator State
  const [simOrgName, setSimOrgName] = useState('Metro Youth Basketball League');
  const [simulatedDone, setSimulatedDone] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  // Accordion open states
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Calculate commission
  const calculateCommission = (clubs: number, avgPrice: number) => {
    const totalVolume = clubs * avgPrice;
    let rate = 0.20;
    let tierName = 'Bronze Partner';

    if (clubs >= 50) {
      rate = 0.35;
      tierName = 'Platinum Partner';
    } else if (clubs >= 25) {
      rate = 0.30;
      tierName = 'Gold Partner';
    } else if (clubs >= 10) {
      rate = 0.25;
      tierName = 'Silver Partner';
    }

    const monthlyEarnings = totalVolume * rate;
    const annualEarnings = monthlyEarnings * 12;

    return { monthlyEarnings, annualEarnings, ratePercent: Math.round(rate * 100), tierName };
  };

  const { monthlyEarnings, annualEarnings, ratePercent, tierName } = calculateCommission(calcClubs, calcAvgPrice);

  const sampleEmailCopy = `Subject: Modernizing registration and payments for ${simOrgName || 'your sports organization'}

Hi Coach / Sports Director,

I noticed your organization handles seasonal registrations and team fees. We recently started recommending SquadDeck—a dedicated management platform built specifically for youth sports clubs and leagues.

It handles online registrations, roster management, automated recurring payment collection, and parent communication in one place.

You can check out a free demo here: https://squaddeck.com/ref/${activeAffiliate.referralCode.toLowerCase()}

Plus, if you use code "${activeAffiliate.referralCode}" at checkout, you'll save 20% off your annual plan.

Best regards,
${activeAffiliate.name}
SquadDeck Certified Partner`;

  const handleCopyLink = () => {
    setCopiedLink(true);
    completeOnboardingStep('links');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCode = () => {
    setCopiedCode(true);
    completeOnboardingStep('links');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyEmail = () => {
    setCopiedEmail(true);
    completeOnboardingStep('marketing');
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleRunSimulator = () => {
    setIsSimulating(true);
    setTimeout(() => {
      simulateAddDemoCustomer(activeAffiliate.id);
      setIsSimulating(false);
      setSimulatedDone(true);
      completeOnboardingStep('testdrive');
    }, 800);
  };

  const faqs = [
    {
      q: 'How does the 90-day cookie tracking work?',
      a: 'When a sports director or coach clicks your custom referral link, a tracking cookie is placed in their web browser for 90 days. If they register or upgrade to a paid SquadDeck subscription anytime within those 90 days, the customer is permanently assigned to your account.',
    },
    {
      q: 'When and how do I get paid my commissions?',
      a: 'Commissions are calculated automatically at the end of each billing cycle and paid out on the 15th of every month via PayPal, Direct Deposit (ACH/IBAN), or Stripe. Minimum payout threshold is only $20.',
    },
    {
      q: 'Is the commission recurring for lifetime?',
      a: 'Yes! You earn recurring monthly commissions for as long as your referred sports organization maintains an active SquadDeck subscription. As they upgrade plans or add teams, your monthly earnings increase automatically.',
    },
    {
      q: 'How do commission tiers upgrade?',
      a: 'Tiers are updated automatically based on your active paying referred clubs: Bronze (1-9 clubs, 20%), Silver (10-24 clubs, 25%), Gold (25-49 clubs, 30%), and Platinum (50+ clubs, 35%). Higher rates apply to all active clubs as soon as you reach the tier threshold!',
    },
    {
      q: 'Can I use custom promo discount codes?',
      a: 'Absolutely! Every affiliate gets a unique coupon code (e.g. SARAH2026) granting referred clubs 20% off their subscription. Even if a user types the code directly at checkout without clicking your link, attribution is assigned to you.',
    },
    {
      q: 'Where can I find promotional banners and pitch decks?',
      a: 'All high-converting marketing materials—including 10-slide club presentation decks, email swipe files, social graphics, and printable flyers—are located in the Marketing Materials tab.',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Top Banner & Partner Welcome */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#27125B] via-[#431D80] to-[#8B14C2] p-8 text-white shadow-2xl shadow-[#27125B]/20">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold text-emerald-200 border border-white/20">
              <Sparkles className="size-4" />
              <span>SquadDeck Partner Onboarding Hub</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              Welcome to Your SquadDeck Partner Journey, {activeAffiliate.name}!
            </h1>
            <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
              This quick start guide explains step-by-step how to promote SquadDeck to youth sports clubs, track clicks & conversions, calculate your lifetime recurring earnings, and receive automated monthly payouts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/affiliate/dashboard"
              className="px-5 py-3 rounded-2xl bg-white text-[#27125B] font-extrabold text-xs shadow-lg hover:bg-purple-50 transition-all flex items-center gap-2"
            >
              <span>Back to Dashboard</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-16 -right-16 size-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-16 size-80 rounded-full bg-teal-400/20 blur-3xl pointer-events-none" />
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto p-1.5 bg-card/60 backdrop-blur-xl border border-border rounded-2xl">
        <button
          onClick={() => setActiveTab('roadmap')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'roadmap'
              ? 'bg-gradient-to-r from-[#27125B] to-[#8B14C2] text-white shadow-md'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
        >
          <BookOpen className="size-4" />
          <span>1. Partner Success Roadmap</span>
        </button>

        <button
          onClick={() => setActiveTab('calculator')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'calculator'
              ? 'bg-gradient-to-r from-[#27125B] to-[#8B14C2] text-white shadow-md'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
        >
          <DollarSign className="size-4 text-emerald-400" />
          <span>2. Commission Calculator</span>
        </button>

        <button
          onClick={() => setActiveTab('links')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'links'
              ? 'bg-gradient-to-r from-[#27125B] to-[#8B14C2] text-white shadow-md'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
        >
          <Copy className="size-4" />
          <span>3. Links & Promo Codes</span>
        </button>

        <button
          onClick={() => setActiveTab('playbook')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'playbook'
              ? 'bg-gradient-to-r from-[#27125B] to-[#8B14C2] text-white shadow-md'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
        >
          <FileText className="size-4" />
          <span>4. Marketing Playbook</span>
        </button>

        <button
          onClick={() => setActiveTab('simulator')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'simulator'
              ? 'bg-gradient-to-r from-[#27125B] to-[#8B14C2] text-white shadow-md'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
        >
          <PlayCircle className="size-4 text-emerald-400" />
          <span>5. Live Referral Simulator</span>
        </button>

        <button
          onClick={() => setActiveTab('faq')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'faq'
              ? 'bg-gradient-to-r from-[#27125B] to-[#8B14C2] text-white shadow-md'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
        >
          <HelpCircle className="size-4" />
          <span>FAQ & Support</span>
        </button>
      </div>

      {/* TAB 1: PARTNER SUCCESS ROADMAP */}
      {activeTab === 'roadmap' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold text-foreground">The 5-Step Partner Success Roadmap</h2>
            <p className="text-xs text-muted-foreground">
              Follow these simple steps to transition from newly registered partner to generating recurring monthly commission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="p-5 rounded-3xl bg-card border border-border space-y-3 relative overflow-hidden shadow-sm">
              <span className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-[#8B14C2] font-black text-sm flex items-center justify-center">
                01
              </span>
              <h3 className="font-extrabold text-sm text-foreground">Account Provisioned</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your partner account is instantly approved in demo mode with pre-configured Bronze tier 20% recurring rate.
              </p>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="size-3" /> Step Completed
              </span>
            </div>

            <div className="p-5 rounded-3xl bg-card border border-border space-y-3 relative overflow-hidden shadow-sm">
              <span className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-[#8B14C2] font-black text-sm flex items-center justify-center">
                02
              </span>
              <h3 className="font-extrabold text-sm text-foreground">Copy Tracking Links</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Copy your primary referral link and custom 20% off promo discount coupon code (`{activeAffiliate.referralCode}`).
              </p>
              <button
                onClick={() => setActiveTab('links')}
                className="text-[11px] font-bold text-[#8B14C2] hover:underline flex items-center gap-1"
              >
                <span>Get Links</span>
                <ArrowRight className="size-3" />
              </button>
            </div>

            <div className="p-5 rounded-3xl bg-card border border-border space-y-3 relative overflow-hidden shadow-sm">
              <span className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-[#8B14C2] font-black text-sm flex items-center justify-center">
                03
              </span>
              <h3 className="font-extrabold text-sm text-foreground">Share Media Assets</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Send our 10-slide Club Pitch Deck PDF or pre-written email swipe copy directly to sports directors & coaches.
              </p>
              <button
                onClick={() => setActiveTab('playbook')}
                className="text-[11px] font-bold text-[#8B14C2] hover:underline flex items-center gap-1"
              >
                <span>View Playbook</span>
                <ArrowRight className="size-3" />
              </button>
            </div>

            <div className="p-5 rounded-3xl bg-card border border-border space-y-3 relative overflow-hidden shadow-sm">
              <span className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-[#8B14C2] font-black text-sm flex items-center justify-center">
                04
              </span>
              <h3 className="font-extrabold text-sm text-foreground">Clubs Sign Up & Upgrade</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Clubs create free accounts or upgrade to Pro subscriptions. Attribution is locked for lifetime recurring payouts.
              </p>
              <span className="text-[10px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
                90-Day Cookie Window
              </span>
            </div>

            <div className="p-5 rounded-3xl bg-card border border-border space-y-3 relative overflow-hidden shadow-sm">
              <span className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 font-black text-sm flex items-center justify-center">
                05
              </span>
              <h3 className="font-extrabold text-sm text-foreground">Monthly Payouts</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Commissions accrue in your dashboard and transfer automatically on the 15th of every month via PayPal or Bank ACH.
              </p>
              <Link
                href="/affiliate/payouts"
                className="text-[11px] font-bold text-emerald-600 hover:underline flex items-center gap-1"
              >
                <span>Payout Settings</span>
                <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>

          {/* Key Program Terms Callout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-5 rounded-3xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/40 flex items-start gap-3.5">
              <div className="p-2.5 rounded-2xl bg-[#8B14C2] text-white shrink-0">
                <Percent className="size-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-sm text-foreground">20% to 35% Lifetime Commission</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Earn recurring revenue month after month for as long as your referred clubs maintain their paid plans.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40 flex items-start gap-3.5">
              <div className="p-2.5 rounded-2xl bg-indigo-600 text-white shrink-0">
                <Clock className="size-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-sm text-foreground">90-Day Cookie Attribution</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Even if a sports club director doesn't purchase immediately, you still get full credit if they sign up within 90 days.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 flex items-start gap-3.5">
              <div className="p-2.5 rounded-2xl bg-emerald-600 text-white shrink-0">
                <CreditCard className="size-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-sm text-foreground">Automated Monthly Payouts</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Get paid on the 15th of every month. $20 minimum payout threshold with zero payout withdrawal fees.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: COMMISSION CALCULATOR */}
      {activeTab === 'calculator' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold text-foreground">Interactive Commission Earnings Calculator</h2>
            <p className="text-xs text-muted-foreground">
              Adjust the slider below to calculate your estimated recurring monthly and annual payout income based on referred sports clubs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Controls */}
            <div className="lg:col-span-6 p-6 rounded-3xl bg-card border border-border space-y-6 shadow-sm">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-foreground">
                    Number of Referred Active Clubs:
                  </label>
                  <span className="text-lg font-black text-[#8B14C2] bg-purple-50 dark:bg-purple-950/50 px-3 py-1 rounded-xl border border-purple-200 dark:border-purple-800">
                    {calcClubs} Clubs
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="60"
                  value={calcClubs}
                  onChange={(e) => setCalcClubs(Number(e.target.value))}
                  className="w-full accent-[#8B14C2] h-2 bg-muted rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-muted-foreground font-semibold">
                  <span>1 Club (Bronze)</span>
                  <span>25 Clubs (Gold)</span>
                  <span>50+ Clubs (Platinum)</span>
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-border">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-foreground">
                    Average Club Subscription Plan:
                  </label>
                  <span className="text-sm font-extrabold text-foreground bg-muted px-2.5 py-1 rounded-lg">
                    ${calcAvgPrice} / month
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setCalcAvgPrice(99)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      calcAvgPrice === 99
                        ? 'bg-[#27125B] text-white border-[#27125B]'
                        : 'bg-background text-muted-foreground border-border hover:bg-muted'
                    }`}
                  >
                    Starter ($99)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalcAvgPrice(199)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      calcAvgPrice === 199
                        ? 'bg-[#27125B] text-white border-[#27125B]'
                        : 'bg-background text-muted-foreground border-border hover:bg-muted'
                    }`}
                  >
                    Pro ($199)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalcAvgPrice(399)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      calcAvgPrice === 399
                        ? 'bg-[#27125B] text-white border-[#27125B]'
                        : 'bg-background text-muted-foreground border-border hover:bg-muted'
                    }`}
                  >
                    Elite ($399)
                  </button>
                </div>
              </div>
            </div>

            {/* Right Earnings Projection Display */}
            <div className="lg:col-span-6 p-8 rounded-3xl bg-gradient-to-br from-[#27125B] via-[#3B1578] to-[#8B14C2] text-white space-y-6 shadow-2xl shadow-[#27125B]/20">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-200">Unlocked Tier</span>
                <span className="px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-200 font-extrabold text-xs border border-emerald-400/30">
                  {tierName} ({ratePercent}% Rate)
                </span>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-xs text-purple-200 font-semibold block">Estimated Monthly Recurring Earnings</span>
                  <p className="text-4xl sm:text-5xl font-black text-emerald-300 tracking-tight">
                    {formatCurrency(monthlyEarnings)}
                    <span className="text-xs text-purple-200 font-normal ml-1">/ month</span>
                  </p>
                </div>

                <div className="space-y-1 pt-2">
                  <span className="text-xs text-purple-200 font-semibold block">Estimated Annual Income</span>
                  <p className="text-2xl font-extrabold text-white">
                    {formatCurrency(annualEarnings)}
                    <span className="text-xs text-purple-200 font-normal ml-1">/ year</span>
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 text-xs text-purple-100 leading-relaxed">
                💡 <strong>Tip:</strong> Referring just 15 sports clubs on the Pro plan ($199/mo) unlocks the <strong>Silver Tier (25%)</strong> and generates <strong>{formatCurrency(746.25)} per month</strong> in passive recurring revenue!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: LINKS & PROMO CODES */}
      {activeTab === 'links' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold text-foreground">Your Custom Tracking Link & Promo Discount Code</h2>
            <p className="text-xs text-muted-foreground">
              Share these credentials on your website, social media pages, email newsletters, or directly with sports club directors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Primary Link Card */}
            <div className="p-6 rounded-3xl bg-card border border-border space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-foreground font-extrabold text-base">
                <Share2 className="size-5 text-[#8B14C2]" />
                <span>Primary Referral Tracking Link</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Every click through this link is tracked to your affiliate account and cookied for 90 days.
              </p>

              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
                <div className="font-mono text-xs text-emerald-400 truncate select-all">
                  https://squaddeck.com/ref/{activeAffiliate.referralCode.toLowerCase()}
                </div>
                <button
                  onClick={handleCopyLink}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#8B14C2] hover:bg-[#8B14C2]/90 text-white font-bold text-xs flex items-center justify-center gap-1.5 shrink-0 transition-colors"
                >
                  {copiedLink ? <Check className="size-4 text-emerald-300" /> : <Copy className="size-4" />}
                  <span>{copiedLink ? 'Copied Link!' : 'Copy Link'}</span>
                </button>
              </div>
            </div>

            {/* Promo Code Card */}
            <div className="p-6 rounded-3xl bg-card border border-border space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-foreground font-extrabold text-base">
                <Gift className="size-5 text-[#8B14C2]" />
                <span>20% Off Exclusive Promo Discount Code</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Clubs receive an instant 20% discount on their first year subscription when entering this code at checkout.
              </p>

              <div className="p-4 bg-purple-50 dark:bg-purple-950/40 rounded-2xl border border-purple-200 dark:border-purple-900/60 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300 block">
                    Your Promo Code
                  </span>
                  <span className="font-black text-xl text-[#27125B] dark:text-purple-100 tracking-wider font-mono">
                    {activeAffiliate.referralCode}
                  </span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-800 hover:bg-purple-100 font-bold text-xs text-[#27125B] dark:text-purple-200 flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  {copiedCode ? <Check className="size-4 text-emerald-600" /> : <Copy className="size-4 text-[#8B14C2]" />}
                  <span>{copiedCode ? 'Copied Code!' : 'Copy Code'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Campaign Link Builder Banner */}
          <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="space-y-1">
              <h3 className="font-extrabold text-base text-white">Need Custom Tracking Codes for Instagram or YouTube?</h3>
              <p className="text-xs text-slate-300">
                You can generate unlimited custom sub-tracking links in the Links & Campaigns manager to measure channel ROI.
              </p>
            </div>
            <Link
              href="/affiliate/links"
              className="px-5 py-2.5 rounded-xl bg-[#8B14C2] hover:bg-[#8B14C2]/90 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 transition-colors shadow-md"
            >
              <span>Manage Referral Links</span>
              <ExternalLink className="size-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* TAB 4: MARKETING PLAYBOOK */}
      {activeTab === 'playbook' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold text-foreground">Affiliate Marketing Playbook & Swipe Files</h2>
            <p className="text-xs text-muted-foreground">
              Use these battle-tested email templates, presentation slide decks, and social media copy to pitch SquadDeck to sports leaders.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Email Template Swipe File */}
            <div className="lg:col-span-7 p-6 rounded-3xl bg-card border border-border space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="size-5 text-[#8B14C2]" />
                  <h3 className="font-extrabold text-base text-foreground">Cold Email Template for Sports Directors</h3>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 text-[#8B14C2] font-bold text-xs flex items-center gap-1.5 hover:bg-purple-100 transition-colors"
                >
                  {copiedEmail ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
                  <span>{copiedEmail ? 'Copied Email!' : 'Copy Script'}</span>
                </button>
              </div>

              <pre className="p-4 bg-slate-900 text-slate-200 rounded-2xl text-xs font-sans whitespace-pre-wrap leading-relaxed border border-slate-800 select-all overflow-x-auto max-h-72">
                {sampleEmailCopy}
              </pre>
            </div>

            {/* Right: Media Assets & Pitch Deck PDF */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-3xl bg-card border border-border space-y-3 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-[#8B14C2] flex items-center justify-center font-bold">
                  <Download className="size-5" />
                </div>
                <h3 className="font-extrabold text-base text-foreground">SquadDeck Club Pitch Deck (PDF)</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  A high-converting 10-slide presentation showcasing features, parent mobile app, and automated fee collection.
                </p>
                <Link
                  href="/affiliate/marketing"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B14C2] hover:underline pt-2"
                >
                  <span>Download Pitch Deck PDF</span>
                  <ExternalLink className="size-3.5" />
                </Link>
              </div>

              <div className="p-6 rounded-3xl bg-card border border-border space-y-3 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center font-bold">
                  <Share2 className="size-5" />
                </div>
                <h3 className="font-extrabold text-base text-foreground">Social Banners & Logos Pack</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  High-resolution PNG/SVG logos, Instagram story templates, and LinkedIn announcement banners.
                </p>
                <Link
                  href="/affiliate/marketing"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:underline pt-2"
                >
                  <span>Browse Media Kit Assets</span>
                  <ExternalLink className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: LIVE REFERRAL SIMULATOR */}
      {activeTab === 'simulator' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold text-foreground">Interactive Live Referral Simulator</h2>
            <p className="text-xs text-muted-foreground">
              Experience the affiliate engine in action! Test drive a simulated referral to see how clicks, customer signups, and commission metrics post live on your portal.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-6 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30">
                <PlayCircle className="size-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">Simulate a Sports Club Signup</h3>
                <p className="text-xs text-slate-400">Choose a club name and plan tier to generate live commission.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Simulated Organization Name:
                </label>
                <input
                  type="text"
                  value={simOrgName}
                  onChange={(e) => setSimOrgName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold text-xs focus:ring-2 focus:ring-[#8B14C2] outline-none"
                  placeholder="Enter club name..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Subscribed Plan:
                </label>
                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-between text-xs font-bold text-emerald-400">
                  <span>SquadDeck Pro ($199/mo)</span>
                  <span>20% = $39.80 / mo</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRunSimulator}
              disabled={isSimulating}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-[#8B14C2] hover:opacity-95 text-slate-950 font-black text-sm shadow-xl shadow-emerald-950/40 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              {isSimulating ? (
                <span>Generating Demo Conversion & Updating Portal...</span>
              ) : (
                <>
                  <Zap className="size-5" />
                  <span>Simulate Referral & Post $39.80 Monthly Commission Live</span>
                </>
              )}
            </button>

            {simulatedDone && (
              <div className="p-5 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-100 text-xs space-y-3 animate-in fade-in zoom-in duration-300 shadow-xl">
                <div className="flex items-center gap-2 font-black text-base text-emerald-300">
                  <CheckCircle2 className="size-6 text-emerald-400 shrink-0" />
                  <span>Success! Demo Customer Added & Dashboard Metrics Refreshed!</span>
                </div>
                <p className="text-emerald-200 leading-relaxed">
                  "{simOrgName}" has been added to your referred organizations under <strong>Bronze Tier (20%)</strong>. Check your <Link href="/affiliate/dashboard" className="font-bold underline text-white">Dashboard</Link> or <Link href="/affiliate/customers" className="font-bold underline text-white">Customers</Link> tab to view your updated totals!
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 6: FAQ & SUPPORT */}
      {activeTab === 'faq' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold text-foreground">Frequently Asked Partner Questions</h2>
            <p className="text-xs text-muted-foreground">
              Everything you need to know about cookie tracking, payout dates, tier upgrades, and promo codes.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-3xl bg-card border border-border space-y-2 transition-all cursor-pointer"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-sm text-foreground flex items-center gap-2">
                      <HelpCircle className="size-4 text-[#8B14C2]" />
                      <span>{faq.q}</span>
                    </h3>
                    {isOpen ? <ChevronUp className="size-4 text-muted-foreground" /> : <ChevronDown className="size-4 text-muted-foreground" />}
                  </div>

                  {isOpen && (
                    <p className="text-xs text-muted-foreground leading-relaxed pt-2 border-t border-border animate-in fade-in duration-200">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
