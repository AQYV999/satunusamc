import { useEffect, useState } from 'react';
import { m } from 'framer-motion';
import { Heart } from 'lucide-react';
import { type Donor } from '../data/donors';
import { fetchDonorsFromSheet } from '../lib/donorsSheet';
import { skinHead } from '../data/staff';
import { SpringButton } from '../components/SpringButton';

const SHOW_AMOUNT = true;
const rupiah = (n: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);

export function Donors() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    fetchDonorsFromSheet('/api/sheet?type=donors')
      .then((data) => {
        if (alive) setDonors(data);
      })
      .catch(() => {
        if (alive) setFailed(true);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => { alive = false; };
  }, []);

  const sorted = [...donors].sort((a, b) => b.amount - a.amount);
  const top = sorted.slice(0, 3);
  const rest = sorted.slice(3);

  const podiumOrder = [top[1], top[0], top[2]].filter(Boolean);
  const rankStyles: Record<string | number, { color: string; bg: string; label: string }> = {
    [top[0]?.id ?? '']: { color: '#facc15', bg: 'rgba(250,204,21,0.15)', label: '#1' },
    [top[1]?.id ?? '']: { color: '#cbd5e1', bg: 'rgba(203,213,225,0.1)', label: '#2' },
    [top[2]?.id ?? '']: { color: '#d97706', bg: 'rgba(217,119,6,0.15)', label: '#3' },
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
        <p className="text-center text-slate-500">Gagal memuat data donatur. Pastikan Sheet sudah dipublikasikan.</p>
      ) : sorted.length === 0 ? (
        <p className="text-center text-slate-500">Belum ada donatur. Jadilah yang pertama!</p>
      ) : (
        <>
          {/* Podium top 3 */}
          <div className="flex items-end justify-center gap-2 md:gap-6 min-h-[350px] pt-16 pb-10">
            {podiumOrder.map((d, index) => {
              const style = rankStyles[d.id];
              const isFirst = d.id === top[0]?.id;
              const isSecond = d.id === top[1]?.id;
              
              const heightClass = isFirst ? 'h-48' : isSecond ? 'h-36' : 'h-28';
              const avatarSize = isFirst ? 'w-28 h-28 md:w-32 md:h-32' : 'w-20 h-20 md:w-24 md:h-24';
              
              const name = d.anonymous ? 'Anonim' : d.name;
              const ign = d.anonymous ? 'MHF_Question' : d.ign;

              return (
                <m.div
                  key={d.id}
                  className="flex flex-col items-center relative w-28 md:w-40"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1, type: 'spring' }}
                >
                  {/* Avatar Skin (menimpa panggung) */}
                  <div 
                    className={`relative z-10 ${avatarSize} rounded-2xl bg-[#111] border-[3px] mb-[-2rem] shadow-2xl flex items-center justify-center`}
                    style={{ borderColor: style.color, boxShadow: `0 10px 30px -10px ${style.color}` }}
                  >
                    {isFirst && (
                      <img 
                        src="/icons/crown-custom.webp" 
                        alt="Crown" 
                        className="absolute -top-8 w-12 h-12 object-contain drop-shadow-[0_0_12px_rgba(250,204,21,0.8)] animate-float z-20" 
                      />
                    )}
                    <img
                      src={skinHead(ign, 128)}
                      alt={name}
                      className="w-full h-full object-cover rounded-xl [image-rendering:pixelated]"
                    />
                  </div>

                  {/* Panggung / Alas */}
                  <div 
                    className={`w-full ${heightClass} rounded-t-xl flex flex-col items-center justify-start pt-10 pb-4 relative overflow-hidden border-t-2`}
                    style={{ 
                      background: `linear-gradient(180deg, ${style.bg} 0%, #09090b 100%)`,
                      borderColor: style.color 
                    }}
                  >
                    <div className="absolute top-0 w-full h-[2px]" style={{ backgroundColor: style.color }} />
                    
                    <h3 className="font-display text-2xl md:text-3xl font-extrabold mb-1" style={{ color: style.color }}>
                      {style.label}
                    </h3>
                    <p className="text-white font-bold text-xs md:text-sm truncate w-full text-center px-1">{name}</p>
                    {SHOW_AMOUNT && (
                      <p className="text-[10px] md:text-xs font-mono font-bold mt-1" style={{ color: style.color }}>
                        {rupiah(d.amount)}
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
