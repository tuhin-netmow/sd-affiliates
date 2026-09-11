'use me'
'use client'

import React, { useState } from 'react'
import {
  ShieldAlert,
  Search,
  CheckCircle2,
  RotateCcw,
  UserX,
  Ban,
  Flag
} from 'lucide-react'
import { useAffiliateDemo } from '@/context/affiliate-demo-context'
import { formatCurrency } from '@/lib/affiliate/calculations'
import { ConfirmationModal } from '@/components/shared/confirmation-modal'

const FRAUD_TYPE_COLORS: Record<string, string> = {
  'Self Referral': 'bg-rose-500/10 text-rose-600 border-rose-500/20',
  'Duplicate Organization': 'bg-orange-500/10 text-orange-600 border-orange-500/20',
  'Suspicious IP': 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  'Click Spam': 'bg-rose-500/10 text-rose-600 border-rose-500/20',
  'Coupon Abuse': 'bg-violet-500/10 text-violet-600 border-violet-500/20',
  'Abnormal Conversion': 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  'Refund Pattern': 'bg-orange-500/10 text-orange-600 border-orange-500/20',
  'Chargeback Pattern': 'bg-rose-500/10 text-rose-600 border-rose-500/20',
}

const RISK_COLORS: Record<string, string> = {
  Critical: 'bg-rose-500/20 text-rose-700 dark:text-rose-300 font-bold',
  High: 'bg-rose-500/20 text-rose-600',
  Medium: 'bg-amber-500/20 text-amber-600',
  Low: 'bg-emerald-500/20 text-emerald-600',
}

const STATUS_COLORS: Record<string, string> = {
  'Under Review': 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  'Resolved Safe': 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  'Confirmed Fraud': 'bg-rose-500/10 text-rose-600 border-rose-500/20',
  'Suspended': 'bg-purple-500/10 text-purple-600 border-purple-500/20',
}

