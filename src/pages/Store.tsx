import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import {
  AlertTriangle, ArrowRight, Check, CreditCard, Crown, MessageCircle, Minus,
  PartyPopper, Plus, ShieldCheck, Sparkles, Zap,
} from 'lucide-react';
import { RANKS } from '../data/ranks';
import { TiltCard } from '../components/TiltCard';
import { SITE, isWhatsAppConfigured, whatsappLink } from '../config/site';

const STEPS = [
  { icon: Check, title: 'Pilih rank', desc: 'Tentukan rank yang cocok dengan gaya mainmu.' },
  { icon: MessageCircle, title: 'Hubungi admin', desc: 'Klik tombol beli, admin akan memberi info pembayaran.' },
  { icon: CreditCard, title: 'Lakukan pembayaran', desc: 'Selesaikan pembayaran sesuai arahan admin.' },
  { icon: PartyPopper, title: 'Rank aktif', desc: 'Admin mengaktifkan rank di akun Minecraft-mu.' },
];

const TRUST = [
  { icon: ShieldCheck, label: 'Diproses langsung oleh admin' },
  { icon: Zap, label: 'Aktivasi di akun Minecraft-mu' },
  { icon: Sparkles, label: 'Mendukung server tetap hidup' },
];

const BADGES: Record<string, string> = {
  lord: '⭐ PALING POPULER',
  eternal: '👑 RANK TERTINGGI',
};

// Semua benefit kumulatif sampai rank ke-i (rank atas mewarisi rank bawah)
const cumulative = (i: number) => RANKS.slice(0, i + 1).flatMap((r) => r.benefits);
const ALL_BENEFITS = Array.from(new Set(RANKS.flatMap((r) => r.benefits)));

function Price({ value }: { value: string | null }) {
  if (!value) return <p className="text-sm font-semibold text-slate-300">Harga via admin</p>;
  const [cur, ...rest] = value.split(' ');
  return (
    <div className="flex items-start gap-1.5">
      <span className="text-sm font-bold text-slate-400 mt-1.5">{cur}</span>
      <span className="price-num text-4xl font-extrabold text-white">{rest.join(' ')}</span>
    </div>
  );
}

