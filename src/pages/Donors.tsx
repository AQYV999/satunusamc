import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { m } from 'framer-motion';
import { Crown, Heart } from 'lucide-react';
import { type Donor } from '../data/donors';
import { fetchDonorsFromSheet } from '../lib/donorsSheet';
import { skinHead } from '../data/staff';
import { SpringButton } from '../components/SpringButton';

// Ubah ke false kalau nominal donasi tidak ingin ditampilkan
const SHOW_AMOUNT = true;

const rupiah = (n: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);

const PODIUM = [
  { order: 'md:order-2', text: 'text-yellow-300', border: 'border-yellow-400/60', glow: 'rgba(250,204,21,0.16)', size: 'w-28 h-28' },
  { order: 'md:order-1', text: 'text-slate-200',  border: 'border-slate-300/50',  glow: 'rgba(203,213,225,0.12)', size: 'w-24 h-24' },
  { order: 'md:order-3', text: 'text-amber-500',  border: 'border-amber-600/50',  glow: 'rgba(217,119,6,0.14)',   size: 'w-24 h-24' },
];

export function Donors() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    fetchDonorsFromSheet('/api/sheet?type=donors')
      .then((list) => { if (alive) setDonors(list); })
      .catch(() => { if (alive) setFailed(true); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, []);

  const sorted = [...donors].sort((a, b) => b.amount - a.amount);
  const top = sorted.slice(0, 3);
  const rest = sorted.slice(3);

  const podiumOrder = [top[1], top[0], top[2]].filter(Boolean);
  const rankStyles: Record<string | number, { rank: string; color: string; textColor: string; label: string }> = {
    [top[0]?.id ?? '']: { rank: 'rank-1', color: '#facc15', textColor: 'text-yellow-400', label: '#1' },
    [top[1]?.id ?? '']: { rank: 'rank-2', color: '#cbd5e1', textColor: 'text-slate-300', label: '#2' },
    [top[2]?.id ?? '']: { rank: 'rank-3', color: '#d97706', textColor: 'text-amber-500', label: '#3' },
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-20 space-y-14">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-bold tracking-widest">
          <Heart className="w-3.5 h-3.5" /> TERIMA KASIH
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white">Top Donatur</h1>
        <p className="text-slate-400">
          Para pendukung yang membantu menjaga SatuNusaMC tetap hidup dan berkembang.
        </p>
      </div>

      {loading ? (
        <p className="text-center text-slate-500">Memuat daftar donatur...</p>
      ) : failed ? (
        <p className="text-center text-slate-500">Gagal memuat data donatur. Pastikan Sheet sudah dipublikasikan dengan benar.</p>
      ) : sorted.length === 0 ? (
        <p className="text-center text-slate-500">Belum ada donatur. Jadilah yang pertama!</p>
      ) : (
        <>
          {/* Podium top 3 */}
          <div className="podium-container">
            {podiumOrder.map((d) => {
              const style = rankStyles[d.id];
              const name = d.anonymous ? 'Anonim' : d.name;
              const ign = d.anonymous ? 'MHF_Question' : d.ign;

              return (
                <m.div
                  key={d.id}
                  className={`podium-card ${style.rank}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
                  style={{ '--solid': style.color } as CSSProperties}
                >
                  {/* Panggung 3D */}
                  <div className={`podium-base ${style.rank} absolute bottom-0 w-full`} />

                  {/* Avatar Skin */}
                  <div className="podium-avatar relative">
                    <img
                      src={skinHead(ign, 128)}
                      alt={name}
                      className="w-full h-full object-cover [image-rendering:pixelated]"
                    />
                  </div>

                  {/* Teks di atas panggung */}
                  <div className="podium-text">
                    <h3 className={`font-display text-xl font-bold uppercase tracking-wider ${style.textColor}`}>
                      {style.label}
                    </h3>
                    <p className="text-white font-bold text-sm md:text-base truncate px-2">{name}</p>
                    {SHOW_AMOUNT && (
                      <p className={`text-xs md:text-sm font-mono font-bold ${style.textColor}`}>
                        Rp {d.amount.toLocaleString('id-ID')}
                      </p>
                    )}
                  </div>
                </m.div>
              );
            })}
          </div>

          {/* Peringkat 4 dst */}
          {rest.length > 0 && (
            <div className="card !p-0 overflow-hidden divide-y divide-white/5">
              {rest.map((d, i) => {
                const name = d.anonymous ? 'Anonim' : d.name;
                const ign = d.anonymous ? 'MHF_Question' : d.ign;
                return (
                  <div key={d.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.02] transition-colors">
                    <span className="w-8 text-center text-sm font-bold text-slate-500">#{i + 4}</span>
                    <div className="w-10 h-10 rounded-lg bg-black overflow-hidden border border-[#27272a] shrink-0">
                      <img
                        src={skinHead(ign, 64)}
                        alt=""
                        loading="lazy"
                        draggable={false}
                        className="w-full h-full object-cover [image-rendering:pixelated]"
                      />
                    </div>
                    <span className="flex-1 font-semibold text-white truncate">{name}</span>
                    {SHOW_AMOUNT && <span className="text-sm font-bold text-emerald-300">{rupiah(d.amount)}</span>}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      <div className="text-center space-y-4">
        <p className="text-slate-400">Ingin namamu muncul di sini? Dukung server lewat Store.</p>
        <SpringButton to="/store" className="w-full sm:w-auto">Dukung Server</SpringButton>
      </div>
    </div>
  );
}