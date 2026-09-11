'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Link2,
  Megaphone,
  Tag,
  Users2,
  Building2,
  DollarSign,
  TrendingUp,
  CreditCard,
  BarChart3,
  FolderDown,
  Award,
  Trophy,
  Bell,
  User,
  Settings,
  Sparkles,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { useAffiliateDemo } from '@/context/affiliate-demo-context';
import { formatCurrency, getTierBadgeClass } from '@/lib/affiliate/calculations';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string | number;
}

export function AffiliateSidebar({ onCloseMobile }: { onCloseMobile?: () => void }) {
  const pathname = usePathname();
  const { activeAffiliate, affiliates, setActiveAffiliateId, notifications } = useAffiliateDemo();

  const unreadNotifs = notifications.filter((n) => !n.read).length;

  const NAV_ITEMS: NavItem[] = [
    { label: 'Dashboard', href: '/affiliate/dashboard', icon: <LayoutDashboard className="size-4" /> },
    { label: 'My Links', href: '/affiliate/links', icon: <Link2 className="size-4" /> },
    { label: 'Campaigns', href: '/affiliate/campaigns', icon: <Megaphone className="size-4" /> },
    { label: 'Coupons', href: '/affiliate/coupons', icon: <Tag className="size-4" /> },
    { label: 'Referrals', href: '/affiliate/referrals', icon: <Users2 className="size-4" /> },
    { label: 'Customers', href: '/affiliate/customers', icon: <Building2 className="size-4" /> },
    { label: 'Commissions', href: '/affiliate/commissions', icon: <DollarSign className="size-4" /> },
    { label: 'Earnings', href: '/affiliate/earnings', icon: <TrendingUp className="size-4" /> },
    { label: 'Payouts', href: '/affiliate/payouts', icon: <CreditCard className="size-4" /> },
    { label: 'Analytics', href: '/affiliate/analytics', icon: <BarChart3 className="size-4" /> },
    { label: 'Marketing Materials', href: '/affiliate/marketing', icon: <FolderDown className="size-4" /> },
    { label: 'Bonuses', href: '/affiliate/bonuses', icon: <Award className="size-4" /> },
    { label: 'Leaderboard', href: '/affiliate/leaderboard', icon: <Trophy className="size-4" /> },
    {
      label: 'Notifications',
      href: '/affiliate/notifications',
      icon: <Bell className="size-4" />,
      badge: unreadNotifs > 0 ? unreadNotifs : undefined,
    },
    { label: 'Profile', href: '/affiliate/profile', icon: <User className="size-4" /> },
    { label: 'Settings', href: '/affiliate/settings', icon: <Settings className="size-4" /> },
  ];

  return (
    <aside className="w-64 border-r border-border bg-card/60 backdrop-blur-xl flex flex-col h-full shrink-0">
      {/* Brand Header */}
      <div className="p-5 border-b border-border flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="size-9 rounded-xl bg-gradient-to-tr from-[#27125B] to-[#8B14C2] flex items-center justify-center text-white font-bold shadow-md shadow-[#8B14C2]/20">
            <Zap className="size-5" />
          </div>
          <div>
            <span className="font-extrabold text-sm tracking-tight text-foreground flex items-center gap-1.5">
              SquadDeck <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#8B14C2]/10 text-[#8B14C2] border border-[#8B14C2]/20">AFFILIATE</span>
            </span>
            <p className="text-[11px] text-muted-foreground">Partner Portal</p>
          </div>
        </Link>
      </div>

      {/* Active Affiliate Switcher Card */}
      <div className="p-3 mx-3 my-2 rounded-xl bg-muted/40 border border-border/80">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Demo User</span>
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${getTierBadgeClass(activeAffiliate.tier)}`}>
            {activeAffiliate.tier} Tier
          </span>
        </div>
        <select
          value={activeAffiliate.id}
          onChange={(e) => setActiveAffiliateId(e.target.value)}
          className="w-full text-xs font-semibold bg-background border border-border rounded-lg px-2.5 py-1.5 text-foreground focus:ring-1 focus:ring-[#8B14C2] outline-none"
        >
          {affiliates.slice(0, 8).map((aff) => (
            <option key={aff.id} value={aff.id}>
              {aff.name} ({aff.tier} - {aff.referralCode})
            </option>
          ))}
        </select>
        <div className="mt-2 flex items-center justify-between text-[11px] pt-1.5 border-t border-border/60">
          <span className="text-muted-foreground">Available Balance</span>
          <span className="font-bold text-[#8B14C2]">
            {formatCurrency(activeAffiliate.stats.currentBalance)}
          </span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5 text-xs font-medium">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              className={`flex items-center justify-between px-3 py-2 rounded-xl transition-all ${
                isActive
                  ? 'bg-[#8B14C2]/10 text-[#8B14C2] font-semibold border border-[#8B14C2]/20 shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className={isActive ? 'text-[#8B14C2]' : 'text-muted-foreground'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-[#8B14C2] text-white">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Mode Switchers */}
      <div className="p-3 border-t border-border bg-muted/20 space-y-1.5">
        <Link
          href="/demo"
          className="flex items-center justify-center gap-2 w-full py-2 px-3 text-xs font-semibold rounded-xl bg-gradient-to-r from-[#27125B] to-[#8B14C2] text-white shadow-md shadow-[#8B14C2]/20 hover:opacity-95 transition-all"
        >
          <Sparkles className="size-3.5" />
          Interactive Demo Center
        </Link>
        <Link
          href="/admin/affiliates"
          className="flex items-center justify-center gap-1.5 w-full py-1.5 px-3 text-xs font-medium rounded-xl border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
        >
          <ShieldCheck className="size-3.5 text-[#8B14C2]" />
          Switch to Admin Portal
        </Link>
      </div>
    </aside>
  );
}
