'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShieldAlert,
  LayoutDashboard,
  Users2,
  FileCheck2,
  GitFork,
  Building2,
  DollarSign,
  CreditCard,
  Sliders,
  Layers,
  Megaphone,
  Tag,
  Award,
  FolderDown,
  Shield,
  FileBarChart2,
  ScrollText,
  FileText,
  Settings,
  Sparkles,
  UserCheck,
} from 'lucide-react';
import { useAffiliateDemo } from '@/context/affiliate-demo-context';

interface AdminNavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string | number;
  badgeVariant?: 'blue' | 'amber' | 'rose' | 'emerald';
}

export function AdminSidebar({ onCloseMobile }: { onCloseMobile?: () => void }) {
  const pathname = usePathname();
  const { applications, payouts, fraudCases } = useAffiliateDemo();

  const pendingApps = applications.filter((a) => a.status === 'Pending').length;
  const pendingPayouts = payouts.filter((p) => p.status === 'Pending').length;
  const activeFraud = fraudCases.filter((f) => f.status === 'Under Review').length;

  const NAV_ITEMS: AdminNavItem[] = [
    { label: 'Overview Dashboard', href: '/admin/affiliates', icon: <LayoutDashboard className="size-4" /> },
    { label: 'Affiliates Directory', href: '/admin/affiliates/list', icon: <Users2 className="size-4" /> },
    {
      label: 'Applications',
      href: '/admin/affiliates/applications',
      icon: <FileCheck2 className="size-4" />,
      badge: pendingApps > 0 ? pendingApps : undefined,
      badgeVariant: 'amber',
    },
    { label: 'Referrals & Attribution', href: '/admin/affiliates/referrals', icon: <GitFork className="size-4" /> },
    { label: 'Customers', href: '/admin/affiliates/customers', icon: <Building2 className="size-4" /> },
    { label: 'Commissions', href: '/admin/affiliates/commissions', icon: <DollarSign className="size-4" /> },
    {
      label: 'Payouts Queue',
      href: '/admin/affiliates/payouts',
      icon: <CreditCard className="size-4" />,
      badge: pendingPayouts > 0 ? pendingPayouts : undefined,
      badgeVariant: 'blue',
    },
    { label: 'Commission Rules', href: '/admin/affiliates/commission-rules', icon: <Sliders className="size-4" /> },
    { label: 'Affiliate Tiers', href: '/admin/affiliates/tiers', icon: <Layers className="size-4" /> },
    { label: 'Campaigns', href: '/admin/affiliates/campaigns', icon: <Megaphone className="size-4" /> },
    { label: 'Coupons', href: '/admin/affiliates/coupons', icon: <Tag className="size-4" /> },
    { label: 'Bonuses & Milestones', href: '/admin/affiliates/bonuses', icon: <Award className="size-4" /> },
    { label: 'Marketing Materials', href: '/admin/affiliates/marketing', icon: <FolderDown className="size-4" /> },
    {
      label: 'Fraud Detection',
      href: '/admin/affiliates/fraud',
      icon: <ShieldAlert className="size-4" />,
      badge: activeFraud > 0 ? activeFraud : undefined,
      badgeVariant: 'rose',
    },
    { label: 'Reports & Analytics', href: '/admin/affiliates/reports', icon: <FileBarChart2 className="size-4" /> },
    { label: 'Audit Logs', href: '/admin/affiliates/audit-logs', icon: <ScrollText className="size-4" /> },
    { label: 'Terms & Conditions', href: '/admin/affiliates/terms', icon: <FileText className="size-4" /> },
    { label: 'Program Settings', href: '/admin/affiliates/settings', icon: <Settings className="size-4" /> },
  ];

  return (
    <aside className="w-64 border-r border-border bg-card/70 backdrop-blur-xl flex flex-col h-full shrink-0">
      {/* Brand Header */}
      <div className="h-16 px-5 py-4 border-b border-border flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="size-9 rounded-xl bg-gradient-to-tr from-[#27125B] to-[#8B14C2] flex items-center justify-center text-white font-bold shadow-md shadow-[#8B14C2]/20">
            <Shield className="size-5" />
          </div>
          <div>
            <span className="font-extrabold text-sm tracking-tight text-foreground flex items-center gap-1.5">
              SquadDeck <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#8B14C2]/10 text-[#8B14C2] border border-[#8B14C2]/20">ADMIN</span>
            </span>
            <p className="text-[11px] text-muted-foreground">Affiliate Manager</p>
          </div>
        </Link>
      </div>

      {/* Admin Mode Pill */}
      <div className="p-3 mx-3 my-2 rounded-xl bg-[#27125B]/10 dark:bg-[#27125B]/30 border border-[#8B14C2]/20 flex items-center justify-between text-xs">
        <span className="font-semibold text-[#27125B] dark:text-purple-200 flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-[#8B14C2] animate-pulse" />
          Admin Console
        </span>
        <span className="text-[10px] text-[#8B14C2] dark:text-purple-300 font-mono">100% Mock State</span>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5 text-xs font-medium">
        {NAV_ITEMS.map((item) => {
          const isExact = pathname === item.href;
          const isNested = item.href !== '/admin/affiliates' && pathname.startsWith(`${item.href}/`);
          const isActive = isExact || isNested;

          let badgeColor = 'bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200';
          if (item.badgeVariant === 'amber') badgeColor = 'bg-amber-500 text-white';
          if (item.badgeVariant === 'blue') badgeColor = 'bg-blue-500 text-white';
          if (item.badgeVariant === 'rose') badgeColor = 'bg-rose-500 text-white';

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              className={`flex items-center justify-between px-3 py-2 rounded-xl transition-all ${isActive
                  ? 'bg-[#8B14C2]/10 text-[#8B14C2] font-semibold border border-[#8B14C2]/20 shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <span className={isActive ? 'text-[#8B14C2]' : 'text-muted-foreground'}>
                  {item.icon}
                </span>
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span className={`px-1.5 py-0.2 text-[10px] font-bold rounded-full shrink-0 ${badgeColor}`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Switcher */}
      <div className="p-3 border-t border-border bg-muted/20 space-y-1.5">
        <Link
          href="/demo"
          className="flex items-center justify-center gap-2 w-full py-2 px-3 text-xs font-semibold rounded-xl bg-gradient-to-r from-[#27125B] to-[#8B14C2] text-white shadow-md shadow-[#8B14C2]/20 hover:opacity-95 transition-all"
        >
          <Sparkles className="size-3.5" />
          Demo Control Center
        </Link>
        <Link
          href="/affiliate/dashboard"
          className="flex items-center justify-center gap-1.5 w-full py-1.5 px-3 text-xs font-medium rounded-xl border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
        >
          <UserCheck className="size-3.5 text-emerald-500" />
          Switch to Affiliate Portal
        </Link>
      </div>
    </aside>
  );
}
