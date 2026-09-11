'use client';

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import {
  Affiliate,
  Application,
  ReferralLink,
  ReferralClick,
  Referral,
  Customer,
  Commission,
  Payout,
  Coupon,
  Campaign,
  Tier,
  Bonus,
  FraudCase,
  MarketingAsset,
  Notification,
  AuditLog,
  CommissionRule,
  PlanType,
  PayoutMethod,
  AffiliateStatus,
  AffiliateTierName,
  CampaignStatus,
} from '@/types/affiliate';

import {
  INITIAL_AFFILIATES,
  INITIAL_APPLICATIONS,
  INITIAL_REFERRAL_LINKS,
  INITIAL_CUSTOMERS,
  INITIAL_REFERRALS,
  INITIAL_COMMISSIONS,
  INITIAL_PAYOUTS,
  INITIAL_COUPONS,
  INITIAL_CAMPAIGNS,
  INITIAL_TIERS,
  INITIAL_COMMISSION_RULES,
  INITIAL_BONUSES,
  INITIAL_FRAUD_CASES,
  INITIAL_MARKETING_ASSETS,
  INITIAL_NOTIFICATIONS,
  INITIAL_AUDIT_LOGS,
} from '@/lib/affiliate/mock-data';

import { useToast } from '@/context/toast-context';

export interface DemoWorkflowState {
  currentStep: number;
  selectedAffiliateId: string;
  referralClicksCount: number;
  simulatedOrgName: string;
  simulatedPlan: PlanType;
  simulatedCustomerCreated: boolean;
  simulatedCustomerId?: string;
  simulatedCommissionGenerated: boolean;
  simulatedCommissionId?: string;
  simulatedCommissionAmount: number;
  simulatedCommissionStatus?: string;
  simulatedPayoutRequested: boolean;
  simulatedPayoutId?: string;
  simulatedPayoutStatus?: string;
  simulatedRefundOccurred: boolean;
}

const INITIAL_DEMO_WORKFLOW: DemoWorkflowState = {
  currentStep: 1,
  selectedAffiliateId: 'aff-1',
  referralClicksCount: 0,
  simulatedOrgName: 'Riverside Basketball Club',
  simulatedPlan: 'Free',
  simulatedCustomerCreated: false,
  simulatedCustomerId: 'cust-1',
  simulatedCommissionGenerated: false,
  simulatedCommissionId: 'comm-101',
  simulatedCommissionAmount: 12.25,
  simulatedCommissionStatus: 'Payable',
  simulatedPayoutRequested: false,
  simulatedPayoutId: 'payout-1',
  simulatedPayoutStatus: 'Approved',
  simulatedRefundOccurred: false,
};

interface AffiliateDemoContextType {
  // State
  affiliates: Affiliate[];
  applications: Application[];
  referralLinks: ReferralLink[];
  referralClicks: ReferralClick[];
  referrals: Referral[];
  customers: Customer[];
  commissions: Commission[];
  payouts: Payout[];
  coupons: Coupon[];
  campaigns: Campaign[];
  tiers: Tier[];
  commissionRules: CommissionRule[];
  bonuses: Bonus[];
  fraudCases: FraudCase[];
  marketingAssets: MarketingAsset[];
  notifications: Notification[];
  auditLogs: AuditLog[];
  activeAffiliateId: string;
  activeAffiliate: Affiliate;
  demoWorkflow: DemoWorkflowState;

  // Setters & Navigation
  setActiveAffiliateId: (id: string) => void;
  setDemoWorkflow: React.Dispatch<React.SetStateAction<DemoWorkflowState>>;

  // Interactive Actions
  simulateReferralClick: (affiliateId?: string, linkId?: string) => void;
  simulateSignup: (affiliateId?: string, orgName?: string, contactName?: string, plan?: PlanType) => Customer;
  simulateUpgradeCustomer: (customerId?: string, newPlan?: PlanType) => void;
  simulateGenerateCommission: (customerId?: string, amount?: number, rate?: number) => Commission;
  approveCommission: (commissionId: string) => void;
  makeCommissionPayable: (commissionId: string) => void;
  requestPayout: (affiliateId: string, amount: number, method?: PayoutMethod, accountDetails?: string) => Payout;
  approvePayout: (payoutId: string) => void;
  markPayoutPaid: (payoutId: string) => void;
  simulateRefund: (commissionId?: string) => void;
  simulateAddDemoCustomer: (affiliateId?: string) => void;
  simulateCouponUsage: (couponId: string, orgName?: string) => void;

  // Management Actions
  approveApplication: (appId: string) => void;
  rejectApplication: (appId: string, reason?: string) => void;
  submitApplication: (data: Omit<Application, 'id' | 'status' | 'appliedDate'>) => void;
  createReferralLink: (data: Partial<ReferralLink>) => ReferralLink;
  deleteReferralLink: (linkId: string) => void;
  createCampaign: (data: Partial<Campaign>) => Campaign;
  updateCampaignStatus: (campaignId: string, status: CampaignStatus) => void;
  requestCoupon: (data: Partial<Coupon>) => Coupon;
  approveCoupon: (couponId: string) => void;
  resolveFraudCase: (caseId: string, action: 'Mark Safe' | 'Suspend Affiliate' | 'Ban Affiliate' | 'Reverse Commission') => void;
  updateAffiliateStatus: (affiliateId: string, status: AffiliateStatus) => void;
  updateAffiliateTier: (affiliateId: string, tier: AffiliateTierName) => void;
  updateCommissionRule: (ruleId: string, updates: Partial<CommissionRule>) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  resetDemo: () => void;
}

const AffiliateDemoContext = createContext<AffiliateDemoContextType | undefined>(undefined);

