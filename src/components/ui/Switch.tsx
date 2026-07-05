import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../utils/cn';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** Accessible name for the control. */
  label: string;
  disabled?: boolean;
}

/**
 * Minimal shadcn-style toggle switch, themed for the dark wizard form.
 */
export function Switch({ checked, onChange, label, disabled = false }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors duration-300 cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40',
        checked ? 'bg-gold border-gold' : 'bg-white/10 border-white/15',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
        className={cn(
          'inline-block h-[18px] w-[18px] rounded-full shadow-sm',
          checked ? 'bg-brand-deep ml-[22px]' : 'bg-white/80 ml-[3px]'
        )}
      />
    </button>
  );
}
