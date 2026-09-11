'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Sparkles,
  LayoutDashboard,
  ShieldCheck,
  Play,
  ArrowRight,
  Zap,
  Users,
  DollarSign,
  Layers,
  CheckCircle2,
  Lock,
  BarChart3,
  Award,
  ShieldAlert,
  Globe,
  TrendingUp,
  CreditCard,
  Target,
  Gift,
  HelpCircle,
  ChevronRight,
  Check,
  Star,
  Flame,
  MousePointerClick,
  ArrowUp
} from 'lucide-react'
import { useEffect } from 'react'
import { MainHeader } from '@/components/shared/main-header'
import { MainFooter } from '@/components/shared/main-footer'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'affiliate' | 'admin' | 'demo'>('affiliate')
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true)
      } else {
        setShowBackToTop(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-[#8B14C2]/20 selection:text-[#27125B] font-sans relative overflow-x-hidden">
      
      {/* Cool Light Ambient Background Glows & Floating Animations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-purple-200/40 via-purple-100/20 to-transparent rounded-full blur-3xl animate-pulse duration-10000"></div>
        <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-gradient-to-bl from-[#8B14C2]/10 via-purple-100/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-gradient-to-tr from-[#27125B]/5 via-purple-200/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Navigation Header */}
      <MainHeader currentPage="home" />

      {/* Main Content */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-6 lg:px-12 pt-28 lg:pt-32 pb-12 lg:pb-16 space-y-24">

        {/* HERO SECTION */}
        <section className="text-center space-y-8 max-w-4xl mx-auto pt-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200/80 text-[#27125B] text-xs font-bold shadow-sm animate-pulse">
            <Sparkles className="w-4 h-4 text-[#8B14C2] animate-spin-slow" />
            <span>Empower Sports Clubs & Earn Monthly Recurring Revenue</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#27125B] tracking-tight leading-[1.15]">
            Turn Your Sports Network Into{' '}
            <span className="bg-gradient-to-r from-[#27125B] via-[#8B14C2] to-purple-600 bg-clip-text text-transparent animate-gradient">
              Recurring Income
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Partner with SquadDeck to refer youth sports leagues, high school departments, and academies. Earn up to <strong className="text-[#27125B] font-bold">35% recurring commissions</strong> for life with 90-day tracking cookies.
          </p>

          {/* Hero Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/register"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#27125B] to-[#8B14C2] hover:opacity-95 text-white font-bold text-sm shadow-xl shadow-[#27125B]/25 hover:shadow-2xl transition-all flex items-center justify-center gap-2 group hover:-translate-y-1 active:translate-y-0"
            >
              <span>Become an Affiliate Partner</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>

            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-[#27125B] font-bold text-sm border border-slate-200/90 shadow-md hover:border-slate-300 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4 text-[#8B14C2]" />
              <span>Portal Login (Affiliate / Admin)</span>
            </Link>

            <Link
              href="/demo"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-purple-50 hover:bg-purple-100/80 text-[#8B14C2] font-bold text-sm border border-purple-200 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
            >
              <Play className="w-4 h-4 fill-[#8B14C2] group-hover:scale-110 transition-transform" />
              <span>Launch Demo Center</span>
            </Link>
          </div>

          {/* Floating Stat Pills */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 max-w-3xl mx-auto">
            <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center group">
              <span className="text-2xl font-black text-[#27125B] group-hover:text-[#8B14C2] transition-colors">$124,500+</span>
              <p className="text-[11px] font-semibold text-slate-500 mt-0.5">Paid to Partners</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center group">
              <span className="text-2xl font-black text-[#8B14C2]">Up to 35%</span>
              <p className="text-[11px] font-semibold text-slate-500 mt-0.5">Recurring Commission</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center group">
              <span className="text-2xl font-black text-[#27125B] group-hover:text-[#8B14C2] transition-colors">90 Days</span>
              <p className="text-[11px] font-semibold text-slate-500 mt-0.5">Cookie Duration</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center group">
              <span className="text-2xl font-black text-emerald-600">Monthly</span>
              <p className="text-[11px] font-semibold text-slate-500 mt-0.5">Automatic Payouts</p>
            </div>
          </div>
        </section>


        {/* PORTAL GATEWAY SECTION */}
        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-bold text-[#8B14C2] uppercase tracking-wider px-3.5 py-1 rounded-full bg-purple-50 border border-purple-100 shadow-sm">
              Access & Gateway
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#27125B]">Choose Your Portal Experience</h2>
            <p className="text-xs text-slate-500">Access both the Partner Portal and Management Dashboard via our central login page.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Option 1: Login Portal */}
            <div className="group p-8 rounded-3xl bg-white border border-slate-200/90 hover:border-[#8B14C2]/50 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-6 hover:-translate-y-1.5">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-[#27125B] group-hover:bg-[#8B14C2] group-hover:text-white transition-colors duration-300">
                  <LayoutDashboard className="w-6 h-6 group-hover:text-white text-[#8B14C2] transition-colors" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#8B14C2] uppercase tracking-wider">Unified Gateway</span>
                  <h3 className="text-xl font-bold text-[#27125B] group-hover:text-[#8B14C2] transition-colors">Partner & Admin Sign In</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Log in as an Affiliate Partner to view referral link performance, request payouts, and check commissions, or log in as Admin.
                </p>

                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Role selection switch (Affiliate vs Admin)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Pre-filled demo credentials for fast testing</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/login"
                className="w-full py-3 px-5 rounded-xl bg-slate-900 hover:bg-[#27125B] text-white font-bold text-xs transition-all flex items-center justify-between group-hover:shadow-md"
              >
                <span>Go to Login Page</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Option 2: Register Partner */}
            <div className="group p-8 rounded-3xl bg-white border border-slate-200/90 hover:border-[#8B14C2]/50 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-6 hover:-translate-y-1.5">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-[#8B14C2] group-hover:bg-[#8B14C2] group-hover:text-white transition-colors duration-300">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#8B14C2] uppercase tracking-wider">New Partners</span>
                  <h3 className="text-xl font-bold text-[#27125B] group-hover:text-[#8B14C2] transition-colors">Affiliate Registration</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Apply in under 60 seconds to join our partner ecosystem. Get instant access to custom promo links and marketing collateral.
                </p>

                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Instant approval mode for demo evaluation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Custom referral promo code creation</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/register"
                className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-[#27125B] to-[#8B14C2] text-white font-bold text-xs transition-all flex items-center justify-between shadow-md"
              >
                <span>Register Partner Account</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Option 3: Demo Simulator */}
            <div className="group p-8 rounded-3xl bg-white border border-slate-200/90 hover:border-[#8B14C2]/50 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-6 hover:-translate-y-1.5">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                  <Play className="w-6 h-6 fill-amber-500/20 group-hover:fill-white transition-colors" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Interactive Simulator</span>
                  <h3 className="text-xl font-bold text-[#27125B] group-hover:text-[#8B14C2] transition-colors">Demo Control Center</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Simulate the entire 10-step lifecycle: clicks, signups, paid upgrades, refund reversals, commission approvals, and payouts.
                </p>

                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>10-stage step-by-step simulation controls</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>One-click reset to initial prototype state</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/demo"
                className="w-full py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-bold text-xs transition-all flex items-center justify-between border border-slate-200"
              >
                <span>Launch Interactive Demo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>


        {/* AFFILIATE BENEFITS SECTION */}
        <section id="benefits" className="space-y-12 pt-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#8B14C2] uppercase tracking-wider px-3.5 py-1 rounded-full bg-purple-50 border border-purple-200 shadow-sm">
              Why Partner With SquadDeck
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#27125B] tracking-tight">
              Unmatched Benefits for Sports Affiliates
            </h2>
            <p className="text-sm text-slate-600">
              Built specifically for sports coaches, league directors, podcasters, and sports tech creators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Benefit 1 */}
            <div className="group p-7 rounded-3xl bg-white border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 space-y-4 hover:-translate-y-1.5 hover:border-purple-200">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#27125B] group-hover:bg-[#8B14C2] group-hover:text-white transition-colors duration-300">
                <DollarSign className="w-6 h-6 text-[#8B14C2] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-[#27125B] group-hover:text-[#8B14C2] transition-colors">Up to 35% Recurring Payout</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Earn steady monthly income as long as your referred clubs remain active SquadDeck subscribers. Commission checks scale with subscription growth.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="group p-7 rounded-3xl bg-white border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 space-y-4 hover:-translate-y-1.5 hover:border-purple-200">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#27125B] group-hover:bg-[#8B14C2] group-hover:text-white transition-colors duration-300">
                <Globe className="w-6 h-6 text-[#8B14C2] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-[#27125B] group-hover:text-[#8B14C2] transition-colors">90-Day Cookie Window</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Coaches often need time to consult with board members. Our 90-day cookie ensures you receive full credit whenever they complete signup.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="group p-7 rounded-3xl bg-white border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 space-y-4 hover:-translate-y-1.5 hover:border-purple-200">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#27125B] group-hover:bg-[#8B14C2] group-hover:text-white transition-colors duration-300">
                <Award className="w-6 h-6 text-[#8B14C2] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-[#27125B] group-hover:text-[#8B14C2] transition-colors">Automatic Tier Upgrades</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                As your referral count increases, automatically unlock higher commission percentages from Bronze (20%) up to Platinum (35%).
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="group p-7 rounded-3xl bg-white border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 space-y-4 hover:-translate-y-1.5 hover:border-purple-200">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#27125B] group-hover:bg-[#8B14C2] group-hover:text-white transition-colors duration-300">
                <CreditCard className="w-6 h-6 text-[#8B14C2] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-[#27125B] group-hover:text-[#8B14C2] transition-colors">Fast & Flexible Payouts</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Receive monthly disbursements directly via PayPal, Wise, or Direct Bank Transfer once your minimum threshold is reached.
              </p>
            </div>

            {/* Benefit 5 */}
            <div className="group p-7 rounded-3xl bg-white border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 space-y-4 hover:-translate-y-1.5 hover:border-purple-200">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#27125B] group-hover:bg-[#8B14C2] group-hover:text-white transition-colors duration-300">
                <Gift className="w-6 h-6 text-[#8B14C2] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-[#27125B] group-hover:text-[#8B14C2] transition-colors">Custom Promo Discount Codes</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Give your audience an exclusive discount (e.g. 10% off first 3 months) using your custom promo code to boost conversions.
              </p>
            </div>

            {/* Benefit 6 */}
            <div className="group p-7 rounded-3xl bg-white border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 space-y-4 hover:-translate-y-1.5 hover:border-purple-200">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#27125B] group-hover:bg-[#8B14C2] group-hover:text-white transition-colors duration-300">
                <BarChart3 className="w-6 h-6 text-[#8B14C2] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-[#27125B] group-hover:text-[#8B14C2] transition-colors">Real-Time Performance Dashboard</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Track click counts, lead conversions, active subscriptions, pending commissions, and historical payouts with live data.
              </p>
            </div>

          </div>
        </section>


        {/* SYSTEM FEATURES SECTION */}
        <section id="features" className="p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-white via-purple-50/40 to-slate-50 border border-slate-200/90 shadow-xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-6">
            <div>
              <span className="text-xs font-bold text-[#8B14C2] uppercase tracking-wider">Capability Overview</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#27125B] mt-1">Platform Features & Governance</h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#27125B] bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
              <Lock className="w-4 h-4 text-[#8B14C2]" />
              Zero Backend Needed • 100% Frontend Prototype
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2 bg-white p-5 rounded-2xl border border-slate-200/70 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-bold text-[#27125B]">
                <Users className="w-4 h-4 text-[#8B14C2]" />
                25 Pre-Populated Affiliates
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Loaded with realistic data for coaches, sports podcasters, academy directors, and influencers.
              </p>
            </div>

            <div className="space-y-2 bg-white p-5 rounded-2xl border border-slate-200/70 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-bold text-[#27125B]">
                <TrendingUp className="w-4 h-4 text-[#8B14C2]" />
                Attribution & Reversals
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Supports 90-day cookie window, last-touch attribution, and automatic refund reversal clawbacks.
              </p>
            </div>

            <div className="space-y-2 bg-white p-5 rounded-2xl border border-slate-200/70 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-bold text-[#27125B]">
                <Award className="w-4 h-4 text-[#8B14C2]" />
                Tier Elevation Logic
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Bronze (20%), Silver (25%), Gold (30%), Platinum (35%) automatic milestone updates.
              </p>
            </div>

            <div className="space-y-2 bg-white p-5 rounded-2xl border border-slate-200/70 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-bold text-[#27125B]">
                <ShieldAlert className="w-4 h-4 text-amber-500" />
                Fraud Detection Engine
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Flags self-referrals, duplicate orgs, click spamming, and logs all changes to audit system.
              </p>
            </div>
          </div>
        </section>


        {/* HOW IT WORKS SECTION */}
        <section id="how-it-works" className="space-y-12 pt-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-bold text-[#8B14C2] uppercase tracking-wider px-3.5 py-1 rounded-full bg-purple-50 border border-purple-200 shadow-sm">
              Simple 3-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#27125B]">How the Affiliate Program Works</h2>
            <p className="text-xs sm:text-sm text-slate-600">Start monetizing your sports connections in minutes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {/* Step 1 */}
            <div className="group bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#27125B] text-white font-black text-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-[#8B14C2] transition-all duration-300 shadow-md">
                01
              </div>
              <h3 className="text-xl font-bold text-[#27125B] group-hover:text-[#8B14C2] transition-colors">Join & Get Approved</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Fill out the quick affiliate application form. In our interactive prototype, approval is instant so you can evaluate the platform right away.
              </p>
            </div>

            {/* Step 2 */}
            <div className="group bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#8B14C2] text-white font-black text-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-[#27125B] transition-all duration-300 shadow-md">
                02
              </div>
              <h3 className="text-xl font-bold text-[#27125B] group-hover:text-[#8B14C2] transition-colors">Share Custom Links & Codes</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Use your unique referral link or promo code (`COACH2026`) in your newsletter, podcast, social media posts, or direct emails to coaches.
              </p>
            </div>

            {/* Step 3 */}
            <div className="group bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative space-y-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#27125B] to-[#8B14C2] text-white font-black text-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                03
              </div>
              <h3 className="text-xl font-bold text-[#27125B] group-hover:text-[#8B14C2] transition-colors">Collect Recurring Cash</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                When referred teams subscribe to SquadDeck software, earn 20% to 35% recurring payouts every single month.
              </p>
            </div>

          </div>
        </section>


        {/* COMMISSION TIERS SHOWCASE */}
        <section id="tiers" className="space-y-8 pt-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-bold text-[#8B14C2] uppercase tracking-wider px-3.5 py-1 rounded-full bg-purple-50 border border-purple-200 shadow-sm">
              Tier Progression
            </span>
            <h2 className="text-3xl font-extrabold text-[#27125B]">Commission Tier Structure</h2>
            <p className="text-xs text-slate-500">Higher referral volumes automatically elevate your commission rate.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Bronze Tier */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 space-y-4 text-center group">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                Starting Level
              </span>
              <h3 className="text-xl font-black text-slate-900 group-hover:text-[#27125B] transition-colors">Bronze Partner</h3>
              <div className="text-3xl font-black text-[#27125B] group-hover:scale-105 transition-transform">20%</div>
              <p className="text-xs text-slate-500">1 – 9 Active Subscriptions</p>
              <div className="text-[11px] text-slate-400 border-t border-slate-100 pt-3">
                Avg. earnings: <strong>$200 – $800 / mo</strong>
              </div>
            </div>

            {/* Silver Tier */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 space-y-4 text-center group">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-300">
                Level 2
              </span>
              <h3 className="text-xl font-black text-slate-900 group-hover:text-[#8B14C2] transition-colors">Silver Partner</h3>
              <div className="text-3xl font-black text-[#8B14C2] group-hover:scale-105 transition-transform">25%</div>
              <p className="text-xs text-slate-500">10 – 24 Active Subscriptions</p>
              <div className="text-[11px] text-slate-400 border-t border-slate-100 pt-3">
                Avg. earnings: <strong>$1,000 – $2,400 / mo</strong>
              </div>
            </div>

            {/* Gold Tier */}
            <div className="p-6 rounded-3xl bg-white border border-purple-300 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 space-y-4 text-center relative overflow-hidden bg-gradient-to-b from-purple-50/50 to-white group">
              <div className="absolute top-0 right-0 bg-[#8B14C2] text-white text-[9px] font-bold px-3 py-0.5 rounded-bl-lg uppercase shadow-sm">
                Popular
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                Level 3
              </span>
              <h3 className="text-xl font-black text-slate-900 group-hover:text-[#27125B] transition-colors">Gold Partner</h3>
              <div className="text-3xl font-black text-[#27125B] group-hover:scale-105 transition-transform">30%</div>
              <p className="text-xs text-slate-500">25 – 49 Active Subscriptions</p>
              <div className="text-[11px] text-slate-400 border-t border-slate-100 pt-3">
                Avg. earnings: <strong>$2,500 – $4,900 / mo</strong>
              </div>
            </div>

            {/* Platinum Tier */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#27125B] to-[#8B14C2] text-white shadow-xl hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 space-y-4 text-center group relative overflow-hidden">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/20 text-white border border-white/30">
                Top Level
              </span>
              <h3 className="text-xl font-black text-white">Platinum Partner</h3>
              <div className="text-3xl font-black text-amber-300 group-hover:scale-105 transition-transform">35%</div>
              <p className="text-xs text-purple-200">50+ Active Subscriptions</p>
              <div className="text-[11px] text-purple-200 border-t border-white/20 pt-3">
                Avg. earnings: <strong>$5,000+ / mo</strong>
              </div>
            </div>

          </div>
        </section>


        {/* CALL TO ACTION BANNER */}
        <section className="p-10 lg:p-14 rounded-3xl bg-gradient-to-r from-[#27125B] via-[#401880] to-[#8B14C2] text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 animate-in fade-in zoom-in-95 duration-700">
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-purple-200 border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
              Start Monetizing Today
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Ready to Become a SquadDeck Partner?</h2>
            <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed">
              Sign up today to receive your custom referral link, promo code, and full access to your partner performance dashboard.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <Link
              href="/register"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 text-[#27125B] font-bold text-sm shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 group hover:-translate-y-1"
            >
              <span>Create Free Partner Account</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/login"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              <Lock className="w-4 h-4" />
              <span>Login</span>
            </Link>
          </div>
        </section>

      </main>

      {/* Beautiful Main Footer */}
      <MainFooter />

      {/* Back to Top Floating Button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 p-3.5 rounded-full bg-gradient-to-tr from-[#27125B] to-[#8B14C2] text-white shadow-xl shadow-[#27125B]/25 hover:scale-110 active:scale-95 transition-all duration-300 animate-in fade-in zoom-in"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}
