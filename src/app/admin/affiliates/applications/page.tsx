'use client';

import React, { useState } from 'react';
import {
  FileCheck2,
  Check,
  X,
  Search,
  Eye,
  Globe,
  Mail,
  Phone,
  HelpCircle,
  Building,
} from 'lucide-react';
import { useAffiliateDemo } from '@/context/affiliate-demo-context';
import { Application } from '@/types/affiliate';
import { DrawerSheet } from '@/components/shared/drawer-sheet';
import { ConfirmationModal } from '@/components/shared/confirmation-modal';
import { useToast } from '@/context/toast-context';

export default function AdminApplicationsPage() {
  const { applications, approveApplication, rejectApplication } = useAffiliateDemo();
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [rejectAppId, setRejectAppId] = useState<string | null>(null);

  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.country.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleRequestInfo = (name: string) => {
    showToast('Information Request Sent', `Email questionnaire sent to ${name}`, 'info');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Affiliate Application Queue</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Review incoming sports coach, academy, and influencer partnership applications.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search applicants by name, company, or country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 no-scrollbar">
          {['All', 'Pending', 'Approved', 'Rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-2 text-xs font-semibold rounded-xl border whitespace-nowrap transition-all ${
                statusFilter === status
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-card text-muted-foreground border-border hover:bg-muted'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Applications Table */}
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        {filteredApps.length === 0 ? (
          <div className="p-12 text-center text-xs text-muted-foreground">
            No applications found matching the selected filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-muted/40 border-b border-border text-muted-foreground font-semibold uppercase tracking-wider text-[10px]">
                  <th className="p-4">Applicant & Company</th>
                  <th className="p-4">Website & Country</th>
                  <th className="p-4">Promotional Channel & Reach</th>
                  <th className="p-4">Applied Date</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-right">Review Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredApps.map((app) => {
                  const isPending = app.status === 'Pending';
                  return (
                    <tr
                      key={app.id}
                      onClick={() => setSelectedApp(app)}
                      className="hover:bg-muted/30 transition-colors cursor-pointer group"
                    >
                      <td className="p-4">
                        <div className="font-bold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {app.applicantName}
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                          {app.company} • {app.email}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-mono text-[11px] text-foreground truncate max-w-xs">{app.website}</div>
                        <div className="text-[11px] text-muted-foreground">{app.country}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-foreground">{app.promotionalChannel}</div>
                        <div className="text-[11px] text-emerald-600 font-semibold">{app.audienceSize}</div>
                      </td>
                      <td className="p-4 text-muted-foreground">{app.appliedDate}</td>
                      <td className="p-4 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                            app.status === 'Approved'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300'
                              : app.status === 'Pending'
                              ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300'
                              : 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300'
                          }`}
                        >
                          {app.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => setSelectedApp(app)}
                            className="p-1.5 rounded-lg border border-border hover:bg-muted text-foreground transition-all"
                            title="View Application Details"
                          >
                            <Eye className="size-3.5" />
                          </button>

                          {isPending && (
                            <>
                              <button
                                onClick={() => handleRequestInfo(app.applicantName)}
                                className="p-1.5 rounded-lg border border-border hover:bg-blue-50 text-muted-foreground hover:text-blue-600 transition-all"
                                title="Request Additional Information"
                              >
                                <HelpCircle className="size-3.5" />
                              </button>
                              <button
                                onClick={() => approveApplication(app.id)}
                                className="p-1.5 rounded-lg border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 transition-all"
                                title="Approve Application (Pending -> Active)"
                              >
                                <Check className="size-3.5" />
                              </button>
                              <button
                                onClick={() => setRejectAppId(app.id)}
                                className="p-1.5 rounded-lg border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 transition-all"
                                title="Reject Application"
                              >
                                <X className="size-3.5" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Application Detail Sheet */}
      <DrawerSheet
        isOpen={selectedApp !== null}
        onClose={() => setSelectedApp(null)}
        title={selectedApp?.applicantName || 'Application Questionnaire'}
        subtitle={`Organization: ${selectedApp?.company}`}
      >
        {selectedApp && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-muted/30 border border-border space-y-3 text-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Applicant Information
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-muted-foreground">Email Address</span>
                  <p className="font-mono font-medium text-foreground mt-0.5">{selectedApp.email}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Phone Number</span>
                  <p className="font-medium text-foreground mt-0.5">{selectedApp.phone}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Website</span>
                  <p className="font-mono text-blue-600 underline mt-0.5">{selectedApp.website}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Country</span>
                  <p className="font-medium text-foreground mt-0.5">{selectedApp.country}</p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border space-y-3 text-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Audience & Promotional Strategy
              </h4>
              <div>
                <span className="text-muted-foreground font-semibold">Primary Channels:</span>
                <p className="font-bold text-foreground mt-0.5">{selectedApp.promotionalChannel}</p>
              </div>
              <div>
                <span className="text-muted-foreground font-semibold">Verified Audience Reach:</span>
                <p className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{selectedApp.audienceSize}</p>
              </div>
              <div>
                <span className="text-muted-foreground font-semibold">Experience & Plans:</span>
                <p className="text-foreground mt-1 leading-relaxed">{selectedApp.experienceDescription}</p>
              </div>
            </div>

            {selectedApp.status === 'Pending' && (
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <button
                  onClick={() => {
                    rejectApplication(selectedApp.id);
                    setSelectedApp(null);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 dark:text-rose-300 rounded-xl border border-rose-200 transition-all"
                >
                  Reject Application
                </button>
                <button
                  onClick={() => {
                    approveApplication(selectedApp.id);
                    setSelectedApp(null);
                  }}
                  className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-all"
                >
                  Approve as Active Affiliate
                </button>
              </div>
            )}
          </div>
        )}
      </DrawerSheet>

      {/* Reject Confirmation Modal */}
      <ConfirmationModal
        isOpen={rejectAppId !== null}
        onClose={() => setRejectAppId(null)}
        onConfirm={() => {
          if (rejectAppId) rejectApplication(rejectAppId);
        }}
        title="Reject Affiliate Application?"
        description="This applicant will be marked as Rejected. A notification and audit trail log will be created."
        confirmText="Yes, Reject Application"
      />
    </div>
  );
}