export function AffiliateDemoProvider({ children }: { children: React.ReactNode }) {
  const { showToast } = useToast();

  const [affiliates, setAffiliates] = useState<Affiliate[]>(INITIAL_AFFILIATES);
  const [applications, setApplications] = useState<Application[]>(INITIAL_APPLICATIONS);
  const [referralLinks, setReferralLinks] = useState<ReferralLink[]>(INITIAL_REFERRAL_LINKS);
  const [referralClicks, setReferralClicks] = useState<ReferralClick[]>([]);
  const [referrals, setReferrals] = useState<Referral[]>(INITIAL_REFERRALS);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [commissions, setCommissions] = useState<Commission[]>(INITIAL_COMMISSIONS);
  const [payouts, setPayouts] = useState<Payout[]>(INITIAL_PAYOUTS);
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [tiers, setTiers] = useState<Tier[]>(INITIAL_TIERS);
  const [commissionRules, setCommissionRules] = useState<CommissionRule[]>(INITIAL_COMMISSION_RULES);
  const [bonuses, setBonuses] = useState<Bonus[]>(INITIAL_BONUSES);
  const [fraudCases, setFraudCases] = useState<FraudCase[]>(INITIAL_FRAUD_CASES);
  const [marketingAssets] = useState<MarketingAsset[]>(INITIAL_MARKETING_ASSETS);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);

  const [activeAffiliateId, setActiveAffiliateId] = useState<string>('aff-1');
  const [demoWorkflow, setDemoWorkflow] = useState<DemoWorkflowState>(INITIAL_DEMO_WORKFLOW);

  const activeAffiliate = useMemo(() => {
    return affiliates.find((a) => a.id === activeAffiliateId) || affiliates[0];
  }, [affiliates, activeAffiliateId]);

  // Helper to add audit log
  const addAuditLog = useCallback((log: Omit<AuditLog, 'id' | 'timestamp'>) => {
    const newLog: AuditLog = {
      ...log,
      id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  }, []);

  // Helper to add notification
  const addNotification = useCallback((notif: Omit<Notification, 'id' | 'date' | 'read'>) => {
    const newNotif: Notification = {
      ...notif,
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  }, []);

  // 1. Simulate Referral Click
  const simulateReferralClick = useCallback((affiliateId = 'aff-1', linkId = 'link-1') => {
    const aff = affiliates.find((a) => a.id === affiliateId) || affiliates[0];
    const newClick: ReferralClick = {
      id: `click-${Date.now()}`,
      affiliateId: aff.id,
      linkId,
      ipAddress: `73.${Math.floor(Math.random() * 200)}.${Math.floor(Math.random() * 200)}.${Math.floor(Math.random() * 200)}`,
      country: aff.country || 'United States',
      device: 'Chrome 122 on macOS',
      referrerUrl: 'https://youtube.com/watch?v=squaddeck-hoops',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };

    setReferralClicks((prev) => [newClick, ...prev]);

    setReferralLinks((prev) =>
      prev.map((l) => (l.id === linkId ? { ...l, clicks: l.clicks + 1 } : l))
    );

    setAffiliates((prev) =>
      prev.map((a) =>
        a.id === aff.id
          ? {
              ...a,
              stats: {
                ...a.stats,
                totalClicks: a.stats.totalClicks + 1,
                conversionRate: Number(((a.stats.paidCustomers / (a.stats.totalClicks + 1))).toFixed(4)),
              },
            }
          : a
      )
    );

    setDemoWorkflow((prev) => ({
      ...prev,
      currentStep: Math.max(prev.currentStep, 2),
      referralClicksCount: prev.referralClicksCount + 1,
    }));

    addAuditLog({
      user: 'Visitor',
      action: 'Referral Link Clicked',
      entity: 'ReferralClick',
      entityId: newClick.id,
      newValue: `Click recorded for ${aff.name} (${aff.referralCode})`,
      reason: 'User clicked tracking referral URL',
    });

    showToast('✓ Referral click recorded', `Click attribution logged for ${aff.name} (+1 Click)`, 'success');
  }, [affiliates, addAuditLog, showToast]);

  // 2. Simulate Signup
  const simulateSignup = useCallback(
    (affiliateId = 'aff-1', orgName = 'Riverside Basketball Club', contactName = 'Marcus Evans', plan: PlanType = 'Free') => {
      const aff = affiliates.find((a) => a.id === affiliateId) || affiliates[0];
      const customerId = `cust-${Date.now()}`;
      const referralId = `ref-${Date.now()}`;

      const newCustomer: Customer = {
        id: customerId,
        orgName,
        contactName,
        email: `${contactName.toLowerCase().replace(/\s+/g, '.')}@${orgName.toLowerCase().replace(/[^a-z0-9]/g, '')}.org`,
        plan,
        signupDate: new Date().toISOString().substring(0, 10),
        subscriptionStatus: 'Trial',
        monthlyRevenue: 0,
        lifetimeRevenue: 0,
        commissionEarned: 0,
        affiliateId: aff.id,
        affiliateName: aff.name,
        attribution: `Last Touch (Code: ${aff.referralCode})`,
        campaign: 'Summer Sports Campaign',
        coupon: 'SQUADJAMES20',
        paymentHistory: [],
        commissionHistory: [],
      };

      const newReferral: Referral = {
        id: referralId,
        affiliateId: aff.id,
        affiliateName: aff.name,
        customerName: contactName,
        orgName,
        email: newCustomer.email,
        clickDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
        signupDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
        plan,
        status: 'Signed Up',
        revenue: 0,
        commission: 0,
        attributionType: 'Last Touch (90-day window)',
        campaign: 'Summer Sports Campaign',
        coupon: 'SQUADJAMES20',
        country: aff.country || 'United States',
        lifecycleStep: 3,
      };

      setCustomers((prev) => [newCustomer, ...prev]);
      setReferrals((prev) => [newReferral, ...prev]);

      setAffiliates((prev) =>
        prev.map((a) =>
          a.id === aff.id
            ? {
                ...a,
                stats: {
                  ...a.stats,
                  signups: a.stats.signups + 1,
                },
              }
            : a
        )
      );

      setDemoWorkflow((prev) => ({
        ...prev,
        currentStep: Math.max(prev.currentStep, 3),
        simulatedOrgName: orgName,
        simulatedPlan: plan,
        simulatedCustomerCreated: true,
        simulatedCustomerId: customerId,
      }));

      addAuditLog({
        user: contactName,
        action: 'Account Created via Referral',
        entity: 'Customer',
        entityId: customerId,
        newValue: `${orgName} (Plan: Free) attributed to ${aff.name}`,
        reason: 'Free account signup via referral link',
      });

      addNotification({
        title: 'New referral signed up!',
        description: `${orgName} created a free account via your referral link.`,
        type: 'success',
        link: '/affiliate/referrals',
      });

      showToast('✓ Signup Completed', `${orgName} created account with Free Plan`, 'success');
      return newCustomer;
    },
    [affiliates, addAuditLog, addNotification, showToast]
  );

  // 3. Simulate Upgrade Customer to Pro
  const simulateUpgradeCustomer = useCallback(
    (customerId?: string, newPlan: PlanType = 'Pro') => {
      const targetId = customerId || demoWorkflow.simulatedCustomerId || 'cust-1';
      const monthlyRev = newPlan === 'Pro' ? 49 : newPlan === 'Starter' ? 19 : 0;

      setCustomers((prev) =>
        prev.map((c) => {
          if (c.id === targetId || (customerId === undefined && c.id === 'cust-1')) {
            const paymentId = `pay-${Date.now()}`;
            return {
              ...c,
              plan: newPlan,
              subscriptionStatus: 'Active',
              monthlyRevenue: monthlyRev,
              lifetimeRevenue: c.lifetimeRevenue + monthlyRev,
              paymentHistory: [
                {
                  id: paymentId,
                  date: new Date().toISOString().substring(0, 10),
                  amount: monthlyRev,
                  plan: newPlan,
                  status: 'Paid',
                },
                ...c.paymentHistory,
              ],
            };
          }
          return c;
        })
      );

      setReferrals((prev) =>
        prev.map((r) =>
          r.orgName === demoWorkflow.simulatedOrgName || r.id === 'ref-1'
            ? { ...r, plan: newPlan, status: 'Paid', revenue: r.revenue + monthlyRev, lifecycleStep: 4 }
            : r
        )
      );

      setAffiliates((prev) =>
        prev.map((a) =>
          a.id === 'aff-1'
            ? {
                ...a,
                stats: {
                  ...a.stats,
                  totalRevenue: a.stats.totalRevenue + monthlyRev,
                },
              }
            : a
        )
      );

      setDemoWorkflow((prev) => ({
        ...prev,
        currentStep: Math.max(prev.currentStep, 4),
        simulatedPlan: newPlan,
      }));

      addAuditLog({
        user: 'Customer Admin',
        action: 'Upgraded Subscription to Pro',
        entity: 'Customer',
        entityId: targetId,
        previousValue: 'Plan: Free ($0/mo)',
        newValue: `Plan: ${newPlan} ($${monthlyRev}/mo)`,
        reason: 'Customer upgraded to paid tier',
      });

      addNotification({
        title: 'Customer upgraded to Pro!',
        description: `Riverside Basketball Club upgraded to Pro Plan ($49/month).`,
        type: 'success',
        link: '/affiliate/customers',
      });

      showToast('✓ Customer Upgraded', `Plan: ${newPlan} ($${monthlyRev}/mo)`, 'success');
    },
    [demoWorkflow, addAuditLog, addNotification, showToast]
  );

  // 4. Generate Commission
  const simulateGenerateCommission = useCallback(
    (customerId = 'cust-1', baseAmount = 49, rate = 0.25) => {
      const commAmount = Number((baseAmount * rate).toFixed(2));
      const commissionId = `comm-demo-${Date.now()}`;

      const newCommission: Commission = {
        id: commissionId,
        affiliateId: 'aff-1',
        affiliateName: 'James Wilson',
        customerId,
        customerName: 'Marcus Evans',
        orgName: 'Riverside Basketball Club',
        plan: 'Pro',
        type: 'Recurring',
        baseAmount,
        rate,
        amount: commAmount,
        status: 'Pending',
        date: new Date().toISOString().substring(0, 10),
        reference: `COMM-DEMO-${Math.floor(1000 + Math.random() * 9000)}`,
        note: `Generated on Pro subscription payment ($49 * 25%)`,
      };

      setCommissions((prev) => [newCommission, ...prev]);

      setCustomers((prev) =>
        prev.map((c) =>
          c.id === customerId
            ? {
                ...c,
                commissionEarned: c.commissionEarned + commAmount,
                commissionHistory: [
                  {
                    id: commissionId,
                    date: newCommission.date,
                    amount: commAmount,
                    status: 'Pending',
                  },
                  ...c.commissionHistory,
                ],
              }
            : c
        )
      );

      setAffiliates((prev) =>
        prev.map((a) =>
          a.id === 'aff-1'
            ? {
                ...a,
                stats: {
                  ...a.stats,
                  pendingCommission: a.stats.pendingCommission + commAmount,
                },
              }
            : a
        )
      );

      setDemoWorkflow((prev) => ({
        ...prev,
        currentStep: Math.max(prev.currentStep, 5),
        simulatedCommissionGenerated: true,
        simulatedCommissionId: commissionId,
        simulatedCommissionAmount: commAmount,
        simulatedCommissionStatus: 'Pending',
      }));

      addAuditLog({
        user: 'Billing Engine',
        action: 'Generated Commission Transaction',
        entity: 'Commission',
        entityId: commissionId,
        newValue: `$${commAmount} (Pending) — $49 × 25%`,
        reason: 'Subscription charge successful; commission calculated',
      });

      addNotification({
        title: 'Commission Generated',
        description: `$${commAmount} pending commission for Riverside Basketball Club.`,
        type: 'info',
        link: '/affiliate/commissions',
      });

      showToast('✓ Commission Generated', `$49 × 25% = $${commAmount} (Status: Pending)`, 'info');
      return newCommission;
    },
    [addAuditLog, addNotification, showToast]
  );

  // 5. Approve Commission
  const approveCommission = useCallback(
    (commissionId: string) => {
      setCommissions((prev) =>
        prev.map((c) => (c.id === commissionId ? { ...c, status: 'Approved' } : c))
      );

      setDemoWorkflow((prev) => ({
        ...prev,
        currentStep: Math.max(prev.currentStep, 6),
        simulatedCommissionStatus: 'Approved',
      }));

      addAuditLog({
        user: 'Admin (Sarah Connor)',
        action: 'Approved Commission',
        entity: 'Commission',
        entityId: commissionId,
        previousValue: 'Status: Pending',
        newValue: 'Status: Approved',
        reason: 'Payment validated without dispute',
      });

      addNotification({
        title: 'Commission Approved',
        description: 'Your commission of $12.25 was approved by admin.',
        type: 'success',
        link: '/affiliate/commissions',
      });

      showToast('✓ Commission Approved', 'Status updated to Approved', 'success');
    },
    [addAuditLog, addNotification, showToast]
  );

  // 6. Make Commission Payable
  const makeCommissionPayable = useCallback(
    (commissionId: string) => {
      let commAmount = 12.25;
      setCommissions((prev) =>
        prev.map((c) => {
          if (c.id === commissionId) {
            commAmount = c.amount;
            return { ...c, status: 'Payable' };
          }
          return c;
        })
      );

      setAffiliates((prev) =>
        prev.map((a) =>
          a.id === 'aff-1'
            ? {
                ...a,
                stats: {
                  ...a.stats,
                  pendingCommission: Math.max(0, a.stats.pendingCommission - commAmount),
                  payableCommission: a.stats.payableCommission + commAmount,
                  currentBalance: a.stats.currentBalance + commAmount,
                },
              }
            : a
        )
      );

      setDemoWorkflow((prev) => ({
        ...prev,
        currentStep: Math.max(prev.currentStep, 7),
        simulatedCommissionStatus: 'Payable',
      }));

      addAuditLog({
        user: 'System Bot',
        action: 'Made Commission Payable',
        entity: 'Commission',
        entityId: commissionId,
        previousValue: 'Status: Approved',
        newValue: 'Status: Payable',
        reason: 'Hold period completed; commission available for withdrawal',
      });

      addNotification({
        title: 'Commission Payable!',
        description: `$${commAmount} is now ready to be withdrawn in your payouts tab.`,
        type: 'success',
        link: '/affiliate/payouts',
      });

      showToast('✓ Commission Payable', 'Commission moved to Available Balance', 'success');
    },
    [addAuditLog, addNotification, showToast]
  );

  // 7. Request Payout
  const requestPayout = useCallback(
    (affiliateId = 'aff-1', amount = 720.0, method: PayoutMethod = 'PayPal', accountDetails = 'PayPal: james.wilson@coachhub.io') => {
      const aff = affiliates.find((a) => a.id === affiliateId) || affiliates[0];
      const payoutId = `payout-${Date.now()}`;

      const newPayout: Payout = {
        id: payoutId,
        affiliateId: aff.id,
        affiliateName: aff.name,
        amount,
        method,
        requestedDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
        status: 'Pending',
        reference: `PAY-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        accountDetails,
        note: 'Requested withdrawal from available balance',
      };

      setPayouts((prev) => [newPayout, ...prev]);

      setAffiliates((prev) =>
        prev.map((a) =>
          a.id === aff.id
            ? {
                ...a,
                stats: {
                  ...a.stats,
                  payableCommission: Math.max(0, a.stats.payableCommission - amount),
                  currentBalance: Math.max(0, a.stats.currentBalance - amount),
                },
              }
            : a
        )
      );

      setDemoWorkflow((prev) => ({
        ...prev,
        currentStep: Math.max(prev.currentStep, 8),
        simulatedPayoutRequested: true,
        simulatedPayoutId: payoutId,
        simulatedPayoutStatus: 'Pending',
      }));

      addAuditLog({
        user: aff.name,
        action: 'Payout Requested',
        entity: 'Payout',
        entityId: payoutId,
        newValue: `$${amount.toFixed(2)} via ${method}`,
        reason: 'Affiliate requested balance withdrawal',
      });

      addNotification({
        title: 'Payout requested',
        description: `Your payout of $${amount.toFixed(2)} has been submitted for admin review.`,
        type: 'info',
        link: '/affiliate/payouts',
      });

      showToast('✓ Payout Requested', `$${amount.toFixed(2)} submitted for admin approval`, 'info');
      return newPayout;
    },
    [affiliates, addAuditLog, addNotification, showToast]
  );

  // 8. Approve Payout
  const approvePayout = useCallback(
    (payoutId: string) => {
      setPayouts((prev) =>
        prev.map((p) => (p.id === payoutId ? { ...p, status: 'Approved' } : p))
      );

      setDemoWorkflow((prev) => ({
        ...prev,
        currentStep: Math.max(prev.currentStep, 9),
        simulatedPayoutStatus: 'Approved',
      }));

      addAuditLog({
        user: 'Admin (Finance)',
        action: 'Approved Payout Request',
        entity: 'Payout',
        entityId: payoutId,
        previousValue: 'Status: Pending Review',
        newValue: 'Status: Approved',
        reason: 'Verified affiliate balance and payment details',
      });

      addNotification({
        title: 'Payout Approved',
        description: 'Admin approved your payout request. Processing disbursement.',
        type: 'success',
        link: '/affiliate/payouts',
      });

      showToast('✓ Payout Approved', 'Payout moved to Approved status', 'success');
    },
    [addAuditLog, addNotification, showToast]
  );

  // 9. Mark Payout Paid
  const markPayoutPaid = useCallback(
    (payoutId: string) => {
      let paidAmount = 720;
      setPayouts((prev) =>
        prev.map((p) => {
          if (p.id === payoutId) {
            paidAmount = p.amount;
            return {
              ...p,
              status: 'Paid',
              processedDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
            };
          }
          return p;
        })
      );

      setCommissions((prev) =>
        prev.map((c) =>
          c.affiliateId === 'aff-1' && c.status === 'Payable' ? { ...c, status: 'Paid' } : c
        )
      );

      setAffiliates((prev) =>
        prev.map((a) =>
          a.id === 'aff-1'
            ? {
                ...a,
                stats: {
                  ...a.stats,
                  totalEarned: a.stats.totalEarned + paidAmount,
                },
              }
            : a
        )
      );

      setDemoWorkflow((prev) => ({
        ...prev,
        currentStep: Math.max(prev.currentStep, 10),
        simulatedPayoutStatus: 'Paid',
      }));

      addAuditLog({
        user: 'Admin (Disbursement System)',
        action: 'Disbursed Payout',
        entity: 'Payout',
        entityId: payoutId,
        previousValue: 'Status: Approved',
        newValue: 'Status: Paid',
        reason: 'Payment sent to affiliate account',
      });

      addNotification({
        title: 'Payout Paid!',
        description: `Your payout of $${paidAmount.toFixed(2)} was successfully transferred.`,
        type: 'payout',
        link: '/affiliate/payouts',
      });

      showToast('✓ Payout Paid', `$${paidAmount.toFixed(2)} marked as Paid to affiliate`, 'success');
    },
    [addAuditLog, addNotification, showToast]
  );

  // 10. Simulate Refund & Commission Reversal
  const simulateRefund = useCallback(
    (commissionId = 'comm-101') => {
      const reversalId = `rev-${Date.now()}`;
      const reversalAmount = -12.25;

      const reversalComm: Commission = {
        id: reversalId,
        affiliateId: 'aff-1',
        affiliateName: 'James Wilson',
        customerId: 'cust-1',
        customerName: 'Marcus Evans',
        orgName: 'Riverside Basketball Club',
        plan: 'Pro',
        type: 'Reversal',
        baseAmount: -49,
        rate: 0.25,
        amount: reversalAmount,
        status: 'Reversed',
        date: new Date().toISOString().substring(0, 10),
        reference: `COMM-REV-REVERSAL-${Math.floor(1000 + Math.random() * 9000)}`,
        note: 'Customer subscription refunded; commission clawed back',
      };

      setCommissions((prev) => [
        reversalComm,
        ...prev.map((c) => (c.id === commissionId ? { ...c, status: 'Reversed' as const } : c)),
      ]);

      setCustomers((prev) =>
        prev.map((c) =>
          c.id === 'cust-1'
            ? {
                ...c,
                subscriptionStatus: 'Cancelled',
                lifetimeRevenue: Math.max(0, c.lifetimeRevenue - 49),
                commissionEarned: Math.max(0, c.commissionEarned - 12.25),
                paymentHistory: [
                  {
                    id: `pay-refund-${Date.now()}`,
                    date: new Date().toISOString().substring(0, 10),
                    amount: -49,
                    plan: 'Pro',
                    status: 'Refunded',
                  },
                  ...c.paymentHistory,
                ],
              }
            : c
        )
      );

      setAffiliates((prev) =>
        prev.map((a) =>
          a.id === 'aff-1'
            ? {
                ...a,
                stats: {
                  ...a.stats,
                  payableCommission: Math.max(0, a.stats.payableCommission - 12.25),
                  currentBalance: Math.max(0, a.stats.currentBalance - 12.25),
                  totalRevenue: Math.max(0, a.stats.totalRevenue - 49),
                },
              }
            : a
        )
      );

      setDemoWorkflow((prev) => ({
        ...prev,
        simulatedRefundOccurred: true,
        simulatedCommissionStatus: 'Reversed',
      }));

      addAuditLog({
        user: 'Billing Support',
        action: 'Reversed Commission on Customer Refund',
        entity: 'Commission',
        entityId: reversalId,
        previousValue: 'Commission: $12.25 (Approved)',
        newValue: 'Commission: -$12.25 (Reversed)',
        reason: 'Customer requested 30-day money-back refund',
      });

      addNotification({
        title: 'Commission Reversed',
        description: 'A $12.25 commission was reversed due to a customer refund on Riverside Basketball Club.',
        type: 'warning',
        link: '/affiliate/commissions',
      });

      showToast('⚠️ Refund Simulated', 'Commission reversed: -$12.25 (Status: Reversed)', 'warning');
    },
    [addAuditLog, addNotification, showToast]
  );

  // 11. Simulate Add Demo Customer & Tier Elevation (24 -> 25 customers unlocks Gold Tier 30%)
  const simulateAddDemoCustomer = useCallback(
    (affiliateId = 'aff-1') => {
      const aff = affiliates.find((a) => a.id === affiliateId) || affiliates[0];
      const nextCustomerCount = aff.stats.paidCustomers + 1;
      const isGoldTier = nextCustomerCount >= 25;

      setAffiliates((prev) =>
        prev.map((a) =>
          a.id === aff.id
            ? {
                ...a,
                tier: isGoldTier ? 'Gold' : a.tier,
                stats: {
                  ...a.stats,
                  paidCustomers: nextCustomerCount,
                  totalRevenue: a.stats.totalRevenue + 49,
                  pendingCommission: a.stats.pendingCommission + (isGoldTier ? 14.7 : 12.25),
                },
              }
            : a
        )
      );

      setBonuses((prev) =>
        prev.map((b) =>
          b.id === 'bon-3'
            ? { ...b, progress: nextCustomerCount, achieved: isGoldTier }
            : b.id === 'bon-1'
            ? { ...b, progress: Math.min(10, b.progress + 1) }
            : b
        )
      );

      addAuditLog({
        user: 'Affiliate Growth Bot',
        action: isGoldTier ? 'Affiliate Elevated to Gold Tier' : 'Demo Customer Added',
        entity: 'Affiliate',
        entityId: aff.id,
        previousValue: `Customers: ${aff.stats.paidCustomers}, Tier: ${aff.tier}`,
        newValue: `Customers: ${nextCustomerCount}, Tier: ${isGoldTier ? 'Gold (30% Commission)' : aff.tier}`,
        reason: isGoldTier ? 'Reached 25 paying customer milestone!' : 'New demo customer simulated',
      });

      if (isGoldTier) {
        addNotification({
          title: '🎉 You Reached Gold Tier!',
          description: 'Congratulations! Your commission rate has been upgraded from 25% to 30%.',
          type: 'tier',
          link: '/affiliate/dashboard',
        });
        showToast('🎉 Affiliate Upgraded to Gold!', 'Customers: 25 | Commission: 25% → 30%', 'success');
      } else {
        showToast('✓ Demo Customer Added', `Total Paid Customers: ${nextCustomerCount}/25`, 'success');
      }
    },
    [affiliates, addAuditLog, addNotification, showToast]
  );

  // 12. Simulate Coupon Usage
  const simulateCouponUsage = useCallback(
    (couponId: string, orgName = 'Metro Soccer Club') => {
      setCoupons((prev) =>
        prev.map((c) =>
          c.id === couponId
            ? {
                ...c,
                usageCount: c.usageCount + 1,
                customersReferred: c.customersReferred + 1,
                revenueGenerated: c.revenueGenerated + 49,
                commissionGenerated: c.commissionGenerated + 12.25,
              }
            : c
        )
      );

      addAuditLog({
        user: 'Customer Checkout',
        action: 'Applied Coupon Code',
        entity: 'Coupon',
        entityId: couponId,
        newValue: `Redeemed by ${orgName}`,
        reason: 'Checkout discount applied',
      });

      addNotification({
        title: 'Coupon Redeemed',
        description: `Coupon was used by ${orgName} during checkout.`,
        type: 'info',
        link: '/affiliate/coupons',
      });

      showToast('✓ Coupon Used', `Coupon redeemed for ${orgName}`, 'success');
    },
    [addAuditLog, addNotification, showToast]
  );

  // Management actions
  const approveApplication = useCallback(
    (appId: string) => {
      const app = applications.find((a) => a.id === appId);
      if (!app) return;

      setApplications((prev) =>
        prev.map((a) => (a.id === appId ? { ...a, status: 'Approved' } : a))
      );

      const newAffiliateId = `aff-${Date.now()}`;
      const code = app.applicantName.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 8) + '10';

      const newAffiliate: Affiliate = {
        id: newAffiliateId,
        name: app.applicantName,
        email: app.email,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        company: app.company,
        website: app.website,
        phone: app.phone,
        country: app.country,
        socialLinks: {},
        promotionalChannels: [app.promotionalChannel],
        referralCode: code,
        tier: 'Bronze',
        status: 'Active',
        joinDate: new Date().toISOString().substring(0, 10),
        payoutMethod: 'PayPal',
        payoutDetails: app.email,
        stats: {
          totalClicks: 0,
          signups: 0,
          paidCustomers: 0,
          conversionRate: 0,
          totalRevenue: 0,
          pendingCommission: 0,
          payableCommission: 0,
          totalEarned: 0,
          currentBalance: 0,
        },
      };

      setAffiliates((prev) => [newAffiliate, ...prev]);

      addAuditLog({
        user: 'Admin',
        action: 'Approved Affiliate Application',
        entity: 'Application',
        entityId: appId,
        previousValue: 'Status: Pending',
        newValue: `Status: Approved (Affiliate ID: ${newAffiliateId}, Code: ${code})`,
        reason: 'Application verified and approved by admin',
      });

      addNotification({
        title: 'Affiliate Approved',
        description: `${app.applicantName} was approved and assigned referral code ${code}.`,
        type: 'success',
      });

      showToast('✓ Affiliate Approved', `${app.applicantName} is now an Active Affiliate`, 'success');
    },
    [applications, addAuditLog, addNotification, showToast]
  );

  const rejectApplication = useCallback(
    (appId: string, reason = 'Did not meet audience threshold requirements') => {
      const app = applications.find((a) => a.id === appId);
      setApplications((prev) =>
        prev.map((a) => (a.id === appId ? { ...a, status: 'Rejected', reviewNotes: reason } : a))
      );

      addAuditLog({
        user: 'Admin',
        action: 'Rejected Affiliate Application',
        entity: 'Application',
        entityId: appId,
        previousValue: 'Status: Pending',
        newValue: 'Status: Rejected',
        reason,
      });

      showToast('Application Rejected', `${app?.applicantName || 'Applicant'} status updated to Rejected`, 'warning');
    },
    [applications, addAuditLog, showToast]
  );

  const submitApplication = useCallback(
    (data: Omit<Application, 'id' | 'status' | 'appliedDate'>) => {
      const newApp: Application = {
        ...data,
        id: `app-${Date.now()}`,
        status: 'Pending',
        appliedDate: new Date().toISOString().substring(0, 10),
      };

      setApplications((prev) => [newApp, ...prev]);

      addAuditLog({
        user: data.applicantName,
        action: 'Submitted Affiliate Application',
        entity: 'Application',
        entityId: newApp.id,
        newValue: `Pending Review (${data.company})`,
        reason: 'Public form submission',
      });

      addNotification({
        title: 'New Application Received',
        description: `${data.applicantName} applied for the SquadDeck Affiliate Program.`,
        type: 'info',
        link: '/admin/affiliates/applications',
      });

      showToast('✓ Application Submitted', 'Your application is now under admin review', 'success');
    },
    [addAuditLog, addNotification, showToast]
  );

  const createReferralLink = useCallback(
    (data: Partial<ReferralLink>) => {
      const newLink: ReferralLink = {
        id: `link-${Date.now()}`,
        affiliateId: data.affiliateId || activeAffiliateId,
        name: data.name || 'Custom Promo Link',
        code: data.code || `REF${Math.floor(100 + Math.random() * 900)}`,
        url: `https://squaddeck.com/join?ref=${data.code || 'REF'}`,
        landingPage: data.landingPage || '/',
        campaignId: data.campaignId,
        utmSource: data.utmSource || 'affiliate',
        utmMedium: data.utmMedium || 'web',
        utmCampaign: data.utmCampaign || 'custom',
        clicks: 0,
        signups: 0,
        customers: 0,
        revenue: 0,
        commission: 0,
        status: 'Active',
        createdAt: new Date().toISOString().substring(0, 10),
      };

      setReferralLinks((prev) => [newLink, ...prev]);

      addAuditLog({
        user: activeAffiliate.name,
        action: 'Created Referral Link',
        entity: 'ReferralLink',
        entityId: newLink.id,
        newValue: `${newLink.name} (${newLink.code})`,
        reason: 'New tracking link created',
      });

      showToast('✓ Referral Link Created', `Code: ${newLink.code}`, 'success');
      return newLink;
    },
    [activeAffiliateId, activeAffiliate, addAuditLog, showToast]
  );

  const deleteReferralLink = useCallback(
    (linkId: string) => {
      setReferralLinks((prev) => prev.filter((l) => l.id !== linkId));
      showToast('Referral Link Deleted', 'The link was removed from your account', 'info');
    },
    [showToast]
  );

  const createCampaign = useCallback(
    (data: Partial<Campaign>) => {
      const newCampaign: Campaign = {
        id: `camp-${Date.now()}`,
        name: data.name || 'New Campaign',
        description: data.description || '',
        status: data.status || 'Active',
        startDate: data.startDate || new Date().toISOString().substring(0, 10),
        endDate: data.endDate || '2026-12-31',
        clicks: 0,
        signups: 0,
        customers: 0,
        revenue: 0,
        commission: 0,
        assignedAffiliates: data.assignedAffiliates || ['aff-1'],
      };

      setCampaigns((prev) => [newCampaign, ...prev]);
      showToast('✓ Campaign Created', `${newCampaign.name} is now active`, 'success');
      return newCampaign;
    },
    [showToast]
  );

  const updateCampaignStatus = useCallback(
    (campaignId: string, status: CampaignStatus) => {
      setCampaigns((prev) =>
        prev.map((c) => (c.id === campaignId ? { ...c, status } : c))
      );
      showToast('Campaign Status Updated', `Status changed to ${status}`, 'info');
    },
    [showToast]
  );

  const requestCoupon = useCallback(
    (data: Partial<Coupon>) => {
      const newCoupon: Coupon = {
        id: `coup-${Date.now()}`,
        code: (data.code || 'COUPON20').toUpperCase(),
        discount: data.discount || '20% OFF First 3 Months',
        discountPercent: data.discountPercent || 20,
        affiliateId: data.affiliateId || activeAffiliateId,
        affiliateName: activeAffiliate.name,
        usageCount: 0,
        customersReferred: 0,
        revenueGenerated: 0,
        commissionGenerated: 0,
        expirationDate: data.expirationDate || '2026-12-31',
        status: 'Pending',
        description: data.description || 'Affiliate requested custom promo coupon',
      };

      setCoupons((prev) => [newCoupon, ...prev]);

      addAuditLog({
        user: activeAffiliate.name,
        action: 'Requested Custom Coupon',
        entity: 'Coupon',
        entityId: newCoupon.id,
        newValue: `${newCoupon.code} (${newCoupon.discount})`,
        reason: 'Submitted for admin approval',
      });

      addNotification({
        title: 'Coupon Request Submitted',
        description: `Your request for code ${newCoupon.code} has been sent for admin review.`,
        type: 'info',
        link: '/affiliate/coupons',
      });

      showToast('✓ Coupon Requested', `Code ${newCoupon.code} is pending admin approval`, 'info');
      return newCoupon;
    },
    [activeAffiliateId, activeAffiliate, addAuditLog, addNotification, showToast]
  );

  const approveCoupon = useCallback(
    (couponId: string) => {
      setCoupons((prev) =>
        prev.map((c) => (c.id === couponId ? { ...c, status: 'Active' } : c))
      );
      showToast('✓ Coupon Approved', 'Coupon is now active for customer use', 'success');
    },
    [showToast]
  );

  const resolveFraudCase = useCallback(
    (caseId: string, action: 'Mark Safe' | 'Suspend Affiliate' | 'Ban Affiliate' | 'Reverse Commission') => {
      const fCase = fraudCases.find((f) => f.id === caseId);
      if (!fCase) return;

      const newStatus = action === 'Mark Safe' ? 'Resolved Safe' : action === 'Suspend Affiliate' ? 'Suspended' : 'Confirmed Fraud';

      setFraudCases((prev) =>
        prev.map((f) => (f.id === caseId ? { ...f, status: newStatus } : f))
      );

      if (action === 'Suspend Affiliate') {
        setAffiliates((prev) =>
          prev.map((a) => (a.id === fCase.affiliateId ? { ...a, status: 'Suspended' } : a))
        );
      } else if (action === 'Ban Affiliate') {
        setAffiliates((prev) =>
          prev.map((a) => (a.id === fCase.affiliateId ? { ...a, status: 'Banned' } : a))
        );
      } else if (action === 'Reverse Commission' && fCase.commissionAmount) {
        setCommissions((prev) => [
          {
            id: `fraud-rev-${Date.now()}`,
            affiliateId: fCase.affiliateId,
            affiliateName: fCase.affiliateName,
            customerId: 'cust-1',
            customerName: 'Flagged Customer',
            orgName: fCase.orgName || 'Flagged Entity',
            plan: 'Pro',
            type: 'Reversal',
            baseAmount: -49,
            rate: 0.25,
            amount: -(fCase.commissionAmount || 12.25),
            status: 'Reversed',
            date: new Date().toISOString().substring(0, 10),
            reference: 'FRAUD-CLAWBACK',
            note: `Clawback due to fraud case: ${fCase.type}`,
          },
          ...prev,
        ]);
      }

      addAuditLog({
        user: 'Admin (Security)',
        action: `Fraud Case Resolution: ${action}`,
        entity: 'FraudCase',
        entityId: caseId,
        newValue: `Status: ${newStatus}`,
        reason: `Action taken on ${fCase.type} incident for ${fCase.affiliateName}`,
      });

      showToast(`✓ Case Updated: ${action}`, `Fraud case marked as ${newStatus}`, 'info');
    },
    [fraudCases, addAuditLog, showToast]
  );

  const updateAffiliateStatus = useCallback(
    (affiliateId: string, status: AffiliateStatus) => {
      setAffiliates((prev) =>
        prev.map((a) => (a.id === affiliateId ? { ...a, status } : a))
      );
      addAuditLog({
        user: 'Admin',
        action: 'Updated Affiliate Status',
        entity: 'Affiliate',
        entityId: affiliateId,
        newValue: `Status: ${status}`,
        reason: 'Manual admin status change',
      });
      showToast('Affiliate Status Updated', `Status changed to ${status}`, 'info');
    },
    [addAuditLog, showToast]
  );

  const updateAffiliateTier = useCallback(
    (affiliateId: string, tier: AffiliateTierName) => {
      setAffiliates((prev) =>
        prev.map((a) => (a.id === affiliateId ? { ...a, tier } : a))
      );
      addAuditLog({
        user: 'Admin',
        action: 'Updated Affiliate Tier',
        entity: 'Affiliate',
        entityId: affiliateId,
        newValue: `Tier: ${tier}`,
        reason: 'Manual tier override',
      });
      showToast('Affiliate Tier Updated', `Tier changed to ${tier}`, 'info');
    },
    [addAuditLog, showToast]
  );

  const updateCommissionRule = useCallback(
    (ruleId: string, updates: Partial<CommissionRule>) => {
      setCommissionRules((prev) =>
        prev.map((r) => (r.id === ruleId ? { ...r, ...updates } : r))
      );
      showToast('Commission Rule Updated', 'Rates saved to frontend state', 'success');
    },
    [showToast]
  );

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All Notifications Marked as Read', undefined, 'info');
  }, [showToast]);

  // Complete Reset of Demo State
  const resetDemo = useCallback(() => {
    setAffiliates(INITIAL_AFFILIATES);
    setApplications(INITIAL_APPLICATIONS);
    setReferralLinks(INITIAL_REFERRAL_LINKS);
    setReferralClicks([]);
    setCustomers(INITIAL_CUSTOMERS);
    setReferrals(INITIAL_REFERRALS);
    setCommissions(INITIAL_COMMISSIONS);
    setPayouts(INITIAL_PAYOUTS);
    setCoupons(INITIAL_COUPONS);
    setCampaigns(INITIAL_CAMPAIGNS);
    setTiers(INITIAL_TIERS);
    setCommissionRules(INITIAL_COMMISSION_RULES);
    setBonuses(INITIAL_BONUSES);
    setFraudCases(INITIAL_FRAUD_CASES);
    setNotifications(INITIAL_NOTIFICATIONS);
    setAuditLogs([
      {
        id: `audit-reset-${Date.now()}`,
        user: 'System Admin',
        action: 'Reset Demo State',
        entity: 'System',
        newValue: 'Restored original demo dataset',
        reason: 'User executed Reset Demo action',
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      },
      ...INITIAL_AUDIT_LOGS,
    ]);
    setActiveAffiliateId('aff-1');
    setDemoWorkflow(INITIAL_DEMO_WORKFLOW);

    showToast('✨ Demo Reset Successful', 'All 16 domains and workflow steps restored to default state', 'success');
  }, [showToast]);

  return (
    <AffiliateDemoContext.Provider
      value={{
        affiliates,
        applications,
        referralLinks,
        referralClicks,
        referrals,
        customers,
        commissions,
        payouts,
        coupons,
        campaigns,
        tiers,
        commissionRules,
        bonuses,
        fraudCases,
        marketingAssets,
        notifications,
        auditLogs,
        activeAffiliateId,
        activeAffiliate,
        demoWorkflow,
        setActiveAffiliateId,
        setDemoWorkflow,
        simulateReferralClick,
        simulateSignup,
        simulateUpgradeCustomer,
        simulateGenerateCommission,
        approveCommission,
        makeCommissionPayable,
        requestPayout,
        approvePayout,
        markPayoutPaid,
        simulateRefund,
        simulateAddDemoCustomer,
        simulateCouponUsage,
        approveApplication,
        rejectApplication,
        submitApplication,
        createReferralLink,
        deleteReferralLink,
        createCampaign,
        updateCampaignStatus,
        requestCoupon,
        approveCoupon,
        resolveFraudCase,
        updateAffiliateStatus,
        updateAffiliateTier,
        updateCommissionRule,
        markNotificationRead,
        markAllNotificationsRead,
        resetDemo,
      }}
    >
      {children}
    </AffiliateDemoContext.Provider>
  );
}

export function useAffiliateDemo() {
  const context = useContext(AffiliateDemoContext);
  if (!context) {
    throw new Error('useAffiliateDemo must be used within an AffiliateDemoProvider');
  }
  return context;
}
