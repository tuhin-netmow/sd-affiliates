'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Mail,
  CheckCircle2,
  Lock,
  Globe,
  Award,
  DollarSign,
  Heart,
  ChevronRight,
  Send
} from 'lucide-react'

export function MainFooter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setTimeout(() => {
        setEmail('')
        setSubscribed(false)
      }, 4000)
    }
  }

  return (
    <footer className="relative z-10 bg-slate-900 text-slate-300 pt-16 pb-12 overflow-hidden font-sans border-t border-slate-800">
      {/* Dynamic Background Glow Effect */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#8B14C2]/15 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#27125B]/20 rounded-full blur-3xl pointer-events-none translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 space-y-12">
        {/* Top Newsletter & Banner Grid */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#27125B]/90 via-[#39187e]/90 to-[#8B14C2]/80 border border-purple-500/20 shadow-2xl backdrop-blur-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full bg-white/10 text-purple-200 border border-white/20">
              <Sparkles className="w-3.5 h-3.5" />
              SquadDeck Partner Digest
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Get Weekly Commission Optimization Insights
            </h3>
            <p className="text-xs sm:text-sm text-purple-100/80 max-w-xl">
              Subscribe to receive high-converting email templates, club outreach strategies, and early feature updates.
            </p>
          </div>

          <div className="lg:col-span-5">
            {subscribed ? (
              <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs font-semibold flex items-center gap-2.5 animate-in fade-in zoom-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>You're subscribed! Check your inbox for your partner toolkit.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-300/60" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter work email..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-200/50 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/15 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-white text-[#27125B] hover:bg-purple-50 font-bold text-xs shadow-lg transition-all flex items-center gap-1.5 shrink-0"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5 text-[#8B14C2]" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pt-4">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4 pr-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-white/95 px-3 py-1.5 rounded-xl backdrop-blur-sm shadow-md border border-white/20">
                <img
                  src="https://squaddeck.com/wp-content/uploads/2024/08/logo.png"
                  alt="SquadDeck"
                  className="h-7 w-auto object-contain"
                />
              </div>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#8B14C2]/30 text-purple-300 border border-[#8B14C2]/50">
                Affiliates
              </span>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The premier affiliate program built for youth sports coaches, league directors, and athletic influencers. Earn up to 35% monthly recurring commission referring sports clubs.
            </p>

            {/* Trust Badges */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Verified Payouts</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400">Navigation</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/#features" className="hover:text-white transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#8B14C2]" />
                  <span>Platform Features</span>
                </Link>
              </li>
              <li>
                <Link href="/#benefits" className="hover:text-white transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#8B14C2]" />
                  <span>Partner Benefits</span>
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-white transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#8B14C2]" />
                  <span>How It Works</span>
                </Link>
              </li>
              <li>
                <Link href="/#tiers" className="hover:text-white transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#8B14C2]" />
                  <span>Commission Tiers</span>
                </Link>
              </li>
              <li>
                <Link href="/demo" className="hover:text-white transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#8B14C2]" />
                  <span>Interactive Demo</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400">Portals & Tools</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/login" className="hover:text-white transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#8B14C2]" />
                  <span>Partner Login</span>
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-white transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#8B14C2]" />
                  <span>Join Affiliate Program</span>
                </Link>
              </li>
              <li>
                <Link href="/affiliate/dashboard" className="hover:text-white transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#8B14C2]" />
                  <span>Affiliate Dashboard</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/affiliates" className="hover:text-white transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#8B14C2]" />
                  <span>Admin Panel</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Compliance & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400">Legal & Terms</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/admin/affiliates/terms" className="hover:text-white transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#8B14C2]" />
                  <span>Affiliate Agreement</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/affiliates/commission-rules" className="hover:text-white transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#8B14C2]" />
                  <span>Commission Rules</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/affiliates/fraud" className="hover:text-white transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#8B14C2]" />
                  <span>Anti-Fraud Policy</span>
                </Link>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#8B14C2]" />
                  <span>Cookie Policy (90-Day Window)</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar & Copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SquadDeck Affiliate Platform. All rights reserved.</p>

          <div className="flex items-center gap-6 text-slate-400">
            <Link href="/admin/affiliates/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/admin/affiliates/commission-rules" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/login" className="hover:text-white transition-colors">Sign In</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
