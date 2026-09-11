'use client';

import React from 'react';
import { formatCurrency } from '@/lib/affiliate/calculations';

interface DataPoint {
  label: string;
  value: number;
  value2?: number;
}

interface AreaChartProps {
  data: DataPoint[];
  height?: number;
  color?: string;
  isCurrency?: boolean;
  valuePrefix?: string;
  title?: string;
}

export function MiniAreaChart({
  data,
  height = 200,
  color = '#10B981',
  isCurrency = false,
  title,
}: AreaChartProps) {
  if (!data || data.length === 0) return null;

  const values = data.map((d) => d.value);
  const maxVal = Math.max(...values, 10);
  const minVal = Math.min(...values, 0);
  const range = maxVal - minVal || 1;

  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - ((d.value - minVal) / range) * 80 - 10;
      return `${x},${y}`;
    })
    .join(' ');

  const areaPath = `0,100 ${points} 100,100`;

  return (
    <div className="w-full">
      {title && <h4 className="text-sm font-semibold text-foreground mb-3">{title}</h4>}
      <div className="relative w-full" style={{ height: `${height}px` }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full overflow-visible">
          <defs>
            <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.28" />
              <stop offset="100%" stopColor={color} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="0" y1="20" x2="100" y2="20" stroke="currentColor" strokeOpacity="0.07" strokeDasharray="2" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeOpacity="0.07" strokeDasharray="2" />
          <line x1="0" y1="80" x2="100" y2="80" stroke="currentColor" strokeOpacity="0.07" strokeDasharray="2" />

          {/* Gradient area */}
          <polygon points={areaPath} fill={`url(#grad-${color.replace('#', '')})`} />

          {/* Smooth line */}
          <polyline
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
            vectorEffect="non-scaling-stroke"
          />

          {/* Data point dots */}
          {data.map((d, i) => {
            const cx = (i / (data.length - 1)) * 100;
            const cy = 100 - ((d.value - minVal) / range) * 80 - 10;
            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r="3"
                fill="#ffffff"
                stroke={color}
                strokeWidth="2"
                className="transition-all hover:r-5 cursor-pointer"
                vectorEffect="non-scaling-stroke"
              >
                <title>{`${d.label}: ${isCurrency ? formatCurrency(d.value) : d.value}`}</title>
              </circle>
            );
          })}
        </svg>

        {/* X Axis Labels */}
        <div className="flex justify-between text-[11px] text-muted-foreground mt-2 px-1">
          {data.map((d, idx) => (
            <span key={idx} className="truncate">
              {d.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

interface BarChartProps {
  data: DataPoint[];
  height?: number;
  barColor?: string;
  bar2Color?: string;
  label1?: string;
  label2?: string;
}

export function MiniBarChart({
  data,
  height = 200,
  barColor = '#3B82F6',
  bar2Color = '#10B981',
  label1 = 'Clicks',
  label2 = 'Signups',
}: BarChartProps) {
  const maxVal = Math.max(...data.map((d) => Math.max(d.value, d.value2 || 0)), 10);

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground mb-3 justify-end">
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm" style={{ backgroundColor: barColor }} />
          {label1}
        </span>
        {label2 && (
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm" style={{ backgroundColor: bar2Color }} />
            {label2}
          </span>
        )}
      </div>

      <div className="flex items-end justify-between gap-3 pt-4 px-2" style={{ height: `${height}px` }}>
        {data.map((d, i) => {
          const h1 = Math.max(8, (d.value / maxVal) * (height - 40));
          const h2 = d.value2 ? Math.max(8, (d.value2 / maxVal) * (height - 40)) : 0;

          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
              <div className="flex items-end gap-1 w-full justify-center">
                <div
                  className="w-full max-w-[16px] rounded-t-md transition-all duration-300 group-hover:brightness-110"
                  style={{ height: `${h1}px`, backgroundColor: barColor }}
                  title={`${label1} (${d.label}): ${d.value}`}
                />
                {d.value2 !== undefined && (
                  <div
                    className="w-full max-w-[16px] rounded-t-md transition-all duration-300 group-hover:brightness-110"
                    style={{ height: `${h2}px`, backgroundColor: bar2Color }}
                    title={`${label2} (${d.label}): ${d.value2}`}
                  />
                )}
              </div>
              <span className="text-[11px] text-muted-foreground mt-1 truncate">{d.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
