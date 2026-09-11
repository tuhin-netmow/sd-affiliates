'use me'
'use client'

import React, { useState } from 'react'
import { Building2, Search, CreditCard, DollarSign, TrendingUp } from 'lucide-react'
import { useAffiliateDemo } from '@/context/affiliate-demo-context'
import { formatCurrency } from '@/lib/affiliate/calculations'
import { AffiliateLifecycleTimeline } from '@/components/timeline/affiliate-lifecycle-timeline'

const PLANS = ['All', 'Free', 'Starter', 'Pro', 'Enterprise']
const STATUSES = ['All', 'Active', 'Trial', 'Cancelled', 'Past Due']

export default function AdminCustomersPage() {
  const { customers, affiliates, commissions } = useAffiliateDemo()
  const [search, setSearch] = useState('')
  const [planFilter, setPlanFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedCustomer, setSelectedCustomer] = useState<typeof customers[0] | null>(null)

  const filtered = customers.filter((c) => {
    const matchSearch =
      search === '' ||
      c.orgName.toLowerCase().includes(search.toLowerCase()) ||
      c.contactName.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
    const matchPlan = planFilter === 'All' || c.plan === planFilter
    const matchStatus = statusFilter === 'All' || c.subscriptionStatus === statusFilter
    return matchSearch && matchPlan && matchStatus
  })

  const totalRevenue = filtered.reduce((acc, c) => acc + c.lifetimeRevenue, 0)

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Building2 className="size-6 text-blue-500" />
            Customer Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            All organizations referred by affiliates — track subscriptions, revenue, and commissions.
          </p>
        </div>
        <span className="px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs font-medium self-start sm:self-auto">
          {filtered.length} customers
        </span>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Customers', value: customers.length, icon: <Building2 className="size-4 text-blue-500" /> },
          { label: 'Active Paid', value: customers.filter((c) => c.subscriptionStatus === 'Active').length, icon: <CreditCard className="size-4 text-emerald-500" /> },
          { label: 'Total Revenue', value: formatCurrency(customers.reduce((a, c) => a + c.lifetimeRevenue, 0)), icon: <DollarSign className="size-4 text-violet-500" /> },
          { label: 'Total Commission', value: formatCurrency(commissions.reduce((a, c) => a + (c.amount > 0 ? c.amount : 0), 0)), icon: <TrendingUp className="size-4 text-amber-500" /> },
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
            placeholder="Search by organization, name or email..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          />
        </div>
        <select value={planFilter} onChange={(e) => setPlanFilter(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground focus:outline-none">
          {PLANS.map((p) => <option key={p}>{p}</option>)}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground focus:outline-none">
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
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Monthly Rev.</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Lifetime Rev.</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Signup</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((c) => {
                const aff = affiliates.find((a) => a.id === c.affiliateId)
                return (
                  <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="size-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                          <Building2 className="size-4 text-blue-500" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-xs">{c.orgName}</p>
                          <p className="text-xs text-muted-foreground">{c.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-foreground">{c.affiliateName || aff?.name || '—'}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
                        c.plan === 'Pro' ? 'bg-violet-500/10 text-violet-600 border-violet-500/20' :
                        c.plan === 'Starter' ? 'bg-blue-500/10 text-blue-600 border-blue-500/20' :
                        'bg-muted text-muted-foreground border-border'
                      }`}>{c.plan}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
                        c.subscriptionStatus === 'Active' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' :
                        c.subscriptionStatus === 'Trial' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' :
                        c.subscriptionStatus === 'Cancelled' ? 'bg-rose-500/10 text-rose-600 border-rose-500/20' :
                        'bg-muted text-muted-foreground border-border'
                      }`}>{c.subscriptionStatus}</span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-xs font-semibold text-foreground">
                      {formatCurrency(c.monthlyRevenue)}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-xs font-semibold text-emerald-600">
                      {formatCurrency(c.lifetimeRevenue)}
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{c.signupDate?.substring(0, 10)}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => setSelectedCustomer(c)}
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
                  <td colSpan={8} className="px-4 py-16 text-center text-muted-foreground text-sm">
                    No customers match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="border-t border-border px-4 py-3 flex items-center justify-between text-xs text-muted-foreground">
          <span>Showing {filtered.length} of {customers.length} customers</span>
          <span className="font-semibold text-foreground">{formatCurrency(totalRevenue)} lifetime revenue</span>
        </div>
      </div>

      {/* Detail Drawer */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-end" onClick={() => setSelectedCustomer(null)}>
          <div className="w-full sm:w-[480px] h-full bg-card border-l border-border overflow-y-auto p-6 space-y-5 animate-in slide-in-from-right duration-300" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">Customer Detail</h2>
              <button onClick={() => setSelectedCustomer(null)} className="text-muted-foreground hover:text-foreground">✕</button>
            </div>

            <div className="rounded-xl bg-muted/40 border border-border p-4 space-y-2">
              <div className="size-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-2">
                <Building2 className="size-6 text-blue-500" />
              </div>
              <p className="text-base font-bold text-foreground">{selectedCustomer.orgName}</p>
              <p className="text-sm text-muted-foreground">{selectedCustomer.contactName}</p>
              <p className="text-xs text-muted-foreground">{selectedCustomer.email}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Plan', value: selectedCustomer.plan },
                { label: 'Status', value: selectedCustomer.subscriptionStatus },
                { label: 'Monthly Revenue', value: formatCurrency(selectedCustomer.monthlyRevenue) },
                { label: 'Lifetime Revenue', value: formatCurrency(selectedCustomer.lifetimeRevenue) },
                { label: 'Signup Date', value: selectedCustomer.signupDate?.substring(0, 10) },
                { label: 'Attribution', value: selectedCustomer.attribution },
              ].map((item) => (
                <div key={item.label} className="rounded-xl bg-muted/30 border border-border p-3">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-semibold text-foreground mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Commission History */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Commission History</p>
              {commissions.filter((cm) => cm.customerId === selectedCustomer.id).map((cm) => (
                <div key={cm.id} className="flex items-center justify-between py-2 border-b border-border text-xs">
                  <span className="text-muted-foreground">{cm.date?.substring(0, 10)}</span>
                  <span className={`font-mono font-semibold ${cm.amount < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {cm.amount < 0 ? '-' : '+'}{formatCurrency(Math.abs(cm.amount))}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    cm.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-600' :
                    cm.status === 'Approved' ? 'bg-blue-500/10 text-blue-600' :
                    cm.status === 'Pending' ? 'bg-amber-500/10 text-amber-600' :
                    'bg-rose-500/10 text-rose-600'
                  }`}>{cm.status}</span>
                </div>
              ))}
              {commissions.filter((cm) => cm.customerId === selectedCustomer.id).length === 0 && (
                <p className="text-xs text-muted-foreground text-center py-4">No commission records</p>
              )}
            </div>

            {/* Lifecycle */}
            <div className="rounded-xl bg-muted/40 border border-border p-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Customer Lifecycle</p>
              <AffiliateLifecycleTimeline
                currentStep={
                  selectedCustomer.subscriptionStatus === 'Active' && selectedCustomer.monthlyRevenue > 0 ? 4 :
                  selectedCustomer.subscriptionStatus === 'Trial' ? 3 :
                  2
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
