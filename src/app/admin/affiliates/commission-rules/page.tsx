'use me'
'use client'

import React, { useState } from 'react'
import { Sliders, Save, Info, Edit3 } from 'lucide-react'
import { useAffiliateDemo } from '@/context/affiliate-demo-context'
import { useToast } from '@/context/toast-context'
import { ExplanatoryCallout } from '@/components/shared/explanatory-callout'

export default function CommissionRulesPage() {
  const { commissionRules, tiers, updateCommissionRule } = useAffiliateDemo()
  const { showToast } = useToast()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValues, setEditValues] = useState<Record<string, number>>({})

  const startEdit = (rule: typeof commissionRules[0]) => {
    setEditingId(rule.id)
    setEditValues({ [rule.id]: rule.defaultRate })
  }

  const saveEdit = (ruleId: string) => {
    const newRate = editValues[ruleId] || 25
    updateCommissionRule(ruleId, { defaultRate: newRate })
    setEditingId(null)
    showToast('Commission rule updated successfully.', 'success')
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sliders className="size-6 text-indigo-600" />
          Commission Rules & Rates
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Configure commission rates by plan and affiliate tier. Changes update the local demo state immediately.
        </p>
      </div>

      <ExplanatoryCallout
        title="Commission Rate Hierarchy"
        description="Base commission rates are configured per subscription plan (Starter: $19/mo, Pro: $49/mo) and scale automatically according to the affiliate's active tier (Bronze 20%, Silver 25%, Gold 30%, Platinum 35%)."
        variant="indigo"
      />

      {/* Tier Rates Matrix */}
      <div className="space-y-4">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">Tier Commission Hierarchy</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tiers.map((tier) => (
            <div key={tier.id} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900 dark:text-white">{tier.name} Tier</span>
                <span className="text-xs px-2 py-0.5 rounded font-mono font-bold" style={{ color: tier.color, backgroundColor: `${tier.color}15` }}>
                  {tier.minCustomers}+ Customers
                </span>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{tier.commissionRate}%</p>
                <p className="text-xs text-slate-500 mt-1">recurring revenue share</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Plan-Based Rules */}
      <div className="space-y-4">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">Plan-Based Base Rules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {commissionRules.map((rule) => {
            const isEditing = editingId === rule.id
            const currentRate = editValues[rule.id] ?? rule.defaultRate
            const planPrice = rule.planName === 'Pro' ? 49 : 19

            return (
              <div key={rule.id} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-base font-bold text-slate-900 dark:text-white capitalize">{rule.planName} Plan (${planPrice}/mo)</span>
                    <p className="text-xs text-slate-500 mt-0.5">{rule.description}</p>
                  </div>
                  {!isEditing && (
                    <button onClick={() => startEdit(rule)} className="text-slate-400 hover:text-indigo-600">
                      <Edit3 className="size-4" />
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min="1"
                      max="100"
                      step="1"
                      value={currentRate}
                      onChange={(e) => setEditValues((prev) => ({ ...prev, [rule.id]: parseFloat(e.target.value) || 0 }))}
                      className="w-24 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-lg font-bold text-slate-900 dark:text-white text-center focus:outline-none"
                    />
                    <span className="text-lg font-bold text-slate-900 dark:text-white">%</span>
                    <button onClick={() => saveEdit(rule.id)} className="text-xs font-semibold px-3 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
                      Save
                    </button>
                    <button onClick={() => setEditingId(null)} className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white">
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-end gap-3">
                    <p className="text-4xl font-extrabold text-slate-900 dark:text-white">{rule.defaultRate}%</p>
                    <div className="mb-1.5">
                      <p className="text-xs text-slate-500">default commission rate</p>
                    </div>
                  </div>
                )}

                <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-3 text-xs text-slate-600 dark:text-slate-400">
                  Example: ${planPrice} × {rule.defaultRate}% =
                  <strong className="text-slate-900 dark:text-white ml-1">
                    ${((planPrice * rule.defaultRate) / 100).toFixed(2)} commission/month
                  </strong>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Summary Matrix */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Complete Commission Payout Matrix</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500">Tier</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500">Rate</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500">Starter ($19/mo)</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500">Pro ($49/mo)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {tiers.map((tier) => (
                <tr key={tier.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white text-sm">{tier.name}</td>
                  <td className="px-4 py-3 text-center font-mono font-bold text-indigo-600 dark:text-indigo-400">{tier.commissionRate}%</td>
                  <td className="px-4 py-3 text-center font-mono text-slate-900 dark:text-white">${((19 * tier.commissionRate) / 100).toFixed(2)}</td>
                  <td className="px-4 py-3 text-center font-mono text-slate-900 dark:text-white">${((49 * tier.commissionRate) / 100).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
