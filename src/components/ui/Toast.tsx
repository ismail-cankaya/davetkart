import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Info } from 'lucide-react';

type ToastType = 'success' | 'info';

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

type Listener = (toast: ToastItem) => void;

let nextId = 0;
const listeners = new Set<Listener>();

/** Fire a toast from anywhere (replaces window.alert). */
export function toast(message: string, type: ToastType = 'success') {
  const item: ToastItem = { id: ++nextId, message, type };
  listeners.forEach(fn => fn(item));
}

export function Toaster() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const onToast: Listener = (item) => {
      setToasts(prev => [...prev, item]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== item.id));
      }, 4200);
    };
    listeners.add(onToast);
    return () => { listeners.delete(onToast); };
  }, []);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2 pointer-events-none px-4 w-full sm:w-auto">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 24, scale: 0.92, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 12, scale: 0.95, filter: 'blur(4px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto flex items-center gap-3 bg-brand-deep/95 backdrop-blur-xl text-white pl-4 pr-6 py-3.5 rounded-2xl shadow-2xl shadow-brand-deep/30 border border-white/10 max-w-md"
          >
            <span className={t.type === 'success' ? 'text-emerald-300' : 'text-champagne'}>
              {t.type === 'success' ? <CheckCircle2 size={18} /> : <Info size={18} />}
            </span>
            <p className="text-xs font-medium leading-relaxed">{t.message}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
