'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Sparkles, Play, ArrowRight, Lock, UserPlus, Menu, X, ShieldCheck, LayoutDashboard } from 'lucide-react'

interface MainHeaderProps {
  currentPage?: 'home' | 'login' | 'register' | 'demo'
}

export function MainHeader({ currentPage = 'home' }: MainHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md px-4 sm:px-6 lg:px-12 py-3.5 transition-all shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <img
            src="https://squaddeck.com/wp-content/uploads/2024/08/logo.png"
            alt="SquadDeck"
            className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-[#8B14C2]/10 text-[#8B14C2] border border-[#8B14C2]/20">
            Affiliates
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold text-slate-600">
          <Link href="/#features" className="hover:text-[#8B14C2] transition-colors">Features</Link>
          <Link href="/#benefits" className="hover:text-[#8B14C2] transition-colors">Affiliate Benefits</Link>
          <Link href="/#how-it-works" className="hover:text-[#8B14C2] transition-colors">How It Works</Link>
          <Link href="/#tiers" className="hover:text-[#8B14C2] transition-colors">Commission Tiers</Link>
        </nav>

        {/* Header Action Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/demo"
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
              currentPage === 'demo'
                ? 'bg-purple-100 text-[#8B14C2] border-purple-300'
                : 'text-slate-700 bg-slate-100 hover:bg-slate-200/80 border-slate-200'
            }`}
          >
            <Play className="w-3.5 h-3.5 text-[#8B14C2] fill-[#8B14C2]" />
            <span>Demo Center</span>
          </Link>
          
          {currentPage !== 'login' && (
            <Link
              href="/login"
              className="px-4 py-2 text-xs font-bold text-[#27125B] hover:text-[#8B14C2] bg-white border border-slate-200 rounded-xl shadow-sm hover:border-slate-300 transition-all flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5 text-[#8B14C2]" />
              <span>Sign In</span>
            </Link>
          )}

          {currentPage !== 'register' && (
            <Link
              href="/register"
              className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#27125B] to-[#8B14C2] hover:opacity-95 rounded-xl shadow-md shadow-[#27125B]/15 transition-all flex items-center gap-1.5"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Join Program</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex md:hidden items-center gap-2">
          {currentPage !== 'register' && (
            <Link
              href="/register"
              className="px-3 py-1.5 text-[11px] font-bold text-white bg-gradient-to-r from-[#27125B] to-[#8B14C2] rounded-lg shadow-sm"
            >
              Join
            </Link>
          )}
          
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 bg-slate-100 border border-slate-200 hover:bg-slate-200 focus:outline-none transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-4 pb-6 px-4 border-t border-slate-200/80 mt-3 space-y-4 animate-in slide-in-from-top-2 duration-200 bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl">
          <nav className="flex flex-col space-y-2 text-xs font-semibold text-slate-700">
            <Link
              href="/#features"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg hover:bg-purple-50 hover:text-[#8B14C2] transition-colors"
            >
              Features
            </Link>
            <Link
              href="/#benefits"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg hover:bg-purple-50 hover:text-[#8B14C2] transition-colors"
            >
              Affiliate Benefits
            </Link>
            <Link
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg hover:bg-purple-50 hover:text-[#8B14C2] transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/#tiers"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg hover:bg-purple-50 hover:text-[#8B14C2] transition-colors"
            >
              Commission Tiers
            </Link>
          </nav>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/demo"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 flex items-center justify-center gap-2"
            >
              <Play className="w-3.5 h-3.5 text-[#8B14C2] fill-[#8B14C2]" />
              <span>Interactive Demo Simulator</span>
            </Link>

            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-[#27125B] bg-white border border-slate-200 flex items-center justify-center gap-2"
            >
              <Lock className="w-3.5 h-3.5 text-[#8B14C2]" />
              <span>Sign In to Portal</span>
            </Link>

            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#27125B] to-[#8B14C2] flex items-center justify-center gap-2 shadow-md shadow-[#27125B]/20"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Apply for Partner Account</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
