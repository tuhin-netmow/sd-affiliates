'use client';

import React, { useState } from 'react';
import { AffiliateSidebar } from '@/components/affiliate/affiliate-sidebar';
import { AffiliateHeader } from '@/components/affiliate/affiliate-header';

export default function AffiliateLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col shrink-0">
        <AffiliateSidebar />
      </div>

      {/* Mobile Drawer Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-64 max-w-[85vw] h-full bg-card shadow-2xl animate-in slide-in-from-left duration-300">
            <AffiliateSidebar onCloseMobile={() => setMobileMenuOpen(false)} />
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AffiliateHeader onToggleMobileMenu={() => setMobileMenuOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
