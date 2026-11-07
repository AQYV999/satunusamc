import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Megaphone, X } from 'lucide-react';
import { ANNOUNCEMENT } from '../config/site';

const STORAGE_KEY = 'stmc-announcement-dismissed';

const wasDismissed = (): boolean => {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === ANNOUNCEMENT.id;
  } catch {
    return false;
  }
};

export function AnnouncementBar() {
  const [hidden, setHidden] = useState(wasDismissed);

  if (!ANNOUNCEMENT.enabled || hidden) return null;

  const close = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, ANNOUNCEMENT.id);
    } catch {
      /* storage tidak tersedia */
    }
    setHidden(true);
  };

  return (
    <div role="status" className="bg-emerald-500/10 border-b border-emerald-500/25 text-emerald-300 text-sm">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-center gap-3 text-center">
        <Megaphone className="w-4 h-4 shrink-0" aria-hidden="true" />
        <p className="leading-snug">
          {ANNOUNCEMENT.text}{' '}
          {ANNOUNCEMENT.href && (
            <Link to={ANNOUNCEMENT.href} className="underline font-semibold whitespace-nowrap hover:text-white">
              {ANNOUNCEMENT.label ?? 'Selengkapnya'}
            </Link>
          )}
        </p>
        <button
          type="button"
          onClick={close}
          aria-label="Tutup pengumuman"
          className="shrink-0 p-1 rounded hover:bg-white/10"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
