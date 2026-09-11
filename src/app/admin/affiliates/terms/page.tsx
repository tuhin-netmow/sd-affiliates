'use me'
'use client'

import React, { useState } from 'react'
import {
  FileText,
  Save,
  CheckCircle,
  AlertTriangle,
  History,
  Shield,
  DollarSign,
  UserCheck,
  Ban,
  Clock,
  Edit,
  RotateCcw
} from 'lucide-react'
import { useToast } from '@/context/toast-context'
import { ExplanatoryCallout } from '@/components/shared/explanatory-callout'

const DEFAULT_TERMS = [
  {
    id: 'commission-structure',
    title: '1. Commission Structure & Eligibility',
    icon: DollarSign,
    content: `Affiliates earn a standard commission rate based on their active Tier level (Starter: 20%, Silver: 25%, Gold: 30%, Platinum: 35%) on recurring paid subscriptions. Commissions apply to valid, active subscriptions of referred SquadDeck organizations. Renewal commissions continue for up to 12 months per customer.`
  },
  {
    id: 'attribution-policy',
    title: '2. Attribution & Cookie Window',
    icon: Clock,
    content: `Attribution operates on a 90-day cookie window using last-touch eligibility. The referral code or link clicked last prior to initial organization registration will receive full attribution credit.`
  },
  {
    id: 'refunds-chargebacks',
    title: '3. Refunds, Chargebacks & Reversals',
    icon: RotateCcw,
    content: `If a referred customer requests a refund or initiates a credit card chargeback within 60 days of payment, any associated commission will be automatically reversed from the affiliate's pending or payable balance.`
  },
  {
    id: 'self-referral',
    title: '4. Self-Referral Restrictions',
    icon: UserCheck,
    content: `Affiliates are strictly prohibited from referring their own accounts, organizations, or affiliated businesses. Self-referral attempts will be flagged by automated fraud detection, resulting in commission forfeiture.`
  },
  {
    id: 'advertising-ppc',
    title: '5. Advertising & PPC Guidelines',
    icon: Ban,
    content: `Affiliates may not bid on trademarked keywords (e.g., 'SquadDeck', 'SquadDeck pricing') in Google Ads, Bing Ads, or other Search Engine Marketing platforms. Misleading advertisements or impersonation of official SquadDeck support is strictly forbidden.`
  },
  {
    id: 'coupons-promotions',
    title: '6. Coupon Code Usage',
    icon: Shield,
    content: `Custom coupon codes are valid only when assigned directly by SquadDeck Admin. Affiliates may not scrape, publish, or distribute unauthorized promotional codes on coupon aggregator sites.`
  },
  {
    id: 'termination',
    title: '7. Fraud Prevention & Account Termination',
    icon: AlertTriangle,
    content: `SquadDeck reserves the right to suspend or permanently ban any affiliate account engaging in fraudulent activities, cookie stuffing, fake signups, or deliberate abuse. Forfeited earnings will be cancelled immediately upon account termination.`
  }
]

export default function TermsAndConditionsPage() {
  const { showToast } = useToast()
  const [terms, setTerms] = useState(DEFAULT_TERMS)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState('')
  const [lastUpdated, setLastUpdated] = useState('2026-08-15')
  const [version, setVersion] = useState('v2.4')

  const handleEdit = (id: string, currentContent: string) => {
    setEditingId(id)
    setEditText(currentContent)
  }

  const handleSaveSection = (id: string) => {
    setTerms(prev =>
      prev.map(t => (t.id === id ? { ...t, content: editText } : t))
    )
    setEditingId(null)
    showToast('Terms section updated locally', 'info')
  }

  const handlePublishNewVersion = () => {
    const today = new Date().toISOString().split('T')[0]
    setLastUpdated(today)
    const verNum = (parseFloat(version.replace('v', '')) + 0.1).toFixed(1)
    setVersion(`v${verNum}`)
    showToast(`Terms & Conditions published successfully (${version})`, 'success')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Affiliate Program Terms & Conditions
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">
              Active ({version})
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage legal agreements, commission rules, PPC policies, and fraud guidelines for affiliates.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handlePublishNewVersion}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            <Save className="w-4 h-4" />
            Publish Terms ({version})
          </button>
        </div>
      </div>

      <ExplanatoryCallout
        title="Client Demonstration Note: Terms & Governance"
        description="This panel allows program managers to define guidelines for affiliate attribution, forbidden practices (like PPC keyword bidding or self-referrals), and reversal rules. Changes instantly generate audit logs and notify connected components."
        variant="purple"
      />

      {/* Meta details bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Agreement Version</div>
            <div className="text-base font-semibold text-slate-900 dark:text-white">{version}</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Last Effective Date</div>
            <div className="text-base font-semibold text-slate-900 dark:text-white">{lastUpdated}</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-950 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <History className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Signed Affiliates</div>
            <div className="text-base font-semibold text-slate-900 dark:text-white">25 Active</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Attribution Window</div>
            <div className="text-base font-semibold text-slate-900 dark:text-white">90 Days (Last Touch)</div>
          </div>
        </div>
      </div>

      {/* Terms list */}
      <div className="space-y-4">
        {terms.map((item) => {
          const Icon = item.icon
          const isEditing = editingId === item.id

          return (
            <div
              key={item.id}
              className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                </div>
                {!isEditing ? (
                  <button
                    onClick={() => handleEdit(item.id, item.content)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 rounded-lg transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    Edit Clause
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSaveSection(item.id)}
                      className="px-3 py-1.5 text-xs font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                      Save Clause
                    </button>
                  </div>
                )}
              </div>

              {isEditing ? (
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  rows={4}
                  className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              ) : (
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-11">
                  {item.content}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
