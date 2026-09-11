'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Bell,
  RotateCcw,
  Sparkles,
  Menu,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { useAffiliateDemo } from '@/context/affiliate-demo-context';
import { ConfirmationModal } from '@/components/shared/confirmation-modal';

interface AdminHeaderProps {
  onToggleMobileMenu?: () => void;
  title?: string;
  subtitle?: string;
}

export function AdminHeader({ onToggleMobileMenu, title, subtitle }: AdminHeaderProps) {
  const { notifications, resetDemo, applications } = useAffiliateDemo();
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const pendingApps = applications.filter((a) => a.status === 'Pending').length;

  return (
    <>
      <header className="h-16 border-b border-border bg-card/70 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-30">
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
            <h1 className="text-base font-bold text-foreground leading-tight">
              {title || 'SquadDeck Affiliate Administration'}
            </h1>
            {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          </div>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2.5">
          {/* Demo Control Center Shortcut */}
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

          {/* Affiliate Portal Switcher */}
          <Link
            href="/affiliate/dashboard"
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
          >
            <UserCheck className="size-3.5 text-emerald-500" />
            Affiliate Portal
          </Link>

          {/* Notification / Applications Alert */}
          <Link
            href="/admin/affiliates/applications"
            className="relative p-2 rounded-xl border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
            aria-label="Applications alert"
            title={`${pendingApps} pending affiliate applications`}
          >
            <Bell className="size-4" />
            {pendingApps > 0 && (
              <span className="absolute -top-1 -right-1 size-4 rounded-full bg-amber-500 text-white font-bold text-[9px] flex items-center justify-center ring-2 ring-background">
                {pendingApps}
              </span>
            )}
          </Link>

          {/* Admin Avatar Pill */}
          <div className="flex items-center gap-2 pl-2 border-l border-border/80">
            <div className="size-8 rounded-full bg-[#27125B] text-white font-bold text-xs flex items-center justify-center shadow-sm">
              AD
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-semibold leading-none">Super Admin</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">admin@squaddeck.com</p>
            </div>
          </div>
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
