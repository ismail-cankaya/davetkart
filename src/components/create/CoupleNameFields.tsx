import React, { useEffect, useRef, useState } from 'react';
import { useInvitationStore } from '../../stores/useInvitationStore';
import { joinNames, splitNames } from '../../utils/names';

interface CoupleNameFieldsProps {
  /** Field labels, e.g. ['Gelin Adı', 'Damat Adı'] — driven by the category. */
  labels: [string, string];
  labelClass: string;
  inputClass: string;
}

/**
 * Two-person name entry bound to the invitation's single `names` string.
 * Keystrokes stay local for instant feedback; the joined value is written to
 * the store behind a debounce so the live preview doesn't re-render per key.
 */
export function CoupleNameFields({ labels, labelClass, inputClass }: CoupleNameFieldsProps) {
  const names = useInvitationStore(s => s.invitation.names);
  const updateField = useInvitationStore(s => s.updateField);

  const [pair, setPair] = useState<[string, string]>(() => splitNames(names));
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Re-sync only on external changes (reset, hydration) — never while the
  // edit originated here, or a half-filled pair would jump between fields.
  useEffect(() => {
    setPair(prev => (joinNames(prev[0], prev[1]) === names ? prev : splitNames(names)));
  }, [names]);

  // A pending edit must survive unmount (e.g. submitting the form while the
  // debounce is still open) — flush it instead of dropping it.
  const flushRef = useRef<(() => void) | null>(null);
  useEffect(() => () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    flushRef.current?.();
  }, []);

  const handleChange = (index: 0 | 1) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const next: [string, string] = index === 0 ? [e.target.value, pair[1]] : [pair[0], e.target.value];
    setPair(next);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const commit = () => {
      flushRef.current = null;
      updateField('names', joinNames(next[0], next[1]));
    };
    flushRef.current = commit;
    debounceRef.current = setTimeout(commit, 400);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {([0, 1] as const).map((index) => (
        <div key={index} className="space-y-2">
          <label className={labelClass}>{labels[index]}</label>
          <input
            type="text"
            value={pair[index]}
            onChange={handleChange(index)}
            placeholder={index === 0 ? 'Örn. Sophia' : 'Örn. Elias'}
            className={inputClass}
          />
        </div>
      ))}
    </div>
  );
}
