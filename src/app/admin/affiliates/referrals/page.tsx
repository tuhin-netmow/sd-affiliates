'use me'
'use client'

import React, { useState } from 'react'
import {
  GitFork,
  Search,
  Building2,
  CreditCard,
  DollarSign,
  Percent,
  Info
} from 'lucide-react'
import { useAffiliateDemo } from '@/context/affiliate-demo-context'
import { formatCurrency } from '@/lib/affiliate/calculations'
import { AffiliateLifecycleTimeline } from '@/components/timeline/affiliate-lifecycle-timeline'

const PLANS = ['All', 'Free', 'Starter', 'Pro', 'Enterprise']
const STATUSES = ['All', 'Clicked', 'Signed Up', 'Free', 'Trial', 'Paid', 'Cancelled', 'Refunded']

export default function AdminReferralsPage() {
  const { referrals, affiliates } = useAffiliateDemo()
  const [search, setSearch] = useState('')
  const [planFilter, setPlanFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedReferral, setSelectedReferral] = useState<typeof referrals[0] | null>(null)

  const filtered = referrals.filter((r) => {
    const aff = affiliates.find((a) => a.id === r.affiliateId)
    const matchSearch =
      search === '' ||
      r.orgName.toLowerCase().includes(search.toLowerCase()) ||
      r.customerName.toLowerCase().includes(search.toLowerCase()) ||
      (aff?.name || '').toLowerCase().includes(search.toLowerCase())
    const matchPlan = planFilter === 'All' || r.plan === planFilter
    const matchStatus = statusFilter === 'All' || r.status === statusFilter
    return matchSearch && matchPlan && matchStatus
  })

  const totalRevenue = filtered.reduce((acc, r) => acc + r.revenue, 0)
  const totalCommission = filtered.reduce((acc, r) => acc + r.commission, 0)

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <GitFork className="size-6 text-blue-500" />
            Referrals & Attribution
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Complete referral attribution chain — from affiliate click to paid customer.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium self-start sm:self-auto">
          <span className="px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            {filtered.length} referrals
          </span>
        </div>
      </div>

      {/* Attribution Info */}
      <div className="rounded-2xl border border-border bg-card/60 p-4 flex items-start gap-3">
        <Info className="size-5 text-blue-500 mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-foreground">Attribution Policy</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Attribution connects a referred visitor to their SquadDeck organization so the affiliate receives credit when that organization becomes a customer.
            <strong className="text-foreground"> 90-day attribution window</strong>, using <strong className="text-foreground">Last Eligible Affiliate Touch</strong>.
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Referrals', value: referrals.length, icon: <GitFork className="size-4 text-blue-500" /> },
          { label: 'Paid Customers', value: referrals.filter((r) => r.status === 'Paid').length, icon: <CreditCard className="size-4 text-emerald-500" /> },
          { label: 'Total Revenue', value: formatCurrency(referrals.reduce((a, r) => a + r.revenue, 0)), icon: <DollarSign className="size-4 text-violet-500" /> },
          { label: 'Total Commission', value: formatCurrency(referrals.reduce((a, r) => a + r.commission, 0)), icon: <Percent className="size-4 text-amber-500" /> },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card/80 p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-muted/60 flex items-center justify-center">{s.icon}</div>
            <div>
              <p className="text-lg font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by org, contact or affiliate..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          />
        </div>
        <select
          value={planFilter}
          onChange={(e) => setPlanFilter(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground focus:outline-none"
        >
          {PLANS.map((p) => <option key={p}>{p}</option>)}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground focus:outline-none"
        >
          {STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border bg-card/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Organization</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Affiliate</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Plan</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Revenue</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Commission</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Attribution</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Date</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((r) => {
                const aff = affiliates.find((a) => a.id === r.affiliateId)
                return (
                  <tr key={r.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="size-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                          <Building2 className="size-4 text-blue-500" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-xs">{r.orgName}</p>
                          <p className="text-xs text-muted-foreground">{r.customerName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-medium text-foreground">{r.affiliateName || aff?.name || '—'}</span>
                      <p className="text-[11px] text-muted-foreground font-mono">{aff?.referralCode}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
                        r.plan === 'Pro' ? 'bg-violet-500/10 text-violet-600 border-violet-500/20' :
                        r.plan === 'Starter' ? 'bg-blue-500/10 text-blue-600 border-blue-500/20' :
                        'bg-muted text-muted-foreground border-border'
                      }`}>
                        {r.plan}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
                        r.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' :
                        r.status === 'Free' || r.status === 'Signed Up' ? 'bg-blue-500/10 text-blue-600 border-blue-500/20' :
                        r.status === 'Trial' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' :
                        r.status === 'Cancelled' || r.status === 'Refunded' ? 'bg-rose-500/10 text-rose-600 border-rose-500/20' :
                        'bg-muted text-muted-foreground border-border'
                      }`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-xs font-semibold text-foreground">
                      {r.revenue > 0 ? formatCurrency(r.revenue) : '—'}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-xs font-semibold text-emerald-600">
                      {r.commission > 0 ? formatCurrency(r.commission) : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-muted-foreground">{r.attributionType}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-muted-foreground">{r.signupDate?.substring(0, 10)}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => setSelectedReferral(r)}
                        className="text-xs font-medium text-blue-500 hover:text-blue-600 hover:underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                )
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-16 text-center text-muted-foreground text-sm">
                    No referrals match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="border-t border-border px-4 py-3 flex items-center justify-between text-xs text-muted-foreground">
          <span>Showing {filtered.length} of {referrals.length} referrals</span>
          <span className="font-semibold text-foreground">
            {formatCurrency(totalRevenue)} revenue · {formatCurrency(totalCommission)} commission
          </span>
        </div>
      </div>

      {/* Detail Sheet */}
      {selectedReferral && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center sm:justify-end"
          onClick={() => setSelectedReferral(null)}
        >
          <div
            className="w-full sm:w-[480px] h-[85vh] sm:h-full bg-card border-l border-border overflow-y-auto p-6 space-y-6 animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">Referral Detail</h2>
              <button onClick={() => setSelectedReferral(null)} className="text-muted-foreground hover:text-foreground text-lg">✕</button>
            </div>

            {/* Org info */}
            <div className="space-y-3">
              <div className="rounded-xl bg-muted/40 border border-border p-4 space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Organization</p>
                <p className="text-base font-bold text-foreground">{selectedReferral.orgName}</p>
                <p className="text-xs text-muted-foreground">Contact: {selectedReferral.customerName}</p>
                <p className="text-xs text-muted-foreground">Click Date: {selectedReferral.clickDate?.substring(0, 10)}</p>
                {selectedReferral.signupDate && <p className="text-xs text-muted-foreground">Signup Date: {selectedReferral.signupDate.substring(0, 10)}</p>}
              </div>

              {/* Attribution */}
              <div className="rounded-xl bg-muted/40 border border-border p-4 space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Attribution Chain</p>
                {(() => {
                  const aff = affiliates.find((a) => a.id === selectedReferral.affiliateId)
                  return (
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">Affiliate:</span>
                        <span className="text-muted-foreground">{selectedReferral.affiliateName || aff?.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">Referral Code:</span>
                        <span className="font-mono text-blue-600">{aff?.referralCode}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">Attribution:</span>
                        <span className="text-muted-foreground">{selectedReferral.attributionType}</span>
                      </div>
                      {selectedReferral.campaign && (
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground">Campaign:</span>
                          <span className="text-muted-foreground">{selectedReferral.campaign}</span>
                        </div>
                      )}
                      {selectedReferral.coupon && (
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground">Coupon:</span>
                          <span className="font-mono text-violet-600">{selectedReferral.coupon}</span>
                        </div>
                      )}
                    </div>
                  )
                })()}
              </div>

              {/* Financial */}
              <div className="rounded-xl bg-muted/40 border border-border p-4 space-y-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Financial Summary</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-blue-500/5 border border-blue-500/20 p-3">
                    <p className="text-xs text-muted-foreground">Plan</p>
                    <p className="text-sm font-bold text-foreground">{selectedReferral.plan}</p>
                  </div>
                  <div className="rounded-lg bg-blue-500/5 border border-blue-500/20 p-3">
                    <p className="text-xs text-muted-foreground">Status</p>
                    <p className="text-sm font-bold text-foreground">{selectedReferral.status}</p>
                  </div>
                  <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-3">
                    <p className="text-xs text-muted-foreground">Revenue</p>
                    <p className="text-sm font-bold text-emerald-600">{formatCurrency(selectedReferral.revenue)}</p>
                  </div>
                  <div className="rounded-lg bg-violet-500/5 border border-violet-500/20 p-3">
                    <p className="text-xs text-muted-foreground">Commission</p>
                    <p className="text-sm font-bold text-violet-600">{formatCurrency(selectedReferral.commission)}</p>
                  </div>
                </div>
              </div>

              {/* Lifecycle */}
              <div className="rounded-xl bg-muted/40 border border-border p-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Referral Lifecycle</p>
                <AffiliateLifecycleTimeline
                  currentStep={selectedReferral.lifecycleStep || 4}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
