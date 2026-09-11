'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Sparkles,
  ShieldCheck,
  LayoutDashboard,
  ArrowRight,
  User,
  Mail,
  Lock,
  Globe,
  Users,
  CheckCircle2,
  ArrowLeft,
  DollarSign,
  Award,
  Zap,
  Check,
  Copy,
  Gift,
  Calculator,
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

export default function RegisterPage() {
  const router = useRouter()
  const [role, setRole] = useState<'affiliate' | 'admin'>('affiliate')
  const [fullName, setFullName] = useState('Sarah Jenkins')
  const [email, setEmail] = useState('sarah.j@youthsoccer.org')
  const [channel, setChannel] = useState('https://youthsportsnetwork.com')
  const [audience, setAudience] = useState('youth_coaches')
  const [password, setPassword] = useState('••••••••••••')
  const [agreed, setAgreed] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)

  // Earnings Calculator State
  const [clubCount, setClubCount] = useState<number>(15)

  // Calculated Earnings
  const calculateCommission = (clubs: number) => {
    const planPrice = 199 // $199/mo average club subscription
    const totalVolume = clubs * planPrice
    let rate = 0.20 // Bronze 20%
    let tierName = 'Bronze Partner'

    if (clubs >= 50) {
      rate = 0.35 // Platinum 35%
      tierName = 'Platinum Partner'
    } else if (clubs >= 25) {
      rate = 0.30 // Gold 30%
      tierName = 'Gold Partner'
    } else if (clubs >= 10) {
      rate = 0.25 // Silver 25%
      tierName = 'Silver Partner'
    }

    const monthlyEarnings = totalVolume * rate
    return { monthlyEarnings, ratePercent: Math.round(rate * 100), tierName }
  }

  const { monthlyEarnings, ratePercent, tierName } = calculateCommission(clubCount)

  // Derived Promo Code
  const generatedCode = fullName
    ? (fullName.split(' ')[0] + '2026').toUpperCase()
    : 'PARTNER2026'

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 600)
  }

  const handleGoogleSignUp = () => {
    setIsGoogleLoading(true)
    setTimeout(() => {
      setIsGoogleLoading(false)
      setIsSubmitted(true)
    }, 800)
  }

  const handleProceed = () => {
    if (role === 'admin') {
      router.push('/admin/affiliates')
    } else {
      router.push('/affiliate/dashboard')
    }
  }

  const handleCopyLink = () => {
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-[#8B14C2]/20 selection:text-[#27125B] relative overflow-x-hidden font-sans">
      {/* Light Gradient Background Accents */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 right-1/4 w-[650px] h-[650px] bg-gradient-to-bl from-purple-200/50 via-purple-100/30 to-transparent rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-1/4 w-[650px] h-[650px] bg-gradient-to-tr from-[#8B14C2]/15 via-[#27125B]/5 to-transparent rounded-full blur-3xl pointer-events-none translate-y-1/3"></div>
      </div>

      {/* Navigation Header */}
      <MainHeader currentPage="register" />

      {/* Main Registration Workspace */}
      <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-6 pt-28 lg:pt-32 pb-10 flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          
          {/* Left Column: Form / Success State */}
          <div className="lg:col-span-7 bg-white/95 backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-slate-200/90 shadow-2xl shadow-purple-950/5 space-y-6">
            
            {isSubmitted ? (
              <div className="text-center py-6 space-y-6 animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                
                <div className="space-y-2">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    🎉 Application Approved Immediately (Demo Mode)
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#27125B]">
                    Welcome to SquadDeck Affiliates!
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Your partner account has been provisioned. Your custom link and promo coupon code are now active!
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200 text-left space-y-3 text-xs">
                  <div className="flex justify-between items-center text-slate-700 border-b border-purple-100 pb-2">
                    <span className="font-semibold">Registered Email:</span>
                    <span className="font-bold text-[#27125B]">{email}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-slate-700 border-b border-purple-100 pb-2">
                    <span className="font-semibold">Unlocked Tier:</span>
                    <span className="font-bold text-[#8B14C2] bg-white px-2.5 py-0.5 rounded-full border border-purple-200">
                      Bronze Partner (20% Recurring)
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-slate-700">
                    <span className="font-semibold">Your Custom Promo Code:</span>
                    <span className="font-extrabold text-slate-900 bg-white px-3 py-1 rounded-lg border border-slate-300 tracking-wider">
                      {generatedCode}
                    </span>
                  </div>
                </div>

                {/* Link Preview & Copy */}
                <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-between gap-2 text-xs">
                  <span className="font-mono text-slate-600 truncate">
                    https://squaddeck.com/ref/{fullName.toLowerCase().replace(/\s+/g, '-')}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 font-semibold text-slate-700 hover:text-[#8B14C2] flex items-center gap-1 shrink-0 transition-colors"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleProceed}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#27125B] to-[#8B14C2] text-white font-bold text-sm shadow-xl shadow-[#27125B]/20 hover:opacity-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>Launch {role === 'admin' ? 'Admin Panel' : 'Affiliate Dashboard'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                {/* Header & Role Choice */}
                <div className="space-y-4">
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-[#8B14C2]/10 text-[#8B14C2] border border-[#8B14C2]/20 mb-2">
                      <Zap className="w-3.5 h-3.5" />
                      Join 500+ Partner Coaches & Sports Directors
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#27125B] tracking-tight">
                      Create Partner Account
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Start earning 20% to 35% recurring revenue on every referred club.
                    </p>
                  </div>

                  {/* Role Selector Tabs */}
                  <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setRole('affiliate')}
                      className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                        role === 'affiliate'
                          ? 'bg-white text-[#27125B] shadow-md border border-slate-200'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <LayoutDashboard className={`w-4 h-4 ${role === 'affiliate' ? 'text-[#8B14C2]' : ''}`} />
                      <span>Affiliate Partner</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRole('admin')}
                      className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                        role === 'admin'
                          ? 'bg-white text-[#27125B] shadow-md border border-slate-200'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <ShieldCheck className={`w-4 h-4 ${role === 'admin' ? 'text-[#8B14C2]' : ''}`} />
                      <span>Admin Request</span>
                    </button>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Full Name</label>
                      <div className="relative group">
                        <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#8B14C2] transition-colors" />
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B14C2]/30 focus:border-[#8B14C2] focus:bg-white transition-all"
                          placeholder="Coach John Doe"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Work Email</label>
                      <div className="relative group">
                        <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#8B14C2] transition-colors" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B14C2]/30 focus:border-[#8B14C2] focus:bg-white transition-all"
                          placeholder="john@club.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Website or Social Channel</label>
                      <div className="relative group">
                        <Globe className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#8B14C2] transition-colors" />
                        <input
                          type="url"
                          value={channel}
                          onChange={(e) => setChannel(e.target.value)}
                          required
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B14C2]/30 focus:border-[#8B14C2] focus:bg-white transition-all"
                          placeholder="https://myclub.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Primary Audience</label>
                      <div className="relative">
                        <Users className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <select
                          value={audience}
                          onChange={(e) => setAudience(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B14C2]/30 focus:border-[#8B14C2] focus:bg-white transition-all appearance-none"
                        >
                          <option value="youth_coaches">Youth Sports Coaches & Directors</option>
                          <option value="high_school">High School Athletics Department</option>
                          <option value="fitness_studios">Fitness & Martial Arts Academies</option>
                          <option value="sports_influencer">Sports Podcaster / Content Creator</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Auto-Generated Promo Code Pill */}
                  <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-700">
                      <Gift className="w-4 h-4 text-[#8B14C2]" />
                      <span>Your Custom Discount Coupon:</span>
                    </div>
                    <span className="font-extrabold text-[#27125B] bg-white px-2.5 py-0.5 rounded border border-purple-300 font-mono tracking-wider">
                      {generatedCode}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Password</label>
                    <div className="relative group">
                      <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#8B14C2] transition-colors" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B14C2]/30 focus:border-[#8B14C2] focus:bg-white transition-all"
                        placeholder="Create strong password"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      required
                      className="rounded border-slate-300 text-[#8B14C2] focus:ring-[#8B14C2]"
                    />
                    <label htmlFor="terms" className="text-xs text-slate-600 font-medium">
                      I agree to SquadDeck's{' '}
                      <Link href="/admin/affiliates/terms" className="text-[#8B14C2] hover:underline font-semibold">
                        Affiliate Program Terms
                      </Link>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !agreed}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#27125B] to-[#8B14C2] hover:opacity-95 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-xl shadow-[#27125B]/20 transition-all flex items-center justify-center gap-2 group"
                  >
                    {isLoading ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <>
                        <span>Complete Registration</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>

                <div className="relative flex items-center justify-center my-2">
                  <div className="border-t border-slate-200 w-full"></div>
                  <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider absolute">OR</span>
                </div>

                {/* Google Sign Up Button */}
                <button
                  type="button"
                  onClick={handleGoogleSignUp}
                  disabled={isGoogleLoading}
                  className="w-full py-3 px-4 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-semibold text-xs transition-all flex items-center justify-center gap-2.5 shadow-sm"
                >
                  {isGoogleLoading ? (
                    <span className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <GoogleIcon className="w-4 h-4" />
                  )}
                  <span>Sign up with Google</span>
                </button>
              </>
            )}

          </div>

          {/* Right Column: Earnings Calculator & Program Benefits */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Interactive Commission Calculator */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-[#8B14C2]" />
                  <h3 className="text-sm font-bold text-[#27125B]">Earnings Calculator</h3>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-[#8B14C2]">
                  {tierName} ({ratePercent}%)
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600 font-semibold">Estimated Referred Clubs:</span>
                  <span className="font-extrabold text-[#27125B] text-sm">{clubCount} Clubs</span>
                </div>

                {/* Preset Club Count Buttons */}
                <div className="grid grid-cols-4 gap-1.5">
                  {[5, 15, 30, 50].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setClubCount(count)}
                      className={`py-1.5 rounded-lg text-xs font-bold transition-all border ${
                        clubCount === count
                          ? 'bg-[#27125B] text-white border-[#27125B] shadow-sm'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {count} {count === 50 ? '+' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Projected Revenue Display */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#27125B] to-[#401880] text-white space-y-1 text-center shadow-md">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-200">
                  Projected Passive Monthly Income
                </span>
                <div className="text-3xl font-black text-amber-300">
                  ${monthlyEarnings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  <span className="text-xs font-medium text-purple-200"> / mo</span>
                </div>
                <p className="text-[10px] text-purple-200/80">
                  Based on $199/mo avg club plan @ {ratePercent}% recurring share
                </p>
              </div>
            </div>

            {/* Program Highlights */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-md space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Program Guarantee</h4>
              
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-slate-600"><strong>90-Day Cookie Window:</strong> Receive credit even if referral signs up months later.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-slate-600"><strong>Automatic Tier Escalation:</strong> Reach 10 clubs for Silver (25%) and 25 for Gold (30%).</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-slate-600"><strong>Monthly Payouts:</strong> Automatic disbursements via PayPal or Bank Transfer on the 1st of every month.</p>
                </div>
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