function WarningNotice() {
  return (
    <m.aside
      role="note"
      initial={{ opacity: 0, y: -16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="hazard-frame max-w-3xl mx-auto"
    >
      <div className="hazard-inner space-y-4">
        <div className="flex items-center justify-center gap-3 text-yellow-400">
          <AlertTriangle className="warning-blink w-5 h-5 md:w-6 md:h-6" />
          <span className="warning-blink font-extrabold tracking-[0.35em] text-base md:text-xl">WARNING</span>
          <AlertTriangle className="warning-blink w-5 h-5 md:w-6 md:h-6" />
        </div>

        <p className="text-slate-200 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
          Setiap rank yang kamu beli bukan sekadar kit dan keuntungan. Itu berarti kamu ikut
          menjaga {SITE.name} tetap hidup lebih lama, membantu pengembangan fitur, optimasi
          server, event baru, dan masih banyak lagi.
        </p>

        <p className="text-sm md:text-base font-semibold text-emerald-300">
          Terima kasih sudah jadi bagian dari perjalanan ini. <span className="heartbeat">❤️</span>
        </p>
      </div>
    </m.aside>
  );
}

export function Store() {
  const waOk = isWhatsAppConfigured();

  return (
    <div className="relative overflow-hidden">
      {/* Dekorasi latar */}
      <div className="absolute inset-0 bg-grid opacity-25 pointer-events-none" />
      <div className="blob absolute -top-24 left-1/2 -translate-x-1/2 w-[640px] h-[640px] rounded-full bg-emerald-500/15 blur-[120px] pointer-events-none" />
      <div className="blob absolute top-1/3 -right-40 w-[420px] h-[420px] rounded-full bg-sky-500/10 blur-[110px] pointer-events-none" style={{ animationDelay: '-4s' }} />

      <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24 space-y-24">
        <div className="-mb-12">
          <WarningNotice />
        </div>

        {/* ===== HERO ===== */}
        <m.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto space-y-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-bold tracking-widest">
            <Crown className="w-3.5 h-3.5" /> STORE RESMI {SITE.name.toUpperCase()}
          </span>

          <h1 className="store-title-glow text-4xl md:text-6xl font-extrabold text-white leading-[1.1]">
            Naikkan Level<br />
            <span className="shimmer-text">Petualanganmu</span>
          </h1>

          <p className="text-slate-300 md:text-lg max-w-xl mx-auto leading-relaxed text-center">
            Pilih rank, dapatkan kit eksklusif dan keuntungan lebih. Setiap rank
            otomatis mencakup semua keuntungan rank di bawahnya.
          </p>

          <ul className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            {TRUST.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/[0.04] border border-white/10 text-xs md:text-sm text-slate-300"
              >
                <Icon className="w-4 h-4 text-emerald-400" />
                {label}
              </li>
            ))}
          </ul>
        </m.header>

        {/* ===== RANK CARDS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch pt-4">
          {RANKS.map((rank, i) => {
            const total = cumulative(i).length;
            const badge = BADGES[rank.id];
            const style = {
              '--accent': rank.theme.accent,
              '--glow': rank.theme.glow,
              '--solid': rank.theme.solid,
              '--on-solid': rank.theme.onSolid,
            } as CSSProperties;

            return (
              <m.div
                key={rank.id}
                className={`relative h-full ${rank.popular ? 'lg:-mt-6' : ''}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                {badge && (
                  <span
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap px-3.5 py-1 rounded-full text-[10px] font-extrabold tracking-widest shadow-lg"
                    style={{ background: rank.theme.solid, color: rank.theme.onSolid, boxShadow: `0 8px 24px -6px ${rank.theme.solid}` }}
                  >
                    {badge}
                  </span>
                )}

                <TiltCard max={4} className="h-full">
                  <div className={`rank-card ${rank.popular ? 'rank-card--featured' : ''}`} style={style}>
                    <div className="relative flex flex-col flex-1">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <span className={`w-16 h-16 rounded-2xl flex items-center justify-center ${rank.theme.iconBox}`}>
                          <img
                            src={rank.image}
                            alt={rank.name}
                            width={48}
                            height={48}
                            draggable={false}
                            className="w-12 h-12 object-contain"
                            style={{ filter: `drop-shadow(0 0 8px ${rank.theme.solid}66)` }}
                          />
                        </span>
                        <span className="text-[10px] font-bold tracking-widest text-slate-500">
                          TIER {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <div className="mt-4">
                        <h2 className={`text-2xl font-extrabold tracking-tight ${rank.theme.text}`}>{rank.name}</h2>
                        <p className="text-xs text-slate-500 mt-0.5">{rank.tagline}</p>
                      </div>

                      <p className="mt-3 text-sm text-slate-400 leading-relaxed min-h-[4rem]">{rank.description}</p>

                      {/* Harga */}
                      <div className="mt-4 pt-5 border-t border-white/5 space-y-2">
                        <Price value={rank.price} />
                        <span
                          className="inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full"
                          style={{ background: rank.theme.glow, color: rank.theme.solid }}
                        >
                          {total} keuntungan total
                        </span>
                      </div>

                      {/* Benefit */}
                      <ul className="mt-5 space-y-2.5 flex-1">
                        {rank.inherits && (
                          <li
                            className="flex items-center gap-2.5 text-sm font-semibold rounded-lg px-3 py-2"
                            style={{ background: rank.theme.glow, color: rank.theme.solid }}
                          >
                            <Plus className="w-4 h-4 shrink-0" />
                            Semua fitur {rank.inherits}
                          </li>
                        )}
                        {rank.benefits.map((b) => (
                          <li key={b} className="flex items-start gap-2.5 text-sm text-slate-200">
                            <span
                              className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                              style={{ background: rank.theme.glow }}
                            >
                              <Check className={`w-3 h-3 ${rank.theme.check}`} strokeWidth={3} />
                            </span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <div className="mt-7">
                        {waOk ? (
                          <a
                            href={whatsappLink(`Halo, saya ingin membeli rank ${rank.name} di ${SITE.name}. Mohon info pembayaran.`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`rank-btn group ${rank.solidCta ? 'rank-btn--solid' : ''}`}
                          >
                            <span className="relative z-10">Beli {rank.name}</span>
                            <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
                            <span className="btn-shine" />
                          </a>
                        ) : (
                          <Link to="/support" className={`rank-btn group ${rank.solidCta ? 'rank-btn--solid' : ''}`}>
                            <span className="relative z-10">Hubungi Admin</span>
                            <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
                            <span className="btn-shine" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </m.div>
            );
          })}
        </div>

        {/* ===== PERBANDINGAN ===== */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <p className="text-emerald-400 text-xs font-bold tracking-widest">BANDINGKAN</p>
            <h2 className="text-2xl md:text-4xl font-extrabold text-white">Rank Mana yang Cocok?</h2>
            <p className="text-slate-400 text-sm">Lihat perbedaan keuntungan tiap rank dalam sekali pandang.</p>
          </div>

          <div className="card !p-0 overflow-hidden">
            <div className="overflow-x-auto table-fade">
              <table className="w-full min-w-[640px] text-sm">
                <caption className="sr-only">Perbandingan keuntungan tiap rank</caption>
                <thead>
                  <tr className="border-b border-white/5">
                    <th scope="col" className="text-left font-semibold text-slate-500 text-xs tracking-widest p-4">KEUNTUNGAN</th>
                    {RANKS.map((r) => (
                      <th key={r.id} scope="col" className={`p-4 text-center font-extrabold ${r.theme.text}`}>{r.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ALL_BENEFITS.map((b) => (
                    <tr key={b} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                      <th scope="row" className="p-4 text-left text-slate-300 font-normal">{b}</th>
                      {RANKS.map((r, i) => {
                        const has = cumulative(i).includes(b);
                        return (
                          <td key={r.id} className="p-4 text-center">
                            {has ? (
                              <Check className={`w-5 h-5 mx-auto ${r.theme.check}`} strokeWidth={3} />
                            ) : (
                              <Minus className="w-4 h-4 mx-auto text-slate-700" />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  <tr className="bg-white/[0.03]">
                    <th scope="row" className="p-4 text-left font-bold text-white">Harga</th>
                    {RANKS.map((r) => (
                      <td key={r.id} className="p-4 text-center font-extrabold text-white">{r.price ?? '—'}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ===== CARA BELI ===== */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <p className="text-emerald-400 text-xs font-bold tracking-widest">MUDAH & CEPAT</p>
            <h2 className="text-2xl md:text-4xl font-extrabold text-white">Cara Membeli Rank</h2>
            <p className="text-slate-400 text-sm">Empat langkah singkat sampai rank aktif.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <m.div
                  key={s.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="card-flat p-5 flex gap-4"
                >
                  <span className="relative shrink-0 w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                    <span className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-emerald-500 text-[#04120c] text-[11px] font-extrabold flex items-center justify-center">
                      {i + 1}
                    </span>
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-white">{s.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1">{s.desc}</p>
                  </div>
                </m.div>
              );
            })}
          </div>
        </section>

        {/* ===== CTA AKHIR ===== */}
        <m.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative card !p-8 md:!p-12 text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-radial-emerald opacity-70 pointer-events-none" />
          <div className="relative space-y-4">
            <h2 className="text-2xl md:text-4xl font-extrabold text-white">Masih ragu pilih yang mana?</h2>
            <p className="text-slate-300 max-w-lg mx-auto text-center">
              Tanya langsung ke admin, kami bantu pilih rank yang paling pas buat gaya mainmu.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link to="/support" className="btn btn-primary relative overflow-hidden w-full sm:w-auto">
                <span className="relative z-10">Tanya Admin</span>
                <ArrowRight className="relative z-10 w-4 h-4" />
                <span className="btn-shine" />
              </Link>
              <Link to="/rules" className="btn btn-ghost w-full sm:w-auto">Baca Peraturan</Link>
            </div>
          </div>
        </m.section>
      </div>
    </div>
  );
}