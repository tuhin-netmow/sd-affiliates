'use me'
'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Play,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  MousePointerClick,
  UserPlus,
  Zap,
  DollarSign,
  Check,
  CreditCard,
  Send,
  AlertTriangle,
  Award,
  Tag,
  ExternalLink,
  ShieldCheck,
  LayoutDashboard,
  Building,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react'

import { useAffiliateDemo } from '@/context/affiliate-demo-context'
import { AffiliateLifecycleTimeline } from '@/components/timeline/affiliate-lifecycle-timeline'
import { ConfirmationModal } from '@/components/shared/confirmation-modal'
import { ExplanatoryCallout } from '@/components/shared/explanatory-callout'

export default function DemoControlCenterPage() {
  const {
    activeAffiliate,
    demoWorkflow,
    simulateReferralClick,
    simulateSignup,
    simulateUpgradeCustomer,
    simulateGenerateCommission,
    approveCommission,
    makeCommissionPayable,
    requestPayout,
    approvePayout,
    markPayoutPaid,
    simulateRefund,
    simulateAddDemoCustomer,
    simulateCouponUsage,
    resetDemo,
    customers,
    commissions,
    payouts,
    referralLinks,
    coupons
  } = useAffiliateDemo()

  const [showResetModal, setShowResetModal] = useState(false)
  const [selectedCouponId, setSelectedCouponId] = useState(coupons[0]?.id || 'coup-1')

  const targetCustomer = customers.find(c => c.id === demoWorkflow.simulatedCustomerId) || customers[0]
  const targetCommission = commissions.find(c => c.id === demoWorkflow.simulatedCommissionId) || commissions[0]
  const targetPayout = payouts.find(p => p.id === demoWorkflow.simulatedPayoutId) || payouts[0]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-16">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 lg:px-8 py-3.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#27125B] via-[#431D80] to-[#8B14C2] flex items-center justify-center text-white font-bold shadow-md shadow-[#8B14C2]/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                SquadDeck Affiliate Demo Control Center
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                10-Step Interactive Workflow
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Frontend Prototype & Direct Data Simulator
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/affiliate/dashboard"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-indigo-500" />
            Affiliate Portal
          </Link>
          <Link
            href="/admin/affiliates"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-purple-500" />
            Admin Portal
          </Link>
          <button
            onClick={() => setShowResetModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 rounded-lg text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Demo
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-6 space-y-8">
        {/* Banner */}
        <ExplanatoryCallout
          title="Interactive Client Walkthrough Guide"
          description="Use the buttons below to trigger each stage of the affiliate lifecycle in real time. Notice how state updates synchronously across both the Affiliate Portal and Admin Portal without any server requests or databases!"
          variant="indigo"
        />

        {/* Global Progress Timeline */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-600" />
              Live Affiliate Lifecycle Progression (Step {demoWorkflow.currentStep} of 10)
            </h2>
            <span className="text-xs text-slate-500">
              Active Affiliate: <strong className="text-slate-900 dark:text-white">{activeAffiliate.name}</strong> ({activeAffiliate.referralCode})
            </span>
          </div>
          <AffiliateLifecycleTimeline currentStep={demoWorkflow.currentStep} />
        </div>

        {/* 10 Guided Workflow Steps */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600" />
            Standard 10-Step Affiliate Lifecycle Simulation
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Step 1 */}
            <div className={`p-4 rounded-xl border transition-all ${demoWorkflow.currentStep >= 1 ? 'bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-900/60 shadow-sm' : 'bg-slate-100/60 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800 opacity-60'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center">1</span>
                <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">Active</span>
              </div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">Affiliate Selected</h3>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                {activeAffiliate.name} ({activeAffiliate.tier} Tier - {(activeAffiliate.stats.payableCommission || 25)}% Comm)
              </p>
              <div className="mt-3 text-[11px] font-mono text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/80 p-1.5 rounded border border-slate-200 dark:border-slate-700">
                Code: {activeAffiliate.referralCode}
              </div>
            </div>

            {/* Step 2 */}
            <div className={`p-4 rounded-xl border transition-all ${demoWorkflow.currentStep >= 2 ? 'bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-900/60 shadow-sm' : 'bg-slate-100/60 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center">2</span>
                <MousePointerClick className="w-4 h-4 text-indigo-500" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">Referral Click</h3>
              <p className="text-[11px] text-slate-500 mt-1">
                Clicks: {demoWorkflow.referralClicksCount} tracked
              </p>
              <button
                onClick={() => simulateReferralClick(activeAffiliate.id, referralLinks[0]?.id)}
                className="mt-3 w-full py-1.5 px-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[11px] font-medium transition-colors flex items-center justify-center gap-1"
              >
                <MousePointerClick className="w-3 h-3" />
                Simulate Click
              </button>
            </div>

            {/* Step 3 */}
            <div className={`p-4 rounded-xl border transition-all ${demoWorkflow.currentStep >= 3 ? 'bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-900/60 shadow-sm' : 'bg-slate-100/60 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center">3</span>
                <UserPlus className="w-4 h-4 text-indigo-500" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">Visitor Signup</h3>
              <p className="text-[11px] text-slate-500 mt-1 truncate">
                Org: {demoWorkflow.simulatedOrgName}
              </p>
              <button
                onClick={() => simulateSignup(activeAffiliate.id, 'Riverside Basketball Club', 'Marcus Evans', 'Free')}
                className="mt-3 w-full py-1.5 px-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[11px] font-medium transition-colors flex items-center justify-center gap-1"
              >
                <UserPlus className="w-3 h-3" />
                Simulate Signup
              </button>
            </div>

            {/* Step 4 */}
            <div className={`p-4 rounded-xl border transition-all ${demoWorkflow.currentStep >= 4 ? 'bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-900/60 shadow-sm' : 'bg-slate-100/60 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center">4</span>
                <Zap className="w-4 h-4 text-amber-500" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">Upgrade Customer</h3>
              <p className="text-[11px] text-slate-500 mt-1">
                Plan: {demoWorkflow.simulatedPlan} ($49/mo)
              </p>
              <button
                onClick={() => simulateUpgradeCustomer(targetCustomer.id, 'Pro')}
                className="mt-3 w-full py-1.5 px-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[11px] font-medium transition-colors flex items-center justify-center gap-1"
              >
                <Zap className="w-3 h-3 text-amber-300" />
                Upgrade to Pro
              </button>
            </div>

            {/* Step 5 */}
            <div className={`p-4 rounded-xl border transition-all ${demoWorkflow.currentStep >= 5 ? 'bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-900/60 shadow-sm' : 'bg-slate-100/60 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center">5</span>
                <DollarSign className="w-4 h-4 text-emerald-500" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">Generate Commission</h3>
              <p className="text-[11px] text-slate-500 mt-1">
                $49 × 25% = $12.25
              </p>
              <button
                onClick={() => simulateGenerateCommission(targetCustomer.id, 49, 0.25)}
                className="mt-3 w-full py-1.5 px-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[11px] font-medium transition-colors flex items-center justify-center gap-1"
              >
                <DollarSign className="w-3 h-3" />
                Generate Comm
              </button>
            </div>

            {/* Step 6 */}
            <div className={`p-4 rounded-xl border transition-all ${demoWorkflow.currentStep >= 6 ? 'bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-900/60 shadow-sm' : 'bg-slate-100/60 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center">6</span>
                <Check className="w-4 h-4 text-blue-500" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">Approve Comm</h3>
              <p className="text-[11px] text-slate-500 mt-1">
                Status: {demoWorkflow.simulatedCommissionStatus || 'Pending'}
              </p>
              <button
                onClick={() => approveCommission(targetCommission.id)}
                className="mt-3 w-full py-1.5 px-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[11px] font-medium transition-colors flex items-center justify-center gap-1"
              >
                <Check className="w-3 h-3" />
                Approve Comm
              </button>
            </div>

            {/* Step 7 */}
            <div className={`p-4 rounded-xl border transition-all ${demoWorkflow.currentStep >= 7 ? 'bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-900/60 shadow-sm' : 'bg-slate-100/60 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center">7</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">Make Payable</h3>
              <p className="text-[11px] text-slate-500 mt-1">
                Cleared to balance
              </p>
              <button
                onClick={() => makeCommissionPayable(targetCommission.id)}
                className="mt-3 w-full py-1.5 px-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[11px] font-medium transition-colors flex items-center justify-center gap-1"
              >
                <CheckCircle2 className="w-3 h-3" />
                Make Payable
              </button>
            </div>

            {/* Step 8 */}
            <div className={`p-4 rounded-xl border transition-all ${demoWorkflow.currentStep >= 8 ? 'bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-900/60 shadow-sm' : 'bg-slate-100/60 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center">8</span>
                <Send className="w-4 h-4 text-purple-500" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">Request Payout</h3>
              <p className="text-[11px] text-slate-500 mt-1">
                Req: $720.00
              </p>
              <button
                onClick={() => requestPayout(activeAffiliate.id, 720.0, 'PayPal')}
                className="mt-3 w-full py-1.5 px-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[11px] font-medium transition-colors flex items-center justify-center gap-1"
              >
                <Send className="w-3 h-3" />
                Request Payout
              </button>
            </div>

            {/* Step 9 */}
            <div className={`p-4 rounded-xl border transition-all ${demoWorkflow.currentStep >= 9 ? 'bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-900/60 shadow-sm' : 'bg-slate-100/60 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center">9</span>
                <ShieldCheck className="w-4 h-4 text-indigo-500" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">Approve Payout</h3>
              <p className="text-[11px] text-slate-500 mt-1">
                Admin review passed
              </p>
              <button
                onClick={() => approvePayout(targetPayout.id)}
                className="mt-3 w-full py-1.5 px-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[11px] font-medium transition-colors flex items-center justify-center gap-1"
              >
                <ShieldCheck className="w-3 h-3" />
                Approve Payout
              </button>
            </div>

            {/* Step 10 */}
            <div className={`p-4 rounded-xl border transition-all ${demoWorkflow.currentStep >= 10 ? 'bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-900/60 shadow-sm' : 'bg-slate-100/60 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center">10</span>
                <CreditCard className="w-4 h-4 text-emerald-500" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">Mark Payout Paid</h3>
              <p className="text-[11px] text-slate-500 mt-1">
                Disbursement completed
              </p>
              <button
                onClick={() => markPayoutPaid(targetPayout.id)}
                className="mt-3 w-full py-1.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-medium transition-colors flex items-center justify-center gap-1"
              >
                <CreditCard className="w-3 h-3" />
                Mark Paid
              </button>
            </div>
          </div>
        </div>

        {/* Feature Simulations Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Refund Simulation */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-rose-50 dark:bg-rose-950 flex items-center justify-center text-rose-600 dark:text-rose-400">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  1. Refund & Reversal Demo
                </h3>
                <p className="text-xs text-slate-500">Claw back commission upon refund</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Simulate a customer requesting a 30-day money-back refund. The system automatically issues a -$12.25 reversal entry and updates balances.
            </p>
            <button
              onClick={() => simulateRefund(targetCommission.id)}
              className="w-full py-2 px-3 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <AlertTriangle className="w-4 h-4" />
              Simulate Refund (-$12.25)
            </button>
          </div>

          {/* Tier Upgrade Simulation */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-950 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  2. Tier Elevation Demo
                </h3>
                <p className="text-xs text-slate-500">Unlock 25% → 30% Gold rate</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Add demo customers to reach the 25 paid customer milestone. Watch {activeAffiliate.name} automatically get elevated to Gold Tier!
            </p>
            <button
              onClick={() => simulateAddDemoCustomer(activeAffiliate.id)}
              className="w-full py-2 px-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Award className="w-4 h-4" />
              Add Customer ({activeAffiliate.stats.paidCustomers}/25)
            </button>
          </div>

          {/* Coupon Usage Simulation */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-purple-50 dark:bg-purple-950 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  3. Coupon Redemption Demo
                </h3>
                <p className="text-xs text-slate-500">Track promo code attribution</p>
              </div>
            </div>
            <div className="space-y-2">
              <select
                value={selectedCouponId}
                onChange={(e) => setSelectedCouponId(e.target.value)}
                className="w-full px-3 py-1.5 rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono"
              >
                {coupons.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.code} ({c.discount})
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => simulateCouponUsage(selectedCouponId, 'Metro Soccer Club')}
              className="w-full py-2 px-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Tag className="w-4 h-4" />
              Simulate Coupon Redemption
            </button>
          </div>
        </div>

        {/* Live Portal Deep Links */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Explore Updated Data Across Portals
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link
              href="/affiliate/commissions"
              className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 group"
            >
              <span>Affiliate Commissions</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600" />
            </Link>
            <Link
              href="/affiliate/payouts"
              className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 group"
            >
              <span>Affiliate Payouts</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600" />
            </Link>
            <Link
              href="/admin/affiliates/commissions"
              className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 group"
            >
              <span>Admin Commissions</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600" />
            </Link>
            <Link
              href="/admin/affiliates/audit-logs"
              className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 group"
            >
              <span>Admin Audit Logs</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600" />
            </Link>
          </div>
        </div>
      </div>

      {/* Confirmation Modal for Reset */}
      <ConfirmationModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirm={() => {
          resetDemo()
          setShowResetModal(false)
        }}
        title="Reset Demo State?"
        description="This will restore all 16 mock data collections, reset commission states, clear generated notifications, and restart the 10-step demo workflow."
        confirmText="Reset Entire Demo"
        confirmVariant="danger"
      />
    </div>
  )
}
