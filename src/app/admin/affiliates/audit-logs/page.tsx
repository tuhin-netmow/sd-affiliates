'use client';

import React, { useState } from 'react';
import { ScrollText, Search, User, Clock, ArrowRight, Filter } from 'lucide-react';
import { useAffiliateDemo } from '@/context/affiliate-demo-context';

const ACTION_COLORS: Record<string, string> = {
  APPROVE: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  REJECT: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
  SUSPEND: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  BAN: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
  REVERSE: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
  CREATE: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  UPDATE: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  REACTIVATE: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  PAYOUT: 'bg-violet-500/10 text-violet-600 border-violet-500/20',
};

const ACTION_GROUPS = ['All', 'APPROVE', 'REJECT', 'SUSPEND', 'BAN', 'REVERSE', 'CREATE', 'UPDATE', 'PAYOUT'];

export default function AuditLogsPage() {
  const { auditLogs } = useAffiliateDemo();
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('All');
  const [page, setPage] = useState(1);
  const PER_PAGE = 20;

  const filtered = auditLogs.filter((log) => {
    const matchSearch = search === ''
      || log.action.toLowerCase().includes(search.toLowerCase())
      || log.entity.toLowerCase().includes(search.toLowerCase())
      || log.user.toLowerCase().includes(search.toLowerCase())
      || (log.reason || '').toLowerCase().includes(search.toLowerCase());
    const matchAction = actionFilter === 'All' || log.action.startsWith(actionFilter);
    return matchSearch && matchAction;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const getActionColor = (action: string) => {
    const key = ACTION_GROUPS.find((g) => g !== 'All' && action.toUpperCase().startsWith(g));
    return key ? (ACTION_COLORS[key] || 'bg-muted text-muted-foreground border-border') : 'bg-muted text-muted-foreground border-border';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <ScrollText className="size-6 text-blue-500" />
            Audit Logs
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Complete record of all actions performed during the demo. Actions populate in real-time.
          </p>
        </div>
        <span className="px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-600 border border-blue-500/20 text-xs font-medium">
          {auditLogs.length} total entries
        </span>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by action, entity or user..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          />
        </div>
        <select
          value={actionFilter}
          onChange={(e) => { setActionFilter(e.target.value); setPage(1); }}
          className="px-3 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none"
        >
          {ACTION_GROUPS.map((g) => <option key={g}>{g}</option>)}
        </select>
      </div>

      {/* Audit Log Table */}
      <div className="rounded-2xl border border-border bg-card/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Timestamp</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Performed By</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Action</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Entity</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Change</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginated.map((log) => (
                <tr key={log.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-xs text-muted-foreground font-mono whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Clock className="size-3" />
                      {log.timestamp}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <div className="size-6 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <User className="size-3 text-blue-500" />
                      </div>
                      <span className="text-xs font-medium text-foreground">{log.user}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${getActionColor(log.action)}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-foreground">{log.entity}</td>
                  <td className="px-4 py-3">
                    {log.previousValue && log.newValue ? (
                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="text-muted-foreground line-through">{log.previousValue}</span>
                        <ArrowRight className="size-3 text-muted-foreground" />
                        <span className="text-foreground font-semibold">{log.newValue}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground max-w-xs truncate">{log.reason || '—'}</td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-16 text-center text-muted-foreground text-sm">
                    No audit log entries match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-border px-4 py-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Showing {((page - 1) * PER_PAGE) + 1}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length} entries
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 text-xs rounded-lg border border-border hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="px-3 py-1.5 text-xs text-foreground font-semibold">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 text-xs rounded-lg border border-border hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
