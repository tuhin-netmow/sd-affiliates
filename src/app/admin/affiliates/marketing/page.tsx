'use client';

import React, { useState } from 'react';
import { FolderDown, Download, Image, FileText, Video, Globe, Mail, File, Presentation } from 'lucide-react';
import { useAffiliateDemo } from '@/context/affiliate-demo-context';
import { useToast } from '@/context/toast-context';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Logo: <Image className="size-4 text-blue-500" />,
  Banner: <Image className="size-4 text-violet-500" />,
  'Social Media': <Globe className="size-4 text-emerald-500" />,
  Video: <Video className="size-4 text-rose-500" />,
  Screenshot: <Image className="size-4 text-amber-500" />,
  'Email Template': <Mail className="size-4 text-blue-500" />,
  PDF: <File className="size-4 text-rose-600" />,
  'Sales Material': <Presentation className="size-4 text-violet-600" />,
};

const CATEGORIES = ['All', 'Logo', 'Banner', 'Social Media', 'Video', 'Screenshot', 'Email Template', 'PDF', 'Sales Material'];

export default function AdminMarketingPage() {
  const { marketingAssets } = useAffiliateDemo();
  const { showToast } = useToast();
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filtered = marketingAssets.filter(
    (a) => categoryFilter === 'All' || a.category === categoryFilter
  );

  const handleDownload = (assetName: string) => {
    showToast(`Demo download started: ${assetName}`, 'info');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <FolderDown className="size-6 text-blue-500" />
            Marketing Materials
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and distribute approved marketing assets to affiliates.
          </p>
        </div>
        <span className="px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-600 border border-blue-500/20 text-xs font-medium">
          {marketingAssets.length} assets
        </span>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              categoryFilter === cat
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-muted text-muted-foreground hover:text-foreground border border-border hover:border-blue-500/30'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((asset) => (
          <div key={asset.id} className="rounded-2xl border border-border bg-card/80 p-4 space-y-3 hover:border-blue-500/30 transition-all hover:shadow-md">
            {/* Preview placeholder */}
            <div className="w-full h-32 rounded-xl bg-gradient-to-br from-blue-500/10 to-violet-500/10 border border-border flex items-center justify-center">
              <div className="text-center">
                {CATEGORY_ICONS[asset.category] || <File className="size-8 text-muted-foreground" />}
                <p className="text-xs text-muted-foreground mt-2">{asset.category}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground truncate">{asset.title}</h3>
              {asset.dimensions && <p className="text-[11px] text-muted-foreground">{asset.dimensions}</p>}
              {asset.fileSize && <p className="text-[11px] text-muted-foreground">{asset.fileSize}</p>}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
                {asset.format || asset.category}
              </span>
            </div>

            <button
              onClick={() => handleDownload(asset.title)}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-border text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-blue-500/30 hover:bg-blue-500/5 transition-all"
            >
              <Download className="size-3.5" />
              Download
            </button>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-4 rounded-2xl border border-dashed border-border p-16 text-center">
            <FolderDown className="size-10 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No assets in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
