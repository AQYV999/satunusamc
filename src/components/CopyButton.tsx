import { useState } from 'react';
import { m } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import { SITE } from '../config/site';

type Props = { label?: string; className?: string };

export function CopyButton({ label = 'Salin IP', className = '' }: Props) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.ip);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = SITE.ip;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Copy failed:', err);
      }
      document.body.removeChild(textarea);
    }
  };
  
  return (
    <m.button
      onClick={handleCopy}
      whileTap={{ scale: 0.95 }}
      animate={copied ? { scale: [1, 1.08, 1] } : {}}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`btn btn-secondary w-full sm:w-auto relative overflow-hidden group ${className}`}
      aria-live="polite"
      aria-label={copied ? `IP tersalin ke clipboard: ${SITE.ip}` : `${label}: ${SITE.ip}`}
    >
      {copied ? <Check className="w-4 h-4 inline mr-2" aria-hidden="true" /> : <Copy className="w-4 h-4 inline mr-2" aria-hidden="true" />}
      <span>{copied ? 'Tersalin!' : label}</span>
      <span className="ml-2 font-mono text-xs opacity-80">{SITE.ip}</span>
    </m.button>
  );
}