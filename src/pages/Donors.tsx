import { useEffect, useState } from 'react';
import { m } from 'framer-motion';
import { Crown, Heart } from 'lucide-react';
import { DONORS, type Donor } from '../data/donors';
import { fetchDonorsFromSheet } from '../lib/donorsSheet';
import { SITE } from '../config/site';
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
  const [donors, setDonors] = useState<Donor[]>(SITE.donorsSheetUrl ? [] : DONORS);
  const [loading, setLoading] = useState(Boolean(SITE.donorsSheetUrl));
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!SITE.donorsSheetUrl) return;
    let alive = true;
    fetchDonorsFromSheet(SITE.donorsSheetUrl)
      .then((list) => { if (alive) setDonors(list); })
      .catch(() => { if (alive) setFailed(true); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, []);

  const sorted = [...donors].sort((a, b) => b.amount - a.amount);
  const top = sorted.slice(0, 3);
  const rest = sorted.slice(3);

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
      ) : sorted.length === 0 ? (
        <p className="text-center text-slate-500">
          {failed ? 'Daftar donatur belum bisa dimuat. Coba lagi nanti.' : 'Belum ada donatur. Jadilah yang pertama!'}
        </p>
      ) : (
        <>
          {/* Podium top 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            {top.map((d, i) => {
              const s = PODIUM[i];
              const name = d.anonymous ? 'Anonim' : d.name;
              const ign = d.anonymous ? 'MHF_Question' : d.ign;
              return (
                <m.div
                  key={d.id}
                  className={s.order}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div
                    className="card-flat relative p-6 text-center space-y-3 overflow-hidden"
                    style={{ backgroundImage: `radial-gradient(120% 60% at 50% 0%, ${s.glow}, transparent 65%)` }}
                  >
                    <div className={`flex items-center justify-center gap-1.5 font-extrabold tracking-widest text-sm ${s.text}`}>
                      {i === 0 && <Crown className="w-4 h-4" />}
                      #{i + 1}
                    </div>
                    <div className={`mx-auto ${s.size} rounded-2xl bg-black overflow-hidden border-2 ${s.border}`}>
                      <img
                        src={skinHead(ign)}
                        alt={`Skin ${name}`}
                        loading="lazy"
                        draggable={false}
                        className="w-full h-full object-cover [image-rendering:pixelated]"
                      />
                    </div>
                    <h2 className="font-display text-xl font-bold uppercase tracking-wide text-white">{name}</h2>
                    {SHOW_AMOUNT && <p className={`font-extrabold ${s.text}`}>{rupiah(d.amount)}</p>}
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