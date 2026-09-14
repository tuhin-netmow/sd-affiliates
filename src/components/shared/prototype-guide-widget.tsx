'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Sparkles,
  HelpCircle,
  Play,
  RotateCcw,
  CheckCircle2,
  ChevronUp,
  ChevronDown,
  X,
  Layers,
  LayoutDashboard,
  ShieldCheck,
  MousePointerClick,
  UserPlus,
  Zap,
  DollarSign,
  CreditCard,
  Send,
  Check,
  ExternalLink,
  Info,
  BookOpen,
  Compass,
  ArrowRight,
  TrendingUp,
  Award,
  ShieldAlert,
  Tag,
  FileText,
  PieChart,
  Users,
  Settings,
  Bell
} from 'lucide-react'
import { useAffiliateDemo } from '@/context/affiliate-demo-context'

interface RouteInfo {
  title: string
  description: string
  role: 'affiliate' | 'admin' | 'public' | 'demo'
  features: string[]
  stepRelevance?: string
}

const ROUTE_CONTEXT_MAP: Record<string, RouteInfo> = {
  '/': {
    title: 'Public Affiliate Landing Page',
    description: 'Recruitment landing page for potential affiliate partners explaining commission rates, perks, tiers, and how the program works.',
    role: 'public',
    features: ['Program Overview', 'Tier Progression Pitch', 'Earnings Calculator', 'Partner Testimonials', 'FAQ & Registration Trigger'],
    stepRelevance: 'Step 1 & 2: Application Entrypoint'
  },
  '/demo': {
    title: 'Demo Control Center',
    description: 'Central simulator allowing real-time step-by-step triggering of the entire 10-step affiliate lifecycle without backend dependencies.',
    role: 'demo',
    features: ['10-Step Workflow Trigger', 'Live Metrics Inspector', 'Customer Simulator', 'Coupon Tester', 'State Reset'],
    stepRelevance: 'All Steps (1 to 10)'
  },
  '/register': {
    title: 'Affiliate Application Page',
    description: 'Form where prospective sports influencers, coaches, and directors apply to become affiliate partners.',
    role: 'public',
    features: ['Application Submission', 'Audience Profile Info', 'Promotion Strategy', 'Instant Mock Submission'],
    stepRelevance: 'Step 1: Affiliate Application'
  },
  '/login': {
    title: 'Affiliate & Admin Portal Sign In',
    description: 'Authentication entry point with one-click quick login buttons for Affiliate mode or Admin mode.',
    role: 'public',
    features: ['Quick Role Selector', 'Mock Session Switcher', 'Security Shield'],
    stepRelevance: 'Access Control'
  },
  '/affiliate/dashboard': {
    title: 'Affiliate Overview Dashboard',
    description: 'Main operational hub for active affiliates showing total earnings, click conversions, quick link copy, and recent activity.',
    role: 'affiliate',
    features: ['Real-time KPI Cards', 'Quick Referral Link Copy', 'Performance Graph', 'Recent Commission Stream', 'Active Tier Badge'],
    stepRelevance: 'Steps 3, 7, 9: Link Sharing, Earnings & Balance'
  },
  '/affiliate/links': {
    title: 'Referral Link Builder & Tracking',
    description: 'Tools to create custom tracked referral links with UTM campaign parameters and channel performance analytics.',
    role: 'affiliate',
    features: ['Custom Link Generator', 'Campaign Tagging', 'Click Analytics', 'QR Code Generator', 'Channel Performance'],
    stepRelevance: 'Step 3 & 4: Link Sharing & Visitor Clicks'
  },
  '/affiliate/coupons': {
    title: 'Promo Coupon Manager',
    description: 'Exclusive discount codes assigned to the affiliate that customers can enter at signup to trigger referral attribution.',
    role: 'affiliate',
    features: ['Active Promo Codes', 'Discount Percentage View', 'Usage Counter', 'Coupon Copy'],
    stepRelevance: 'Step 3 & 5: Promotional Attribution & Signup'
  },
  '/affiliate/customers': {
    title: 'Referred Customers Roster',
    description: 'Detailed list of sports clubs, leagues, and directors who signed up using the affiliate\'s referral link or coupon.',
    role: 'affiliate',
    features: ['Customer Org Names', 'Subscription Plan Level', 'MRR Value', 'Signup Timestamp', 'Conversion Status'],
    stepRelevance: 'Step 5 & 6: Customer Signup & Paid Upgrade'
  },
  '/affiliate/commissions': {
    title: 'Commission Ledger & History',
    description: 'Comprehensive financial log of every commission generated, approved, made payable, or refunded.',
    role: 'affiliate',
    features: ['Commission Status Badges', 'Tier Rate Breakdown', 'Lock-in Period Indicator', 'Filter by Date/Status'],
    stepRelevance: 'Step 7 & 8: Commission Generation & Lock-in'
  },
  '/affiliate/payouts': {
    title: 'Payout Requests & History',
    description: 'Manage payout methods, check minimum threshold progress, and request withdrawal of payable commissions.',
    role: 'affiliate',
    features: ['Available Payable Balance', 'Threshold Progress Bar', '1-Click Payout Request', 'Payout Status Tracker'],
    stepRelevance: 'Step 9 & 10: Payout Request & Settlement'
  },
  '/affiliate/marketing': {
    title: 'Marketing Assets & Collateral',
    description: 'Downloadable promotional banners, social media graphic packs, email outreach copy, and PDF pitch decks.',
    role: 'affiliate',
    features: ['Banner Image Downloads', 'Pre-written Email Copy', 'Social Media Templates', 'Asset Usage Guides'],
    stepRelevance: 'Step 3: Partner Promotion'
  },
  '/affiliate/bonuses': {
    title: 'Tiers & Gamification Milestones',
    description: 'Gamification system tracking tier advancement (Bronze, Silver, Gold, Platinum) and milestone cash bonuses.',
    role: 'affiliate',
    features: ['Tier Progress Bar', 'Milestone Cash Rewards', 'Rate Boost Preview', 'Gamification Badges'],
    stepRelevance: 'Growth & Tier Rewards'
  },
  '/affiliate/leaderboard': {
    title: 'Monthly Partner Leaderboard',
    description: 'Public or partner-facing ranking of top affiliate performers by monthly referrals and generated revenue.',
    role: 'affiliate',
    features: ['Rank Badges', 'Top Performers Roster', 'Monthly Competition Status', 'Referral Totals'],
    stepRelevance: 'Community & Gamification'
  },
  '/affiliate/notifications': {
    title: 'Real-time Alerts & Notifications Hub',
    description: 'Instant notification log alerting the affiliate whenever a click happens, customer signs up, or payout is sent.',
    role: 'affiliate',
    features: ['Read/Unread Toggles', 'Event Category Filters', 'Timestamped Logs', 'System Alerts'],
    stepRelevance: 'Real-time Event Tracking'
  },
  '/affiliate/settings': {
    title: 'Profile & Payment Preferences',
    description: 'Manage tax documents (W-9 / W-8BEN), payment withdrawal channels (PayPal, Direct Deposit), and user settings.',
    role: 'affiliate',
    features: ['Payment Method Config', 'Tax Document Status', 'Notification Preferences', 'Profile Details'],
    stepRelevance: 'Account & Payout Setup'
  },
  '/admin/affiliates': {
    title: 'Admin Overview & Program Health',
    description: 'Executive dashboard for affiliate program managers showing total revenue, active affiliates, pending payouts, and top partners.',
    role: 'admin',
    features: ['Program Health Metrics', 'Pending Applications Alert', 'Pending Payout Approval Counter', 'Top Affiliate Cards'],
    stepRelevance: 'Program Oversight & Analytics'
  },
  '/admin/affiliates/applications': {
    title: 'Affiliate Applications Approval Queue',
    description: 'Review pending affiliate submissions, inspect candidate audience details, and approve or reject with custom tier assignment.',
    role: 'admin',
    features: ['Applicant Profile Review', '1-Click Approve / Reject', 'Tier Assignment Selector', 'Custom Rate Overrides'],
    stepRelevance: 'Step 2: Admin Approval'
  },
  '/admin/affiliates/list': {
    title: 'Affiliate Directory & Roster',
    description: 'Master list of all registered affiliates with status controls (Active, Suspended), commission overrides, and detailed performance stats.',
    role: 'admin',
    features: ['Affiliate Roster Table', 'Status Suspension Toggle', 'Direct Performance Inspect', 'Custom Rate Editor'],
    stepRelevance: 'Affiliate Program Management'
  },
  '/admin/affiliates/commission-rules': {
    title: 'Commission Rules & Policy Engine',
    description: 'Configure default commission rates (e.g. 25%), cookie window duration (e.g. 90 days), lock-in hold period, and tier thresholds.',
    role: 'admin',
    features: ['Default Rate Rules', 'Cookie Expiration Setting', 'Hold-period Hold Config', 'Tier Rule Setup'],
    stepRelevance: 'Program Rule Engine'
  },
  '/admin/affiliates/commissions': {
    title: 'Commission Approvals & Manual Ledger',
    description: 'Admin control over all generated commissions including manual commission creation, voiding refunds, and fast-track approvals.',
    role: 'admin',
    features: ['1-Click Commission Approval', 'Make Payable Action', 'Manual Adjustment Entry', 'Refund Voiding'],
    stepRelevance: 'Step 8: Commission Approval & Lock-in'
  },
  '/admin/affiliates/payouts': {
    title: 'Payout Approval & Disbursement Queue',
    description: 'Process pending payout requests submitted by affiliates, approve transfers, and mark payouts as Paid with transaction reference numbers.',
    role: 'admin',
    features: ['Pending Payout Queue', '1-Click Approve Payout', '1-Click Mark Paid', 'Export Batch CSV'],
    stepRelevance: 'Step 10: Admin Payout Approval & Payment'
  },
  '/admin/affiliates/fraud': {
    title: 'Fraud Detection & Risk Shield',
    description: 'Automated monitoring flagging suspicious activity such as self-referrals, identical IP signups, or abnormal click velocity.',
    role: 'admin',
    features: ['Risk Score Indicators', 'Self-referral Detection', 'Flagged Cases Queue', 'Freeze Payouts Action'],
    stepRelevance: 'Security & Integrity'
  },
  '/admin/affiliates/audit-logs': {
    title: 'System Security Audit Trail',
    description: 'Immutable system log documenting every action taken by admins and affiliates across the entire platform.',
    role: 'admin',
    features: ['Timestamped Activity Logs', 'User Action Filtering', 'IP Address Tracking', 'System Compliance'],
    stepRelevance: 'Auditability & Security'
  },
  '/admin/affiliates/campaigns': {
    title: 'Campaign Manager & UTM Tracking',
    description: 'Create and track promotional campaigns (e.g. Back-to-School 2026, Summer Tournament Blitz) with unique landing pages.',
    role: 'admin',
    features: ['Campaign Creation', 'UTM Generator', 'Conversion Rate Tracking', 'Bonus Multipliers'],
    stepRelevance: 'Campaign Management'
  },
  '/admin/affiliates/coupons': {
    title: 'Global Promo Coupon Manager',
    description: 'Manage, generate, and assign promotional discount codes across all affiliate partners.',
    role: 'admin',
    features: ['Create New Coupon', 'Assign to Affiliate', 'Discount Rule Config', 'Usage Analytics'],
    stepRelevance: 'Promotions Management'
  },
  '/admin/affiliates/tiers': {
    title: 'Tier Progression & Commission Config',
    description: 'Set up Bronze, Silver, Gold, and Platinum tier rules, commission rates, and revenue thresholds.',
    role: 'admin',
    features: ['Tier Split Editor', 'Min Revenue Thresholds', 'Perk Definitions', 'Automatic Upgrades'],
    stepRelevance: 'Gamification Config'
  },
  '/admin/affiliates/terms': {
    title: 'Program Terms & Legal Agreements',
    description: 'Manage legal disclosures, FTC compliance requirements, and affiliate partner agreements.',
    role: 'admin',
    features: ['Terms Content Editor', 'FTC Guidelines View', 'Agreement Versioning'],
    stepRelevance: 'Legal & Compliance'
  }
}

