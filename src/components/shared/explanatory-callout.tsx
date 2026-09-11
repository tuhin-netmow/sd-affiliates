import React from 'react';
import { Info, HelpCircle, Sparkles } from 'lucide-react';

interface ExplanatoryCalloutProps {
  title: string;
  description: string;
  variant?: 'info' | 'tip' | 'accent' | 'indigo' | 'purple';
  icon?: React.ReactNode;
}

export function ExplanatoryCallout({
  title,
  description,
  variant = 'info',
  icon,
}: ExplanatoryCalloutProps) {
  let style = 'bg-blue-50/70 border-blue-200 text-blue-950 dark:bg-blue-950/30 dark:border-blue-800/60 dark:text-blue-100';
  let defaultIcon = <Info className="size-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />;

  if (variant === 'tip') {
    style = 'bg-emerald-50/70 border-emerald-200 text-emerald-950 dark:bg-emerald-950/30 dark:border-emerald-800/60 dark:text-emerald-100';
    defaultIcon = <Sparkles className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />;
  } else if (variant === 'accent' || variant === 'purple') {
    style = 'bg-purple-50/70 border-purple-200 text-purple-950 dark:bg-purple-950/30 dark:border-purple-800/60 dark:text-purple-100';
    defaultIcon = <HelpCircle className="size-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />;
  } else if (variant === 'indigo') {
    style = 'bg-indigo-50/70 border-indigo-200 text-indigo-950 dark:bg-indigo-950/30 dark:border-indigo-800/60 dark:text-indigo-100';
    defaultIcon = <Info className="size-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />;
  }

  return (
    <div className={`p-4 rounded-xl border flex items-start gap-3 ${style}`}>
      {icon || defaultIcon}
      <div>
        <h5 className="text-xs font-semibold uppercase tracking-wider opacity-90">{title}</h5>
        <p className="text-xs mt-1 leading-relaxed opacity-85">{description}</p>
      </div>
    </div>
  );
}

export default ExplanatoryCallout;