export default function FraudDetectionPage() {
  const { fraudCases, affiliates, resolveFraudCase } = useAffiliateDemo()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [confirmModal, setConfirmModal] = useState<{
    open: boolean; title: string; desc: string; action: () => void;
  }>({ open: false, title: '', desc: '', action: () => {} })

  const filtered = fraudCases.filter((c) => {
    const aff = affiliates.find((a) => a.id === c.affiliateId)
    const matchSearch = search === '' || (aff?.name || '').toLowerCase().includes(search.toLowerCase()) || c.type.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || c.status === statusFilter
    return matchSearch && matchStatus
  })

  const activeCount = fraudCases.filter((c) => c.status === 'Under Review').length
  const highRiskCount = fraudCases.filter((c) => c.riskScore === 'High' || c.riskScore === 'Critical').length

  const triggerAction = (caseId: string, action: 'Mark Safe' | 'Suspend Affiliate' | 'Ban Affiliate' | 'Reverse Commission', title: string, desc: string) => {
    setConfirmModal({
      open: true, title, desc,
      action: () => { resolveFraudCase(caseId, action); setConfirmModal((p) => ({ ...p, open: false })); },
    })
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <ShieldAlert className="size-6 text-rose-500" />
            Fraud Detection & Governance
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review and resolve suspicious affiliate activity flagged by the system.
          </p>
        </div>
        <div className="flex gap-2 self-start sm:self-auto">
          <span className="px-3 py-1.5 rounded-full bg-rose-500/10 text-rose-600 border border-rose-500/20 text-xs font-semibold">
            {activeCount} Under Review
          </span>
          <span className="px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20 text-xs font-semibold">
            {highRiskCount} High Risk
          </span>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {['Under Review', 'Resolved Safe', 'Confirmed Fraud', 'Suspended'].map((status) => (
          <div key={status} className={`rounded-2xl border p-4 text-center ${STATUS_COLORS[status] || 'border-border bg-card/80'}`}>
            <p className="text-2xl font-bold">{fraudCases.filter((c) => c.status === status).length}</p>
            <p className="text-xs mt-1">{status}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by affiliate or fraud type..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none">
          {['All', 'Under Review', 'Resolved Safe', 'Confirmed Fraud', 'Suspended'].map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Fraud Cases */}
      <div className="space-y-3">
        {filtered.map((fraudCase) => {
          const aff = affiliates.find((a) => a.id === fraudCase.affiliateId)
          const isActive = fraudCase.status === 'Under Review'
          return (
            <div key={fraudCase.id} className={`rounded-2xl border p-5 space-y-4 ${isActive ? 'border-amber-500/30 bg-amber-500/5' : 'border-border bg-card/80'}`}>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className={`size-10 rounded-xl flex items-center justify-center ${isActive ? 'bg-rose-500/10' : 'bg-muted'}`}>
                    <Flag className={`size-5 ${isActive ? 'text-rose-500' : 'text-muted-foreground'}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${FRAUD_TYPE_COLORS[fraudCase.type] || 'bg-muted text-muted-foreground border-border'}`}>
                        {fraudCase.type}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${RISK_COLORS[fraudCase.riskScore]}`}>
                        {fraudCase.riskScore} Risk
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${STATUS_COLORS[fraudCase.status]}`}>
                        {fraudCase.status}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-foreground mt-1">
                      Affiliate: <span className="text-blue-600">{aff?.name || fraudCase.affiliateName || 'Unknown'}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{fraudCase.details}</p>
                    <p className="text-[11px] text-muted-foreground mt-1">Flagged Date: {fraudCase.flaggedDate?.substring(0, 10)}</p>
                    {fraudCase.commissionAmount && (
                      <p className="text-xs text-foreground mt-0.5">Amount at Risk: <span className="font-semibold text-rose-600">{formatCurrency(fraudCase.commissionAmount)}</span></p>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              {isActive && (
                <div className="flex flex-wrap gap-2 pt-1 border-t border-border">
                  <button
                    onClick={() => triggerAction(fraudCase.id, 'Mark Safe', 'Mark as Safe', 'This will resolve the case as safe and clear the fraud flag.')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 text-xs font-semibold hover:bg-emerald-500/20 transition-colors"
                  >
                    <CheckCircle2 className="size-3.5" /> Mark Safe
                  </button>
                  <button
                    onClick={() => triggerAction(fraudCase.id, 'Reverse Commission', 'Reverse Commission', 'This will reverse the associated commission.')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-600 text-xs font-semibold hover:bg-amber-500/20 transition-colors"
                  >
                    <RotateCcw className="size-3.5" /> Reverse Commission
                  </button>
                  <button
                    onClick={() => triggerAction(fraudCase.id, 'Suspend Affiliate', 'Suspend Affiliate', 'This will temporarily suspend the affiliate account.')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/10 text-orange-600 text-xs font-semibold hover:bg-orange-500/20 transition-colors"
                  >
                    <UserX className="size-3.5" /> Suspend
                  </button>
                  <button
                    onClick={() => triggerAction(fraudCase.id, 'Ban Affiliate', 'Ban Affiliate', 'This will permanently ban the affiliate. This action cannot be undone.')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-600 text-xs font-semibold hover:bg-rose-500/20 transition-colors"
                  >
                    <Ban className="size-3.5" /> Ban
                  </button>
                </div>
              )}
            </div>
          )
        })}
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border p-16 text-center">
            <ShieldAlert className="size-10 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No fraud cases match your filters.</p>
            <p className="text-xs text-muted-foreground mt-1">All systems operating normally.</p>
          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={confirmModal.open}
        onClose={() => setConfirmModal((p) => ({ ...p, open: false }))}
        onConfirm={confirmModal.action}
        title={confirmModal.title}
        description={confirmModal.desc}
        confirmText="Confirm Action"
        confirmVariant="danger"
      />
    </div>
  )
}