export function PrototypeGuideWidget() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'steps' | 'features' | 'context'>('steps')

  const {
    demoWorkflow,
    simulateReferralClick,
    simulateSignup,
    simulateUpgradeCustomer,
    simulateGenerateCommission,
    approveCommission,
    makeCommissionPayable,
    requestPayout,
    approvePayout,
    markPayoutPaid,
    resetDemo,
    activeAffiliate,
    customers,
    commissions,
    payouts
  } = useAffiliateDemo()

  const currentRouteInfo = ROUTE_CONTEXT_MAP[pathname] || {
    title: 'SquadDeck Affiliate Page',
    description: 'Interactive prototype page demonstrating the affiliate management system.',
    role: 'public',
    features: ['Interactive Prototype State', 'Shared Navigation', 'Live State Synchronization']
  }

  const STEPS = [
    {
      step: 1,
      title: 'Affiliate Selection',
      desc: 'Affiliate partner registers or is selected (e.g. Alex Morgan).',
      targetRoute: '/affiliate/dashboard',
      action: null,
      actionLabel: 'Selected'
    },
    {
      step: 2,
      title: 'Admin Approval',
      desc: 'Admin reviews application and approves affiliate with commission tier.',
      targetRoute: '/admin/affiliates/applications',
      action: null,
      actionLabel: 'Approved'
    },
    {
      step: 3,
      title: 'Link & Coupon Generation',
      desc: 'Affiliate retrieves referral link (?ref=ALEX2026) and promo coupon.',
      targetRoute: '/affiliate/links',
      action: null,
      actionLabel: 'Link Ready'
    },
    {
      step: 4,
      title: 'Visitor Link Click',
      desc: 'Prospective club director clicks referral link. 90-day cookie placed.',
      targetRoute: '/affiliate/links',
      action: () => simulateReferralClick(),
      actionLabel: 'Simulate Click'
    },
    {
      step: 5,
      title: 'Free Sign Up',
      desc: 'Visitor registers a free SquadDeck account (e.g. Riverside Basketball).',
      targetRoute: '/affiliate/customers',
      action: () => simulateSignup('Riverside Basketball Club', 'Free'),
      actionLabel: 'Simulate Sign Up'
    },
    {
      step: 6,
      title: 'Customer Upgrade',
      desc: 'Customer upgrades from Free to Pro ($49/mo) or Enterprise ($299/mo).',
      targetRoute: '/affiliate/customers',
      action: () => {
        const targetId = demoWorkflow.simulatedCustomerId || customers[0]?.id || 'cust-1'
        simulateUpgradeCustomer(targetId, 'Pro')
      },
      actionLabel: 'Upgrade Customer'
    },
    {
      step: 7,
      title: 'Commission Generated',
      desc: 'System automatically calculates recurring commission based on tier rate.',
      targetRoute: '/affiliate/commissions',
      action: () => {
        const targetId = demoWorkflow.simulatedCustomerId || customers[0]?.id || 'cust-1'
        simulateGenerateCommission(targetId, 49)
      },
      actionLabel: 'Generate Commission'
    },
    {
      step: 8,
      title: 'Admin Approval & Hold',
      desc: 'Admin approves commission; lock-in period passes to make it Payable.',
      targetRoute: '/admin/affiliates/commissions',
      action: () => {
        const targetCommId = demoWorkflow.simulatedCommissionId || commissions[0]?.id || 'comm-101'
        approveCommission(targetCommId)
        makeCommissionPayable(targetCommId)
      },
      actionLabel: 'Approve & Payable'
    },
    {
      step: 9,
      title: 'Payout Request',
      desc: 'Affiliate reaches minimum threshold ($50) and submits payout request.',
      targetRoute: '/affiliate/payouts',
      action: () => requestPayout(activeAffiliate.id, activeAffiliate.stats.currentBalance || 50, 'PayPal'),
      actionLabel: 'Request Payout'
    },
    {
      step: 10,
      title: 'Admin Payout Paid',
      desc: 'Admin approves and marks payout as Paid with transaction reference.',
      targetRoute: '/admin/affiliates/payouts',
      action: () => {
        const targetPayoutId = demoWorkflow.simulatedPayoutId || payouts[0]?.id || 'payout-1'
        approvePayout(targetPayoutId)
        markPayoutPaid(targetPayoutId)
      },
      actionLabel: 'Approve & Pay Out'
    }
  ]

  const FEATURE_GROUPS = [
    {
      name: 'Affiliate Portal Features',
      role: 'Affiliate View',
      color: 'from-[#27125B] to-[#8B14C2]',
      items: [
        { name: 'Dashboard Overview', route: '/affiliate/dashboard', desc: 'KPI cards, link copy, performance stream', icon: LayoutDashboard },
        { name: 'Referral Links Generator', route: '/affiliate/links', desc: 'Custom UTM tags, QR codes, link analytics', icon: MousePointerClick },
        { name: 'Promo Coupons', route: '/affiliate/coupons', desc: 'Unique discount promo codes & attribution', icon: Tag },
        { name: 'Referred Customers', route: '/affiliate/customers', desc: 'Tracked sports clubs, plan levels, MRR', icon: Users },
        { name: 'Commissions Ledger', route: '/affiliate/commissions', desc: 'Lock-in status, approval state, payout eligibility', icon: DollarSign },
        { name: 'Payout Requests', route: '/affiliate/payouts', desc: 'Balance bar, threshold status, withdrawal modal', icon: CreditCard },
        { name: 'Marketing Assets', route: '/affiliate/marketing', desc: 'Downloadable banners, copy, social packs', icon: FileText },
        { name: 'Tier & Gamification', route: '/affiliate/bonuses', desc: 'Bronze to Platinum progression & bonuses', icon: Award },
        { name: 'Monthly Leaderboard', route: '/affiliate/leaderboard', desc: 'Top affiliate rankings & competitions', icon: TrendingUp },
        { name: 'Real-time Notifications', route: '/affiliate/notifications', desc: 'Alerts for clicks, signups, payouts', icon: Bell },
        { name: 'Profile & Payment Settings', route: '/affiliate/settings', desc: 'Tax forms (W-9), payout method config', icon: Settings }
      ]
    },
    {
      name: 'Admin Portal Features',
      role: 'Admin Control',
      color: 'from-purple-800 to-indigo-900',
      items: [
        { name: 'Admin Dashboard', route: '/admin/affiliates', desc: 'Program health, payouts queue, top partners', icon: ShieldCheck },
        { name: 'Applications Queue', route: '/admin/affiliates/applications', desc: 'Review, approve, reject applicant profiles', icon: UserPlus },
        { name: 'Affiliate Roster', route: '/admin/affiliates/list', desc: 'Directory, suspend status, rate overrides', icon: Users },
        { name: 'Commission Rules Engine', route: '/admin/affiliates/commission-rules', desc: 'Cookie window, hold period, rates setup', icon: Settings },
        { name: 'Commission Approvals', route: '/admin/affiliates/commissions', desc: 'Manual entries, status overrides, voids', icon: DollarSign },
        { name: 'Payout Processing Queue', route: '/admin/affiliates/payouts', desc: 'Approve payouts, mark paid, batch export', icon: CreditCard },
        { name: 'Fraud & Security Shield', route: '/admin/affiliates/fraud', desc: 'Self-referral flags, risk scores, freeze', icon: ShieldAlert },
        { name: 'System Audit Logs', route: '/admin/affiliates/audit-logs', desc: 'Immutable audit trail of all platform events', icon: FileText },
        { name: 'Campaign Manager', route: '/admin/affiliates/campaigns', desc: 'UTM campaigns, seasonal promotions', icon: Zap },
        { name: 'Global Coupon Manager', route: '/admin/affiliates/coupons', desc: 'Assign codes, manage discount splits', icon: Tag },
        { name: 'Tier Configurator', route: '/admin/affiliates/tiers', desc: 'Bronze-Platinum splits & threshold rules', icon: Award },
        { name: 'Terms & Compliance', route: '/admin/affiliates/terms', desc: 'FTC disclosures & legal agreements', icon: BookOpen }
      ]
    }
  ]

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end pointer-events-none">
      {/* Floating Collapsible Control Button */}
      <div className="pointer-events-auto flex items-center gap-2">
        {/* Step Quick Trigger Pill */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 text-white backdrop-blur-md text-xs font-semibold shadow-lg border border-slate-800">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>Step {demoWorkflow.currentStep}/10</span>
          <span className="text-slate-400">|</span>
          <span className="text-purple-300 truncate max-w-[140px]">
            {STEPS[demoWorkflow.currentStep - 1]?.title}
          </span>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#27125B] via-[#431D80] to-[#8B14C2] hover:opacity-95 text-white font-bold text-xs shadow-xl shadow-[#8B14C2]/30 border border-purple-400/30 transition-all hover:scale-105 active:scale-95"
        >
          <Sparkles className="w-4 h-4 text-purple-200 animate-spin-slow" />
          <span>{isOpen ? 'Close Prototype Guide' : 'Interactive Prototype & Feature Guide'}</span>
          {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Drawer Modal / Popup */}
      {isOpen && (
        <div className="pointer-events-auto mt-3 w-[92vw] sm:w-[540px] max-h-[82vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Drawer Header */}
          <div className="p-4 bg-gradient-to-r from-[#27125B] to-[#431D80] text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                <Compass className="w-4 h-4 text-purple-300" />
              </div>
              <div>
                <h3 className="text-sm font-bold leading-tight">Prototype Self-Describing Guide</h3>
                <p className="text-[11px] text-purple-200">SquadDeck Affiliate Lifecycle & Feature Explorer</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={resetDemo}
                title="Reset prototype state"
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-purple-200 text-xs transition-colors flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="text-[10px] hidden sm:inline">Reset</span>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Navigation Toolbar */}
          <div className="bg-slate-100 dark:bg-slate-950 p-2 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 text-xs overflow-x-auto">
            <div className="flex items-center gap-1.5 text-[11px]">
              <span className="font-semibold text-slate-500 pl-1">Jump View:</span>
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${pathname === '/' ? 'bg-purple-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'}`}
              >
                Home
              </Link>
              <Link
                href="/demo"
                onClick={() => setIsOpen(false)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${pathname === '/demo' ? 'bg-purple-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'}`}
              >
                Demo Hub
              </Link>
              <Link
                href="/affiliate/dashboard"
                onClick={() => setIsOpen(false)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${pathname.startsWith('/affiliate') ? 'bg-purple-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'}`}
              >
                Affiliate View
              </Link>
              <Link
                href="/admin/affiliates"
                onClick={() => setIsOpen(false)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${pathname.startsWith('/admin') ? 'bg-purple-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'}`}
              >
                Admin View
              </Link>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="grid grid-cols-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('steps')}
              className={`py-2.5 px-3 flex items-center justify-center gap-1.5 border-b-2 transition-colors ${activeTab === 'steps' ? 'border-[#8B14C2] text-[#8B14C2] bg-white dark:bg-slate-900' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>10-Step Workflow</span>
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`py-2.5 px-3 flex items-center justify-center gap-1.5 border-b-2 transition-colors ${activeTab === 'features' ? 'border-[#8B14C2] text-[#8B14C2] bg-white dark:bg-slate-900' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Feature Map</span>
            </button>
            <button
              onClick={() => setActiveTab('context')}
              className={`py-2.5 px-3 flex items-center justify-center gap-1.5 border-b-2 transition-colors ${activeTab === 'context' ? 'border-[#8B14C2] text-[#8B14C2] bg-white dark:bg-slate-900' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
              <Info className="w-3.5 h-3.5" />
              <span>Page Guide</span>
            </button>
          </div>

          {/* Tab Content Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* TAB 1: 10-STEP WORKFLOW */}
            {activeTab === 'steps' && (
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 text-xs text-purple-900 dark:text-purple-200 flex items-start gap-2">
                  <Info className="w-4 h-4 text-[#8B14C2] shrink-0 mt-0.5" />
                  <p>
                    <strong>Interactive Lifecycle Simulator:</strong> Click any step action to trigger the state change live in memory and jump straight to the relevant page view!
                  </p>
                </div>

                <div className="space-y-2">
                  {STEPS.map((s) => {
                    const isPassed = demoWorkflow.currentStep > s.step
                    const isCurrent = demoWorkflow.currentStep === s.step
                    return (
                      <div
                        key={s.step}
                        className={`p-3 rounded-2xl border transition-all ${isCurrent ? 'bg-purple-50/80 dark:bg-purple-950/60 border-purple-300 dark:border-purple-700 ring-2 ring-purple-400/30' : isPassed ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40' : 'bg-slate-50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800'}`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <div className="flex items-center gap-2">
                            <span className={`w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center ${isCurrent ? 'bg-[#8B14C2] text-white' : isPassed ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600'}`}>
                              {isPassed ? <Check className="w-3 h-3" /> : s.step}
                            </span>
                            <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                              {s.title}
                            </h4>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {s.action && (
                              <button
                                onClick={s.action}
                                className="px-2.5 py-1 rounded-lg bg-[#8B14C2] hover:bg-[#720fa2] text-white text-[11px] font-bold transition-colors shadow-sm"
                              >
                                {s.actionLabel}
                              </button>
                            )}
                            <Link
                              href={s.targetRoute}
                              onClick={() => setIsOpen(false)}
                              className="px-2 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-700 dark:text-slate-300 text-[11px] font-semibold flex items-center gap-1 transition-colors"
                            >
                              <span>View</span>
                              <ExternalLink className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>

                        <p className="text-[11px] text-slate-600 dark:text-slate-400 pl-7">
                          {s.desc}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: FEATURE MAP */}
            {activeTab === 'features' && (
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 text-xs text-indigo-900 dark:text-indigo-200 flex items-start gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <p>
                    <strong>Complete Application Feature Directory:</strong> Click any feature below to inspect its dedicated page and controls in action!
                  </p>
                </div>

                {FEATURE_GROUPS.map((group) => (
                  <div key={group.name} className="space-y-2">
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-1">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                        {group.name}
                      </h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-semibold">
                        {group.role}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {group.items.map((feat) => {
                        const Icon = feat.icon
                        const isCurrentPage = pathname === feat.route
                        return (
                          <Link
                            key={feat.name}
                            href={feat.route}
                            onClick={() => setIsOpen(false)}
                            className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between group ${isCurrentPage ? 'bg-purple-50 dark:bg-purple-950/50 border-purple-300 dark:border-purple-700 shadow-sm' : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:border-purple-300 hover:bg-slate-100'}`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-6 h-6 rounded-lg bg-purple-100 dark:bg-purple-900/60 text-[#8B14C2] dark:text-purple-300 flex items-center justify-center shrink-0">
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#8B14C2] transition-colors leading-tight">
                                {feat.name}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2">
                              {feat.desc}
                            </p>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 3: CURRENT PAGE GUIDE */}
            {activeTab === 'context' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#27125B]/10 to-[#8B14C2]/10 border border-purple-200 dark:border-purple-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#8B14C2] text-white">
                      Current Route Context
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {pathname}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {currentRouteInfo.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {currentRouteInfo.description}
                  </p>

                  {currentRouteInfo.stepRelevance && (
                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-purple-900 text-xs">
                      <span className="text-[10px] font-bold text-[#8B14C2] uppercase block">
                        Lifecycle Step Alignment:
                      </span>
                      <strong className="text-slate-900 dark:text-white">
                        {currentRouteInfo.stepRelevance}
                      </strong>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Key Features Demonstrated Here:
                  </h4>
                  <div className="space-y-1.5">
                    {currentRouteInfo.features.map((f, i) => (
                      <div
                        key={i}
                        className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                  <strong className="block font-bold">Prototype Demonstration Tip:</strong>
                  <p>
                    All state mutations on this page occur instantly in React memory (`AffiliateDemoContext`). You can switch between Affiliate and Admin views at any time to verify real-time data sync!
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="p-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
            <span>SquadDeck Affiliate Prototype v1.0</span>
            <Link
              href="/demo"
              onClick={() => setIsOpen(false)}
              className="text-[#8B14C2] font-semibold hover:underline flex items-center gap-1"
            >
              <span>Full Demo Control Center</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
