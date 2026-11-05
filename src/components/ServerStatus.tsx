import { useEffect, useState } from 'react';
import { SITE } from '../config/site';

type Status =
  | { state: 'loading' }
  | { state: 'error' }
  | { state: 'offline' }
  | { state: 'online'; players: number; max: number };

export function ServerStatus() {
  const [status, setStatus] = useState<Status>({ state: 'loading' });

  useEffect(() => {
    const ctrl = new AbortController();

    const load = async () => {
      try {
        const res = await fetch(`https://api.mcsrvstat.us/3/${SITE.ip}`, { signal: ctrl.signal });
        const d = await res.json();
        setStatus(
          d.online
            ? { state: 'online', players: d.players?.online ?? 0, max: d.players?.max ?? 0 }
            : { state: 'offline' },
        );
      } catch (e) {
        if ((e as Error).name !== 'AbortError') setStatus({ state: 'error' });
      }
    };

    load();
    const id = setInterval(load, 60_000);
    return () => { ctrl.abort(); clearInterval(id); };
  }, []);

  const online = status.state === 'online';
  const offline = status.state === 'offline';
  const label =
    online ? 'Server Online' : offline ? 'Server Offline' : status.state === 'error' ? 'Status tidak tersedia' : 'Memeriksa…';
  const dot = online ? 'bg-emerald-400' : offline ? 'bg-red-400' : 'bg-slate-400';

  return (
    <div
      className={`status-pill ${offline ? '!border-red-400/30 !bg-none !bg-red-500/10' : ''}`}
      role="status"
      aria-label={`${label}, ${SITE.edition}`}
    >
      <span className="relative flex w-2.5 h-2.5" aria-hidden="true">
        {online && <span className={`absolute inline-flex h-full w-full rounded-full ${dot} opacity-70 animate-ping`} />}
        <span className={`relative inline-flex w-2.5 h-2.5 rounded-full ${dot}`} />
      </span>
      <span className={`font-semibold ${online ? 'text-emerald-300' : offline ? 'text-red-300' : 'text-slate-300'}`}>
        {label}
      </span>
      <span className="w-px h-3.5 bg-white/20" />
      <span className="text-slate-300">{SITE.edition}</span>
      {online && (
        <span className="hidden sm:inline px-2 py-0.5 rounded-full bg-emerald-400/15 text-emerald-300 text-[10px] font-bold tracking-wider">
          {status.players}/{status.max} pemain
        </span>
      )}
    </div>
  );
}
