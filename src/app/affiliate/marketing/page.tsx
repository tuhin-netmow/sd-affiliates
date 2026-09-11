'use client';

import React, { useState } from 'react';
import {
  FolderDown,
  Copy,
  Download,
  Check,
  ExternalLink,
  Image as ImageIcon,
  FileText,
  Video,
  Mail,
  Search,
} from 'lucide-react';
import { useAffiliateDemo } from '@/context/affiliate-demo-context';
import { MarketingAssetCategory } from '@/types/affiliate';
import { useToast } from '@/context/toast-context';

export default function AffiliateMarketingPage() {
  const { marketingAssets, activeAffiliate } = useAffiliateDemo();
  const { showToast } = useToast();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories: string[] = [
    'All',
    'Logos',
    'Banners',
    'Social Media',
    'Videos',
    'Screenshots',
    'Email Templates',
    'PDFs',
    'Sales Materials',
  ];

  const filteredAssets = marketingAssets.filter((asset) => {
    const matchesCategory = selectedCategory === 'All' || asset.category === selectedCategory;
    const matchesSearch =
      asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (title: string) => {
    showToast('✓ Demo download started', `${title} downloaded to your device`, 'success');
  };

  const handleCopy = (text: string, id: string) => {
    const personalized = text.replace(/{CODE}/g, activeAffiliate.referralCode);
    navigator.clipboard?.writeText(personalized);
    setCopiedId(id);
    showToast('✓ Snippet Copied to Clipboard', 'Personalized with your referral code', 'success');
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Marketing Materials & Brand Kit</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Official promotional banners, pitch decks, email copy, and vector logos customized with your referral code.
          </p>
        </div>
      </div>

      {/* Categories Horizontal Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl border whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-card text-muted-foreground border-border hover:bg-muted'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search marketing assets by keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-xs pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm"
        />
      </div>

      {/* Asset Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm flex flex-col justify-between hover:border-emerald-500/40 transition-all duration-200"
          >
            <div>
              {/* Asset Preview Area */}
              <div className="h-44 bg-muted relative overflow-hidden flex items-center justify-center">
                <img
                  src={asset.previewUrl}
                  alt={asset.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/75 text-white backdrop-blur-md">
                  {asset.format}
                </div>
                {asset.dimensions && (
                  <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-black/75 text-white backdrop-blur-md">
                    {asset.dimensions}
                  </div>
                )}
              </div>

              {/* Info Body */}
              <div className="p-5 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  {asset.category}
                </span>
                <h3 className="text-sm font-bold text-foreground leading-snug">{asset.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {asset.description}
                </p>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="p-5 pt-0 flex items-center justify-between gap-2 border-t border-border/60 mt-3 pt-3">
              <span className="text-[11px] font-mono text-muted-foreground">{asset.fileSize}</span>

              <div className="flex items-center gap-2">
                {asset.copyText && (
                  <button
                    onClick={() => handleCopy(asset.copyText!, asset.id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border text-xs font-semibold hover:bg-muted text-foreground transition-all"
                    title="Copy Personalized Embed / Text"
                  >
                    {copiedId === asset.id ? (
                      <Check className="size-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                    <span>Copy</span>
                  </button>
                )}

                <button
                  onClick={() => handleDownload(asset.title)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-all"
                >
                  <Download className="size-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
