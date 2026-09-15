'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  ArrowLeft,
  X,
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
} from 'lucide-react';
import { useAffiliateDemo } from '@/context/affiliate-demo-context';
import { formatCurrency } from '@/lib/affiliate/calculations';

interface OnboardingStep {
  id: string;
  title: string;
  shortTitle: string;
  subtitle: string;
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome & Program Overview',
    shortTitle: '1. Welcome',
    subtitle: 'Learn how commission tiers, 90-day cookies, and payouts work.',
  },
  {
    id: 'links',
    title: 'Referral Link & Promo Code',
    shortTitle: '2. Links & Codes',
    subtitle: 'Grab your unique referral link and custom 20% discount coupon.',
  },
  {
    id: 'marketing',
    title: 'Explore Marketing Materials',
    shortTitle: '3. Marketing Hub',
    subtitle: 'Access email copy, club pitch decks, and social media banners.',
  },
  {
    id: 'payouts',
    title: 'Set Payout Preferences',
    shortTitle: '4. Payout Setup',
    subtitle: 'Configure PayPal, Direct Bank Deposit (ACH), or Stripe.',
  },
  {
    id: 'testdrive',
    title: 'Interactive Referral Test Drive',
    shortTitle: '5. Test Drive',
    subtitle: 'Simulate your first referred club and watch live earnings generate!',
  },
];

