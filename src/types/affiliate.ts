export type AffiliateTierName = 'Bronze' | 'Silver' | 'Gold' | 'Platinum';

export type AffiliateStatus = 'Active' | 'Pending' | 'Suspended' | 'Banned' | 'Rejected';

export type ApplicationStatus = 'Pending' | 'Approved' | 'Rejected';

export type PlanType = 'Free' | 'Starter' | 'Pro' | 'Enterprise';

export type ReferralStatus = 'Clicked' | 'Signed Up' | 'Free' | 'Trial' | 'Paid' | 'Cancelled' | 'Refunded';

export type CommissionType = 'Recurring' | 'One-time' | 'Bonus' | 'Reversal' | 'Adjustment';

export type CommissionStatus = 'Pending' | 'Approved' | 'Payable' | 'Paid' | 'Reversed' | 'Refunded';

export type PayoutStatus = 'Pending' | 'Approved' | 'Processing' | 'Paid' | 'Rejected';

export type PayoutMethod = 'PayPal' | 'Bank Transfer' | 'Stripe Direct' | 'Wise';

export type CouponStatus = 'Active' | 'Pending' | 'Expired' | 'Disabled';

export type CampaignStatus = 'Active' | 'Paused' | 'Completed';

export type FraudRiskScore = 'Low' | 'Medium' | 'High' | 'Critical';

export type FraudStatus = 'Under Review' | 'Resolved Safe' | 'Confirmed Fraud' | 'Suspended';

export type FraudType =
  | 'Self Referral'
  | 'Duplicate Organization'
  | 'Suspicious IP'
  | 'Click Spam'
  | 'Coupon Abuse'
  | 'Abnormal Conversion'
  | 'Refund Pattern'
  | 'Chargeback Pattern';

export type MarketingAssetCategory =
  | 'Logos'
  | 'Banners'
  | 'Social Media'
  | 'Videos'
  | 'Screenshots'
  | 'Email Templates'
  | 'PDFs'
  | 'Sales Materials';

export interface Affiliate {
  id: string;
  name: string;
  email: string;
  avatar: string;
  company: string;
  website: string;
  phone: string;
  country: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    youtube?: string;
    instagram?: string;
  };
  promotionalChannels: string[];
  referralCode: string;
  tier: AffiliateTierName;
  customCommissionRate?: number; // Override if any
  status: AffiliateStatus;
  joinDate: string;
  payoutMethod: PayoutMethod;
  payoutDetails: string;
  stats: {
    totalClicks: number;
    signups: number;
    paidCustomers: number;
    conversionRate: number;
    totalRevenue: number;
    pendingCommission: number;
    payableCommission: number;
    totalEarned: number;
    currentBalance: number;
  };
  notes?: string[];
}

export interface Application {
  id: string;
  applicantName: string;
  email: string;
  company: string;
  website: string;
  country: string;
  phone: string;
  promotionalChannel: string;
  audienceSize: string;
  experienceDescription: string;
  status: ApplicationStatus;
  appliedDate: string;
  reviewNotes?: string;
}

export interface ReferralLink {
  id: string;
  affiliateId: string;
  name: string;
  code: string;
  url: string;
  landingPage: string;
  campaignId?: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  clicks: number;
  signups: number;
  customers: number;
  revenue: number;
  commission: number;
  status: 'Active' | 'Paused';
  createdAt: string;
}

export interface ReferralClick {
  id: string;
  affiliateId: string;
  linkId?: string;
  ipAddress: string;
  country: string;
  device: string;
  referrerUrl: string;
  timestamp: string;
}

export interface Referral {
  id: string;
  affiliateId: string;
  affiliateName: string;
  linkId?: string;
  customerName: string;
  orgName: string;
  email: string;
  clickDate: string;
  signupDate: string;
  plan: PlanType;
  status: ReferralStatus;
  revenue: number;
  commission: number;
  attributionType: string;
  campaign?: string;
  coupon?: string;
  country: string;
  lifecycleStep: number; // 1 to 8
}

