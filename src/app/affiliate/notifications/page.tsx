'use client';

import React from 'react';
import Link from 'next/link';
import {
  Bell,
  CheckCheck,
  CheckCircle2,
  DollarSign,
  Award,
  CreditCard,
  UserPlus,
  ArrowRight,
} from 'lucide-react';
import { useAffiliateDemo } from '@/context/affiliate-demo-context';

export default function AffiliateNotificationsPage() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useAffiliateDemo();

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Notifications & Activity Feed</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Real-time updates regarding new referrals, commission approvals, and payout disbursements.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllNotificationsRead}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-border bg-card hover:bg-muted text-xs font-semibold text-foreground transition-all self-start sm:self-auto shadow-sm"
          >
            <CheckCheck className="size-4 text-emerald-500" />
            Mark All as Read ({unreadCount})
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="p-12 text-center text-xs text-muted-foreground bg-card rounded-2xl border border-border">
            No notifications available.
          </div>
        ) : (
          notifications.map((n) => {
            let icon = <CheckCircle2 className="size-5 text-emerald-500" />;
            let bg = 'bg-card';

            if (n.type === 'payout') {
              icon = <CreditCard className="size-5 text-purple-500" />;
            } else if (n.type === 'tier') {
              icon = <Award className="size-5 text-amber-500" />;
            } else if (n.type === 'info') {
              icon = <Bell className="size-5 text-blue-500" />;
            }

            return (
              <div
                key={n.id}
                onClick={() => markNotificationRead(n.id)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex items-start justify-between gap-4 cursor-pointer ${
                  !n.read
                    ? 'bg-emerald-500/5 border-emerald-500/30 ring-1 ring-emerald-500/20 shadow-sm'
                    : 'bg-card border-border hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-muted/60 shrink-0 mt-0.5">{icon}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className={`text-sm font-bold ${!n.read ? 'text-foreground' : 'text-zinc-700 dark:text-zinc-300'}`}>
                        {n.title}
                      </h4>
                      {!n.read && (
                        <span className="size-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {n.description}
                    </p>
                    <span className="text-[10px] text-muted-foreground mt-2 block font-medium">
                      {n.date}
                    </span>
                  </div>
                </div>

                {n.link && (
                  <Link
                    href={n.link}
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-xl border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground shrink-0 transition-all self-center"
                    title="Go to section"
                  >
                    <ArrowRight className="size-4" />
                  </Link>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
