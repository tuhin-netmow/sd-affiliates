'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'info' | 'warning' | 'error';

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
}

interface ToastContextType {
  toasts: ToastItem[];
  showToast: (title: string, description?: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((title: string, description?: string, type: ToastType = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    const newToast: ToastItem = { id, title, description, type };
    setToasts((prev) => [...prev.slice(-4), newToast]);

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      {/* Toast Render Overlay */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none max-w-md w-full px-4">
        {toasts.map((toast) => {
          let icon = <CheckCircle2 className="size-5 text-emerald-600 dark:text-emerald-400 shrink-0" />;
          let borderBg = 'border-emerald-200 bg-emerald-50/95 dark:border-emerald-900/50 dark:bg-emerald-950/90 text-emerald-950 dark:text-emerald-50';

          if (toast.type === 'info') {
            icon = <Info className="size-5 text-blue-600 dark:text-blue-400 shrink-0" />;
            borderBg = 'border-blue-200 bg-blue-50/95 dark:border-blue-900/50 dark:bg-blue-950/90 text-blue-950 dark:text-blue-50';
          } else if (toast.type === 'warning') {
            icon = <AlertTriangle className="size-5 text-amber-600 dark:text-amber-400 shrink-0" />;
            borderBg = 'border-amber-200 bg-amber-50/95 dark:border-amber-900/50 dark:bg-amber-950/90 text-amber-950 dark:text-amber-50';
          } else if (toast.type === 'error') {
            icon = <XCircle className="size-5 text-rose-600 dark:text-rose-400 shrink-0" />;
            borderBg = 'border-rose-200 bg-rose-50/95 dark:border-rose-900/50 dark:bg-rose-950/90 text-rose-950 dark:text-rose-50';
          }

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start justify-between gap-3 p-3.5 rounded-xl border shadow-lg backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-3 ${borderBg}`}
            >
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5">{icon}</div>
                <div>
                  <h4 className="font-semibold text-sm leading-tight">{toast.title}</h4>
                  {toast.description && (
                    <p className="text-xs opacity-90 mt-1 leading-normal">{toast.description}</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="opacity-70 hover:opacity-100 transition-opacity p-0.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10"
                aria-label="Close notification"
              >
                <X className="size-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
