'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Sparkles,
  ShieldCheck,
  LayoutDashboard,
  ArrowRight,
  Lock,
  Mail,
  Eye,
  EyeOff,
  CheckCircle2,
  Play,
  ArrowLeft,
  Users,
  Award,
  DollarSign,
  UserCheck,
  ShieldAlert,
  Zap,
  Check,
  Building2,
  KeyRound
} from 'lucide-react'

import { MainHeader } from '@/components/shared/main-header'
import { MainFooter } from '@/components/shared/main-footer'

function GoogleIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  )
}

export default function LoginPage() {
  const router = useRouter()
  const [portalType, setPortalType] = useState<'affiliate' | 'admin'>('affiliate')
  const [email, setEmail] = useState('james.wilson@coachhub.com')
  const [password, setPassword] = useState('••••••••••••')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [activeProfile, setActiveProfile] = useState<'james' | 'sarah' | 'admin'>('james')

  const handlePortalSwitch = (type: 'affiliate' | 'admin') => {
    setPortalType(type)
    if (type === 'admin') {
      setActiveProfile('admin')
      setEmail('admin@squaddeck.com')
    } else {
      setActiveProfile('james')
      setEmail('james.wilson@coachhub.com')
    }
  }

  const selectQuickProfile = (profile: 'james' | 'sarah' | 'admin') => {
    setActiveProfile(profile)
    if (profile === 'admin') {
      setPortalType('admin')
      setEmail('admin@squaddeck.com')
    } else if (profile === 'sarah') {
      setPortalType('affiliate')
      setEmail('sarah.j@youthsoccer.org')
    } else {
      setPortalType('affiliate')
      setEmail('james.wilson@coachhub.com')
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      if (portalType === 'admin') {
        router.push('/admin/affiliates')
      } else {
        router.push('/affiliate/dashboard')
      }
    }, 600)
  }

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true)
    setTimeout(() => {
      if (portalType === 'admin') {
        router.push('/admin/affiliates')
      } else {
        router.push('/affiliate/dashboard')
      }
    }, 800)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-[#8B14C2]/20 selection:text-[#27125B] relative overflow-x-hidden font-sans">
      {/* Light Background Glow Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-[650px] h-[650px] bg-gradient-to-br from-purple-200/50 via-purple-100/30 to-transparent rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-[650px] h-[650px] bg-gradient-to-tl from-[#8B14C2]/15 via-[#27125B]/5 to-transparent rounded-full blur-3xl pointer-events-none translate-y-1/3"></div>
      </div>

      {/* Navigation Header */}
      <MainHeader currentPage="login" />

      {/* Main Login Workspace */}
      <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-6 pt-28 lg:pt-32 pb-10 flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          
          {/* Left Column: Polished Login Form Card */}
          <div className="lg:col-span-7 bg-white/95 backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-slate-200/90 shadow-2xl shadow-purple-950/5 space-y-6">
            
            {/* Header & Badges */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-[#8B14C2]/10 text-[#8B14C2] border border-[#8B14C2]/20">
                  <Lock className="w-3.5 h-3.5" />
                  Secure Role Access Portal
                </span>
                <span className="text-[11px] font-semibold text-slate-400">
                  Demo Mode
                </span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#27125B] tracking-tight">
                  Welcome Back to SquadDeck
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Choose your account type or click a pre-set demo profile below.
                </p>
              </div>

              {/* Portal Selector Tabs */}
              <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => handlePortalSwitch('affiliate')}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all ${
                    portalType === 'affiliate'
                      ? 'bg-white text-[#27125B] shadow-md border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <LayoutDashboard className={`w-4 h-4 ${portalType === 'affiliate' ? 'text-[#8B14C2]' : ''}`} />
                  <span>Affiliate Partner</span>
                </button>

                <button
                  type="button"
                  onClick={() => handlePortalSwitch('admin')}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all ${
                    portalType === 'admin'
                      ? 'bg-white text-[#27125B] shadow-md border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <ShieldCheck className={`w-4 h-4 ${portalType === 'admin' ? 'text-[#8B14C2]' : ''}`} />
                  <span>Admin Panel</span>
                </button>
              </div>

              {/* Quick Profile Select Presets */}
              <div className="space-y-1.5 pt-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Quick Demo Profile Presets:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => selectQuickProfile('james')}
                    className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      activeProfile === 'james'
                        ? 'bg-purple-50/80 border-[#8B14C2]/50 text-[#27125B] shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold truncate">James Wilson</span>
                      {activeProfile === 'james' && <Check className="w-3 h-3 text-[#8B14C2]" />}
                    </div>
                    <span className="text-[9px] font-semibold text-[#8B14C2]">Gold Partner (30%)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => selectQuickProfile('sarah')}
                    className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      activeProfile === 'sarah'
                        ? 'bg-purple-50/80 border-[#8B14C2]/50 text-[#27125B] shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold truncate">Sarah Jenkins</span>
                      {activeProfile === 'sarah' && <Check className="w-3 h-3 text-[#8B14C2]" />}
                    </div>
                    <span className="text-[9px] font-semibold text-[#8B14C2]">Bronze Partner (20%)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => selectQuickProfile('admin')}
                    className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      activeProfile === 'admin'
                        ? 'bg-purple-50/80 border-[#8B14C2]/50 text-[#27125B] shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold truncate">Program Admin</span>
                      {activeProfile === 'admin' && <Check className="w-3 h-3 text-[#8B14C2]" />}
                    </div>
                    <span className="text-[9px] font-semibold text-slate-700">Manager Control</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Email Address</label>
                <div className="relative group">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#8B14C2] transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B14C2]/30 focus:border-[#8B14C2] focus:bg-white transition-all"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700">Password</label>
                  <a href="#" onClick={(e) => e.preventDefault()} className="text-xs font-medium text-[#8B14C2] hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative group">
                  <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#8B14C2] transition-colors" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-10 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B14C2]/30 focus:border-[#8B14C2] focus:bg-white transition-all"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-[#8B14C2] focus:ring-[#8B14C2]" />
                  <span className="text-xs text-slate-600 font-medium">Remember session on this device</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#27125B] to-[#8B14C2] hover:opacity-95 text-white font-bold text-xs sm:text-sm shadow-xl shadow-[#27125B]/20 hover:shadow-2xl transition-all flex items-center justify-center gap-2 group"
              >
                {isLoading ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <span>Enter {portalType === 'admin' ? 'Admin Panel' : 'Affiliate Portal'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Google Sign In Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading}
              className="w-full py-3 px-4 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-semibold text-xs transition-all flex items-center justify-center gap-2.5 shadow-sm"
            >
              {isGoogleLoading ? (
                <span className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <GoogleIcon className="w-4 h-4" />
              )}
              <span>Sign in with Google</span>
            </button>

            <div className="relative flex items-center justify-center my-2">
              <div className="border-t border-slate-200 w-full"></div>
              <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider absolute">OR</span>
            </div>

            {/* Quick Demo Access Button */}
            <Link
              href="/demo"
              className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-semibold text-xs transition-all flex items-center justify-center gap-2 border border-slate-200 shadow-sm"
            >
              <Play className="w-3.5 h-3.5 text-[#8B14C2] fill-[#8B14C2]" />
              <span>Launch 10-Step Interactive Demo Simulator</span>
            </Link>

            <p className="text-center text-xs text-slate-500 pt-1">
              Need a partner account?{' '}
              <Link href="/register" className="font-bold text-[#8B14C2] hover:underline">
                Apply for Affiliate Program
              </Link>
            </p>
          </div>

          {/* Right Column: Dynamic Role Context & Stats Card */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Dynamic Card */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#27125B] via-[#371978] to-[#8B14C2] text-white shadow-2xl relative overflow-hidden space-y-6">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 bg-[#8B14C2]/30 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-purple-200 border border-white/20">
                  {portalType === 'admin' ? '🛡️ Administrator Governance' : '🏆 Partner Dashboard'}
                </span>
                <h3 className="text-2xl font-black text-white leading-snug">
                  {portalType === 'admin'
                    ? 'Manage 25+ Affiliates & Program Compliance'
                    : 'Earn Up to 35% Monthly Recurring Income'}
                </h3>
                <p className="text-xs text-purple-100/85 leading-relaxed">
                  {portalType === 'admin'
                    ? 'Real-time controls to approve new partner applications, validate subscription commissions, inspect fraud warnings, and process bulk payout disbursements.'
                    : 'SquadDeck gives coaches and athletic directors state-of-the-art team management tools while paying partners recurring lifetime revenue share.'}
                </p>
              </div>

              {/* Dynamic Stats Pill */}
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-2 text-xs">
                {portalType === 'admin' ? (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-200 font-medium">Pending Payout Requests:</span>
                      <span className="font-bold text-amber-300">$1,480.00 (3)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-200 font-medium">Active Partners:</span>
                      <span className="font-bold text-white">25 Affiliates</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-200 font-medium">Fraud Security Status:</span>
                      <span className="font-bold text-emerald-300 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Clean (0 Flagged)
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-200 font-medium">Selected Profile:</span>
                      <span className="font-bold text-white">
                        {activeProfile === 'james' ? 'James Wilson (Gold)' : 'Sarah Jenkins (Bronze)'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-200 font-medium">Current Revenue Share:</span>
                      <span className="font-bold text-amber-300">
                        {activeProfile === 'james' ? '30% Recurring' : '20% Recurring'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-200 font-medium">Lifetime Payouts:</span>
                      <span className="font-bold text-emerald-300">
                        {activeProfile === 'james' ? '$4,850.00 Paid' : '$340.00 Paid'}
                      </span>
                    </div>
                  </>
                )}
              </div>

              <ul className="space-y-2.5 text-xs text-purple-100 pt-1 border-t border-white/10">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>Real-time cookie attribution engine (90-day window)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>Automated payout disbursements via PayPal or Direct Deposit</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>Custom promo coupon code creation (`COACH10`)</span>
                </li>
              </ul>
            </div>

            {/* Testimonial / Assurance Pill */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 text-xs text-slate-600 flex items-start gap-3 shadow-md">
              <div className="p-2 rounded-xl bg-purple-50 text-[#8B14C2] shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-slate-800">"SquadDeck is the best sports affiliate system!"</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  "Consistent monthly payouts and great marketing collateral for youth coaches."
                </p>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* Footer */}
      <MainFooter />
    </div>
  )
}