export interface Customer {
  id: string;
  orgName: string;
  contactName: string;
  email: string;
  plan: PlanType;
  signupDate: string;
  subscriptionStatus: 'Active' | 'Trial' | 'Cancelled' | 'Past Due';
  monthlyRevenue: number;
  lifetimeRevenue: number;
  commissionEarned: number;
  affiliateId: string;
  affiliateName: string;
  attribution: string;
  campaign?: string;
  coupon?: string;
  paymentHistory: {
    id: string;
    date: string;
    amount: number;
    plan: PlanType;
    status: 'Paid' | 'Refunded';
  }[];
  commissionHistory: {
    id: string;
    date: string;
    amount: number;
    status: CommissionStatus;
  }[];
}

export interface Commission {
  id: string;
  affiliateId: string;
  affiliateName: string;
  customerId: string;
  customerName: string;
  orgName: string;
  plan: PlanType;
  type: CommissionType;
  baseAmount: number;
  rate: number; // e.g. 0.25
  amount: number;
  status: CommissionStatus;
  date: string;
  reference: string;
  note?: string;
}

export interface Payout {
  id: string;
  affiliateId: string;
  affiliateName: string;
  amount: number;
  method: PayoutMethod;
  requestedDate: string;
  processedDate?: string;
  status: PayoutStatus;
  reference: string;
  accountDetails: string;
  note?: string;
}

export interface Coupon {
  id: string;
  code: string;
  discount: string; // e.g. "20% OFF"
  discountPercent: number;
  affiliateId?: string;
  affiliateName?: string;
  usageCount: number;
  customersReferred: number;
  revenueGenerated: number;
  commissionGenerated: number;
  expirationDate: string;
  status: CouponStatus;
  description: string;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  status: CampaignStatus;
  startDate: string;
  endDate: string;
  clicks: number;
  signups: number;
  customers: number;
  revenue: number;
  commission: number;
  assignedAffiliates: string[]; // Affiliate IDs
}

export interface Tier {
  id: string;
  name: AffiliateTierName;
  minCustomers: number;
  minRevenue: number;
  commissionRate: number; // percentage, e.g. 25
  benefits: string[];
  color: string;
}

export interface Bonus {
  id: string;
  title: string;
  type: 'Customer Milestone' | 'Revenue Milestone' | 'Monthly Bonus' | 'Campaign Bonus' | 'Tier Bonus';
  requirement: string;
  reward: number;
  progress: number;
  maxProgress: number;
  achieved: boolean;
  affiliateId?: string; // Optional: specific or global
  affiliateName?: string;
  expiryDate?: string;
}

export interface FraudCase {
  id: string;
  affiliateId: string;
  affiliateName: string;
  type: FraudType;
  riskScore: FraudRiskScore;
  status: FraudStatus;
  flaggedDate: string;
  details: string;
  ipAddress?: string;
  orgName?: string;
  commissionAmount?: number;
}

export interface MarketingAsset {
  id: string;
  title: string;
  category: MarketingAssetCategory;
  description: string;
  dimensions?: string;
  fileSize: string;
  format: string;
  previewUrl: string;
  copyText?: string;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  date: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'payout' | 'tier';
  link?: string;
}

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  entity: string;
  entityId?: string;
  previousValue?: string;
  newValue?: string;
  reason?: string;
  timestamp: string;
}

export interface CommissionRule {
  id: string;
  planName: PlanType;
  defaultRate: number; // percentage e.g. 25
  bronzeRate: number;
  silverRate: number;
  goldRate: number;
  platinumRate: number;
  description: string;
}

export interface DemoWorkflowState {
  currentStep: number; // 1 to 10
  selectedAffiliateId: string;
  referralClicksCount: number;
  simulatedOrgName: string;
  simulatedPlan: PlanType;
  simulatedCustomerCreated: boolean;
  simulatedCustomerId?: string;
  simulatedCommissionGenerated: boolean;
  simulatedCommissionId?: string;
  simulatedCommissionStatus: CommissionStatus;
  simulatedPayoutRequested: boolean;
  simulatedPayoutId?: string;
  simulatedPayoutStatus: PayoutStatus;
  simulatedRefundOccurred: boolean;
  stepResults: { [step: number]: string };
}
