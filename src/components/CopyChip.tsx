import { useState } from 'react';

type Props = { label: string; display: string; copyValue: string };

export function CopyChip({ label, display, copyValue }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(copyValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard tidak tersedia */
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Salin alamat ${label}`}
      className="flex flex-col items-center justify-center bg-[#1A150F] border border-[#2A231A] rounded-lg px-3 py-1.5 w-full sm:w-auto min-w-[140px] cursor-pointer transition-colors hover:border-emerald-500/50"
    >
      <p className={`text-[9px] sm:text-[10px] uppercase tracking-wider mb-0.5 ${copied ? 'text-emerald-400' : 'text-slate-400'}`}>
        {copied ? 'Tersalin!' : label}
      </p>
      <p className="font-mono text-xs sm:text-sm text-white whitespace-nowrap">{display}</p>
    </button>
  );
}