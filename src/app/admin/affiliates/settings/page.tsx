'use me'
'use client'

import React, { useState } from 'react'
import {
  Settings,
  Save,
  Shield,
  DollarSign,
  Clock,
  Mail,
  CreditCard,
  Sliders,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { useToast } from '@/context/toast-context'
import { ExplanatoryCallout } from '@/components/shared/explanatory-callout'

export default function AdminSettingsPage() {
  const { showToast } = useToast()

  const [cookieDays, setCookieDays] = useState(90)
  const [minPayout, setMinPayout] = useState(50)
  const [autoApproveAffiliates, setAutoApproveAffiliates] = useState(false)
  const [autoApproveCommissions, setAutoApproveCommissions] = useState(false)
  const [payoutHoldDays, setPayoutHoldDays] = useState(30)
  const [attributionModel, setAttributionModel] = useState<'last_touch' | 'first_touch'>('last_touch')
  const [defaultCommissionRate, setDefaultCommissionRate] = useState(25)
  const [notifyOnNewApplication, setNotifyOnNewApplication] = useState(true)
  const [notifyOnPayoutRequest, setNotifyOnPayoutRequest] = useState(true)
  const [notifyOnFraudAlert, setNotifyOnFraudAlert] = useState(true)

  const handleSave = () => {
    showToast('Program settings saved successfully', 'success')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Affiliate Program Settings
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Configure program defaults, attribution rules, payout thresholds, and automation settings.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm self-start md:self-auto"
        >
          <Save className="w-4 h-4" />
          Save Settings
        </button>
      </div>

      <ExplanatoryCallout
        title="Program Configuration Center"
        description="Configure standard business logic rules including the 90-day cookie window, $50 minimum payout threshold, approval workflows, and automated notification preferences."
        variant="indigo"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attribution & Cookie Settings */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-5 shadow-sm">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                Attribution & Cookie Rules
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Define referral tracking lifetime and credit allocation.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Cookie Window Duration (Days)
              </label>
              <input
                type="number"
                value={cookieDays}
                onChange={(e) => setCookieDays(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Referrals within 90 days of link click are attributed to the affiliate.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Attribution Model
              </label>
              <select
                value={attributionModel}
                onChange={(e) => setAttributionModel(e.target.value as any)}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="last_touch">Last Touch (Recommended - standard)</option>
                <option value="first_touch">First Touch</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Default Commission Rate (%)
              </label>
              <input
                type="number"
                value={defaultCommissionRate}
                onChange={(e) => setDefaultCommissionRate(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Payout & Financial Rules */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-5 shadow-sm">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                Payout & Payment Thresholds
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Minimum earnings and commission holding policies.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Minimum Payout Threshold ($)
              </label>
              <input
                type="number"
                value={minPayout}
                onChange={(e) => setMinPayout(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Affiliates must accumulate at least $50 in payable commissions to request payout.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Commission Holding Period (Days)
              </label>
              <input
                type="number"
                value={payoutHoldDays}
                onChange={(e) => setPayoutHoldDays(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Number of days commissions remain pending to cover potential customer refunds.
              </p>
            </div>
          </div>
        </div>

        {/* Automation & Approvals */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-5 shadow-sm">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="w-9 h-9 rounded-lg bg-purple-50 dark:bg-purple-950 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                Approvals & Automation
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Automate affiliate intake and commission approvals.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
              <div>
                <div className="text-sm font-medium text-slate-900 dark:text-white">Auto-approve Affiliate Applications</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Instantly grant active status to new signups</div>
              </div>
              <input
                type="checkbox"
                checked={autoApproveAffiliates}
                onChange={(e) => setAutoApproveAffiliates(e.target.checked)}
                className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
              <div>
                <div className="text-sm font-medium text-slate-900 dark:text-white">Auto-approve Commissions</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Automatically move pending commissions to approved after holding period</div>
              </div>
              <input
                type="checkbox"
                checked={autoApproveCommissions}
                onChange={(e) => setAutoApproveCommissions(e.target.checked)}
                className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Notifications & Admin Alerts */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-5 shadow-sm">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-950 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                Admin Notifications
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Manage automated system notifications.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
              <div className="text-sm font-medium text-slate-900 dark:text-white">Notify on new affiliate applications</div>
              <input
                type="checkbox"
                checked={notifyOnNewApplication}
                onChange={(e) => setNotifyOnNewApplication(e.target.checked)}
                className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
              <div className="text-sm font-medium text-slate-900 dark:text-white">Notify on payout requests</div>
              <input
                type="checkbox"
                checked={notifyOnPayoutRequest}
                onChange={(e) => setNotifyOnPayoutRequest(e.target.checked)}
                className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
              <div className="text-sm font-medium text-slate-900 dark:text-white">Notify on potential fraud alerts</div>
              <input
                type="checkbox"
                checked={notifyOnFraudAlert}
                onChange={(e) => setNotifyOnFraudAlert(e.target.checked)}
                className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
