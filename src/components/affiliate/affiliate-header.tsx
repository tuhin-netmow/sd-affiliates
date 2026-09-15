'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Bell,
  RotateCcw,
  Sparkles,
  Menu,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useAffiliateDemo } from '@/context/affiliate-demo-context';
import { ConfirmationModal } from '@/components/shared/confirmation-modal';

interface AffiliateHeaderProps {
  onToggleMobileMenu?: () => void;
  title?: string;
  subtitle?: string;
}

export function AffiliateHeader({ onToggleMobileMenu, title, subtitle }: AffiliateHeaderProps) {
  const { activeAffiliate, notifications, resetDemo, openOnboarding } = useAffiliateDemo();
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      <header className="h-16 border-b border-border bg-card/60 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          {onToggleMobileMenu && (
            <button
              onClick={onToggleMobileMenu}
              className="lg:hidden p-2 rounded-xl border border-border bg-muted/60 text-foreground"
              aria-label="Toggle navigation"
            >
              <Menu className="size-4" />
            </button>
          )}

          <div>
            {title ? (
              <h1 className="text-base font-bold text-foreground leading-tight">{title}</h1>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">Welcome, {activeAffiliate.name}</span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#8B14C2]/10 text-[#8B14C2] border border-[#8B14C2]/20">
                  <CheckCircle2 className="size-3" /> Code: {activeAffiliate.referralCode}
                </span>
              </div>
            )}
            {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          </div>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2.5">
          {/* Onboarding Guide Launch Button */}
          <Link
            href="/affiliate/onboarding"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-purple-50 text-[#8B14C2] border border-purple-200 hover:bg-purple-100 transition-all shadow-sm"
            title="Open step-by-step onboarding guide page"
          >
            <Sparkles className="size-3.5 text-[#8B14C2]" />
            <span className="hidden sm:inline">Onboarding Guide</span>
          </Link>

          {/* Quick Demo Workflow Trigger */}
          <Link
            href="/demo"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#27125B] to-[#8B14C2] text-white shadow-sm hover:opacity-95 transition-all"
          >
            <Sparkles className="size-3.5" />
            Demo Workflow
          </Link>

          {/* Reset Demo Button */}
          <button
            onClick={() => setIsResetModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium border border-border bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
            title="Reset demo data to initial state"
          >
            <RotateCcw className="size-3.5" />
            <span className="hidden md:inline">Reset Demo</span>
          </button>

          {/* Admin Switcher */}
          <Link
            href="/admin/affiliates"
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
          >
            <ShieldCheck className="size-3.5 text-[#8B14C2]" />
            Admin
          </Link>

          {/* Notification Bell */}
          <Link
            href="/affiliate/notifications"
            className="relative p-2 rounded-xl border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
            aria-label="Notifications"
          >
            <Bell className="size-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 size-4 rounded-full bg-[#8B14C2] text-white font-bold text-[9px] flex items-center justify-center ring-2 ring-background">
                {unreadCount}
              </span>
            )}
          </Link>

          {/* Active Affiliate Profile Avatar */}
          <Link href="/affiliate/profile" className="flex items-center gap-2 pl-1">
            <img
              src={activeAffiliate.avatar}
              alt={activeAffiliate.name}
              className="size-8 rounded-full object-cover border border-border ring-1 ring-[#8B14C2]/30"
            />
          </Link>
        </div>
      </header>

      {/* Confirmation modal for Reset Demo */}
      <ConfirmationModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={resetDemo}
        title="Reset Entire Demo State?"
        description="This will restore all 25 affiliates, 18 paid customers, 50 commissions, campaigns, coupons, payouts, and the 10-step demo flow back to their original mock state."
        confirmText="Yes, Reset Demo"
        variant="warning"
      />
    </>
  );
}