export function OnboardingWizard() {
  const {
    activeAffiliate,
    isOnboardingOpen,
    closeOnboarding,
    onboardingCompletedSteps,
    completeOnboardingStep,
    onboardingCurrentStep,
    setOnboardingCurrentStep,
    simulateAddDemoCustomer,
  } = useAffiliateDemo();

  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [simulatedTestClub, setSimulatedTestClub] = useState('Coastal Soccer Academy');
  const [testSimulated, setTestSimulated] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  if (!isOnboardingOpen) return null;

  const currentStepData = ONBOARDING_STEPS[onboardingCurrentStep - 1];
  const isLastStep = onboardingCurrentStep === ONBOARDING_STEPS.length;
  const isFirstStep = onboardingCurrentStep === 1;

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

  const handleRunTestDrive = () => {
    setIsSimulating(true);
    setTimeout(() => {
      simulateAddDemoCustomer(activeAffiliate.id);
      setIsSimulating(false);
      setTestSimulated(true);
      completeOnboardingStep('testdrive');
    }, 700);
  };

  const handleNextStep = () => {
    completeOnboardingStep(currentStepData.id);
    if (!isLastStep) {
      setOnboardingCurrentStep(onboardingCurrentStep + 1);
    } else {
      closeOnboarding();
    }
  };

  const handlePrevStep = () => {
    if (!isFirstStep) {
      setOnboardingCurrentStep(onboardingCurrentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-[#27125B] via-[#3B1578] to-[#8B14C2] px-6 py-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300">
              <Sparkles className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-200">
                  New Partner Onboarding Guide
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 px-2 py-0.5 rounded-full font-semibold">
                  Step {onboardingCurrentStep} of {ONBOARDING_STEPS.length}
                </span>
              </div>
              <h2 className="text-xl font-black text-white">{currentStepData.title}</h2>
            </div>
          </div>

          <button
            onClick={closeOnboarding}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
            aria-label="Close onboarding wizard"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Step Indicator Nav Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 shrink-0 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[550px] gap-2">
            {ONBOARDING_STEPS.map((step, idx) => {
              const stepNum = idx + 1;
              const isCurrent = stepNum === onboardingCurrentStep;
              const isCompleted = onboardingCompletedSteps.includes(step.id);

              return (
                <button
                  key={step.id}
                  onClick={() => setOnboardingCurrentStep(stepNum)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isCurrent
                      ? 'bg-[#27125B] text-white shadow-md'
                      : isCompleted
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isCurrent
                        ? 'bg-white text-[#27125B]'
                        : isCompleted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {isCompleted && !isCurrent ? <Check className="w-3 h-3" /> : stepNum}
                  </span>
                  <span>{step.shortTitle}</span>
                </button>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-slate-200 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#27125B] to-[#8B14C2] transition-all duration-300"
              style={{ width: `${((onboardingCurrentStep) / ONBOARDING_STEPS.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Body Content - Scrollable */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* STEP 1: WELCOME */}
          {onboardingCurrentStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50/50 border border-purple-200 text-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-[#27125B] font-extrabold text-base">
                  <Award className="size-5 text-[#8B14C2]" />
                  <span>Congratulations, {activeAffiliate.name}! Your account is ready.</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  SquadDeck is the leading management platform for youth sports clubs, leagues, and training academies. As an affiliate partner, you earn generous recurring commissions every month for as long as your referred clubs stay active!
                </p>
              </div>

              {/* Commission Tier Matrix */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Commission Tier Structure (Monthly Recurring)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full">
                      Bronze Tier
                    </span>
                    <p className="text-xl font-black text-[#27125B]">20%</p>
                    <p className="text-[11px] text-slate-500">1 - 9 Clubs</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 bg-slate-200 text-slate-800 rounded-full">
                      Silver Tier
                    </span>
                    <p className="text-xl font-black text-[#27125B]">25%</p>
                    <p className="text-[11px] text-slate-500">10 - 24 Clubs</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#8B14C2]/5 border border-[#8B14C2]/30 text-center space-y-1 relative">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 bg-amber-400/20 text-[#8B14C2] rounded-full border border-[#8B14C2]/30">
                      Gold Tier
                    </span>
                    <p className="text-xl font-black text-[#8B14C2]">30%</p>
                    <p className="text-[11px] text-slate-500">25 - 49 Clubs</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-purple-900/5 border border-purple-300 text-center space-y-1">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 bg-purple-900 text-white rounded-full">
                      Platinum
                    </span>
                    <p className="text-xl font-black text-[#27125B]">35%</p>
                    <p className="text-[11px] text-slate-500">50+ Clubs</p>
                  </div>
                </div>
              </div>

              {/* Key Rules Card */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs">
                  <Zap className="size-4 text-[#8B14C2] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">90-Day Cookie Window</span>
                    <span className="text-slate-500 text-[11px]">Attribution lasts 90 days after first link click.</span>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs">
                  <CreditCard className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Monthly Payouts</span>
                    <span className="text-slate-500 text-[11px]">Paid automatically on the 15th of every month.</span>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs">
                  <ShieldCheck className="size-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Zero Minimum Threshold</span>
                    <span className="text-slate-500 text-[11px]">Withdraw starting from just $20 in earnings.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: REFERRAL LINKS & PROMO CODE */}
          {onboardingCurrentStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">Your Custom Tracking Link</h3>
                <p className="text-xs text-slate-500">
                  Share this unique link on your website, social media, or directly with club directors.
                </p>
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
                  <div className="font-mono text-xs text-emerald-400 break-all select-all">
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

              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">Your Exclusive 20% Discount Promo Code</h3>
                <p className="text-xs text-slate-500">
                  Give clubs an extra incentive: entering this code gives them 20% off their first year subscription!
                </p>
                <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 block">Coupon Code</span>
                    <span className="font-black text-lg text-[#27125B] tracking-wider font-mono">
                      {activeAffiliate.referralCode}
                    </span>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="px-4 py-2 rounded-xl bg-white border border-purple-200 hover:bg-purple-100 font-bold text-xs text-[#27125B] flex items-center gap-1.5 shadow-sm transition-colors"
                  >
                    {copiedCode ? <Check className="size-4 text-emerald-600" /> : <Gift className="size-4 text-[#8B14C2]" />}
                    <span>{copiedCode ? 'Copied Code!' : 'Copy Code'}</span>
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
                <Sparkles className="size-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Pro Tip:</strong> You can create custom campaign links (e.g. for Instagram vs Email newsletters) inside the <Link href="/affiliate/links" onClick={closeOnboarding} className="font-bold underline text-amber-950">Links & Campaigns</Link> tab!
                </p>
              </div>
            </div>
          )}

          {/* STEP 3: MARKETING MATERIALS */}
          {onboardingCurrentStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">Ready-To-Use Promotion Collateral</h3>
                <p className="text-xs text-slate-500">
                  We provide professionally designed assets so you don't have to design anything from scratch.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-purple-300 transition-all space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#8B14C2] flex items-center justify-center font-bold">
                    <Download className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">Club Pitch Deck PDF</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      A 10-slide presentation explaining how SquadDeck automates club registrations, payments, and schedules.
                    </p>
                  </div>
                  <span className="inline-block text-[11px] font-semibold text-[#8B14C2]">Includes ROI Calculator</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-purple-300 transition-all space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    <Share2 className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">Social Media & Email Swipe Copy</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Pre-written email templates for sports directors, Instagram post graphics, and Facebook announcements.
                    </p>
                  </div>
                  <span className="inline-block text-[11px] font-semibold text-indigo-700">5 High-Converting Templates</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-900 to-[#27125B] text-white flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-purple-200">Full Media Kit Library</span>
                  <p className="text-xs text-slate-300">Browse 25+ logos, banners, video demos, and printable flyers.</p>
                </div>
                <Link
                  href="/affiliate/marketing"
                  onClick={closeOnboarding}
                  className="px-4 py-2 rounded-xl bg-white text-[#27125B] font-bold text-xs hover:bg-slate-100 flex items-center gap-1.5 shrink-0 transition-colors shadow-md"
                >
                  <span>Open Marketing Hub</span>
                  <ExternalLink className="size-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* STEP 4: PAYOUT PREFERENCES */}
          {onboardingCurrentStep === 4 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">Configure How You Get Paid</h3>
                <p className="text-xs text-slate-500">
                  Select your preferred payout method. Payouts process automatically on the 15th of each month.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl border-2 border-[#8B14C2] bg-purple-50/50 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#8B14C2] text-white flex items-center justify-center font-bold">
                      <CreditCard className="size-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">PayPal Express Transfer</h4>
                      <p className="text-xs text-slate-500">Instant transfer to your PayPal email address.</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300">
                    Default Active
                  </span>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3 opacity-90">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center font-bold">
                      <Building2 className="size-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">Direct Bank Deposit (ACH / IBAN)</h4>
                      <p className="text-xs text-slate-500">Direct transfer to your corporate or personal bank account.</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400 font-semibold">Available</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Minimum Payout Threshold:</span>
                <span className="font-extrabold text-[#27125B] bg-white px-3 py-1 rounded-lg border border-slate-300">
                  $20.00 USD
                </span>
              </div>

              <div className="text-center">
                <Link
                  href="/affiliate/settings"
                  onClick={closeOnboarding}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B14C2] hover:underline"
                >
                  <span>Edit Payment Info in Settings</span>
                  <ExternalLink className="size-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* STEP 5: INTERACTIVE TEST DRIVE */}
          {onboardingCurrentStep === 5 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 mb-1">
                  <PlayCircle className="size-3.5 text-emerald-600" />
                  <span>Interactive Live Simulator</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">Simulate Your First Referred Club</h3>
                <p className="text-xs text-slate-500">
                  Test drive the affiliate engine! Click below to simulate a sports organization clicking your link and signing up for a SquadDeck Pro plan ($199/mo).
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4 shadow-xl">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Sample Club Name
                  </label>
                  <input
                    type="text"
                    value={simulatedTestClub}
                    onChange={(e) => setSimulatedTestClub(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold text-xs focus:ring-2 focus:ring-[#8B14C2] outline-none"
                    placeholder="Enter club name..."
                  />
                </div>

                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Selected Plan:</span>
                  <span className="font-bold text-emerald-400">Pro Club Tier ($199/mo)</span>
                </div>

                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Your 20% Monthly Commission:</span>
                  <span className="font-black text-xl text-emerald-400">$39.80 / month</span>
                </div>

                <button
                  type="button"
                  onClick={handleRunTestDrive}
                  disabled={isSimulating}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isSimulating ? (
                    <span>Processing Demo Conversion...</span>
                  ) : (
                    <>
                      <Zap className="size-4" />
                      <span>Simulate Referral & Earn $39.80 Commission</span>
                    </>
                  )}
                </button>
              </div>

              {testSimulated && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-2 animate-in fade-in zoom-in duration-300">
                  <div className="flex items-center gap-2 font-black text-emerald-800">
                    <CheckCircle2 className="size-5 text-emerald-600 shrink-0" />
                    <span>Success! Commission Generated & Dashboard Updated!</span>
                  </div>
                  <p className="text-emerald-700 leading-relaxed">
                    "{simulatedTestClub}" has been added to your referred customers. Your total revenue, active referrals count, and pending commission metrics have updated in real time!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Action Navigation */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={handlePrevStep}
            disabled={isFirstStep}
            className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white font-bold text-xs text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="size-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={closeOnboarding}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
            >
              Skip Tour
            </button>

            <button
              type="button"
              onClick={handleNextStep}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#27125B] to-[#8B14C2] hover:opacity-95 text-white font-bold text-xs shadow-lg shadow-purple-900/20 flex items-center gap-1.5 transition-all"
            >
              <span>{isLastStep ? 'Complete Onboarding' : 'Next Step'}</span>
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
