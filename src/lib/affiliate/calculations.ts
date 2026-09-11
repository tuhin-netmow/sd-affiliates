import { AffiliateTierName, CommissionStatus, PayoutStatus, ReferralStatus, FraudRiskScore } from '@/types/affiliate';

export function formatCurrency(amount: number): string {
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(absAmount);

  return isNegative ? `-${formatted}` : formatted;
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export function formatPercent(rate: number): string {
  return `${(rate * 100).toFixed(1).replace(/\.0$/, '')}%`;
}

export function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

export function formatDateTime(dateString: string): string {
  try {
    const d = new Date(dateString);
    return d.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  } catch {
    return dateString;
  }
}

export function getTierBadgeClass(tier: AffiliateTierName): string {
  switch (tier) {
    case 'Bronze':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 dark:border-amber-800';
    case 'Silver':
      return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700';
    case 'Gold':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950/60 dark:text-yellow-300 border-yellow-400 dark:border-yellow-700';
    case 'Platinum':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-300 dark:border-purple-800';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
  }
}

export function getCommissionStatusBadge(status: CommissionStatus): { text: string; className: string } {
  switch (status) {
    case 'Pending':
      return { text: 'Pending', className: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800' };
    case 'Approved':
      return { text: 'Approved', className: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-800' };
    case 'Payable':
      return { text: 'Payable', className: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800' };
    case 'Paid':
      return { text: 'Paid', className: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/50 dark:text-green-400 dark:border-green-800' };
    case 'Reversed':
      return { text: 'Reversed', className: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-400 dark:border-rose-800' };
    case 'Refunded':
      return { text: 'Refunded', className: 'bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700' };
    default:
      return { text: status, className: 'bg-zinc-100 text-zinc-700' };
  }
}

export function getPayoutStatusBadge(status: PayoutStatus): { text: string; className: string } {
  switch (status) {
    case 'Pending':
      return { text: 'Pending Review', className: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800' };
    case 'Approved':
      return { text: 'Approved', className: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-800' };
    case 'Processing':
      return { text: 'Processing', className: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-400 dark:border-indigo-800' };
    case 'Paid':
      return { text: 'Paid', className: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/50 dark:text-green-400 dark:border-green-800' };
    case 'Rejected':
      return { text: 'Rejected', className: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-400 dark:border-rose-800' };
    default:
      return { text: status, className: 'bg-zinc-100 text-zinc-700' };
  }
}

export function getReferralStatusBadge(status: ReferralStatus): { text: string; className: string } {
  switch (status) {
    case 'Clicked':
      return { text: 'Clicked', className: 'bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300' };
    case 'Signed Up':
      return { text: 'Signed Up', className: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/50 dark:text-cyan-400' };
    case 'Free':
      return { text: 'Free Account', className: 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300' };
    case 'Trial':
      return { text: 'In Trial', className: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-400' };
    case 'Paid':
      return { text: 'Active Customer', className: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400' };
    case 'Cancelled':
      return { text: 'Cancelled', className: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400' };
    case 'Refunded':
      return { text: 'Refunded', className: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-400' };
    default:
      return { text: status, className: 'bg-zinc-100 text-zinc-700' };
  }
}

export function getFraudRiskBadge(risk: FraudRiskScore): { text: string; className: string } {
  switch (risk) {
    case 'Low':
      return { text: 'Low Risk', className: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400' };
    case 'Medium':
      return { text: 'Medium Risk', className: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400' };
    case 'High':
      return { text: 'High Risk', className: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/50 dark:text-orange-400' };
    case 'Critical':
      return { text: 'Critical Risk', className: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-400' };
    default:
      return { text: risk, className: 'bg-zinc-100 text-zinc-700' };
  }
}
