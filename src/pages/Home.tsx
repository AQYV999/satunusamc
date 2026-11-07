
import { useState } from 'react';
import { m } from 'framer-motion';
import { SITE } from '../config/site';
import { RANKS } from '../data/ranks';
import { NEWS } from '../data/news';
import { GALLERY } from '../data/gallery';
import { HeroVideo } from '../components/HeroVideo';
import { ZoomIn } from 'lucide-react';
import { DiscordIcon } from '../components/icons/DiscordIcon';
import { Lightbox } from '../components/Lightbox';
import { FloatingParticles } from '../components/FloatingParticles';
import { SpringButton } from '../components/SpringButton';
import { CopyButton } from '../components/CopyButton';
import { CopyChip } from '../components/CopyChip';
import { ServerStatus } from '../components/ServerStatus';
import { SectionHeading } from '../components/SectionHeading';

const CORE_FEATURES = [
  { img: '/icons/grass-block.webp', title: "Survival Experience", desc: "Nikmati dunia Survival dengan kebebasan membangun base, membuat farm, mengumpulkan sumber daya, dan menjelajahi lingkungan bersama pemain lain." },
  { img: '/icons/golden-shovel.webp', title: "Land Claim Protection", desc: "Lindungi hasil kerja kerasmu menggunakan sistem Land Claim. Gunakan Golden Shovel untuk menentukan wilayah perlindungan agar bangunan dan area milikmu lebih aman dari griefing." },
  { img: '/icons/emerald.webp', title: "Economy System", desc: "Bangun kekayaan melalui aktivitas bermain. Kumpulkan uang, jual hasil eksplorasi, beli kebutuhan, dan kembangkan asetmu melalui sistem ekonomi server." },
  { img: '/icons/iron-pickaxe.webp', title: "Jobs System", desc: "Pilih pekerjaan sesuai gaya bermainmu. Mulai dari penambang, petani, penebang kayu, pemburu, nelayan, hingga berbagai pekerjaan lainnya untuk mendapatkan penghasilan." },
];

const GAMEPLAY_SYSTEMS = [
  { img: '/icons/gold-ingot.webp', title: "Player Market", desc: "Berinteraksi dengan ekonomi antarpemain melalui sistem perdagangan." },
  { img: '/icons/xp-orb.webp', title: "Skills & Progression", desc: "Tingkatkan kemampuan karakter melalui berbagai kategori skill: Combat, Defense, Agility, Fishing, Excavation, Enchanting, Mining, Foraging, Alchemy, dan Farming." },
  { img: '/icons/clock.webp', title: "Daily Rewards", desc: "Dapatkan kesempatan memperoleh hadiah melalui sistem Daily Rewards. Kunjungi server secara rutin dan klaim hadiah yang tersedia." },
  { img: '/icons/quest-book.webp', title: "Quest System", desc: "Selesaikan berbagai quest untuk memberikan tujuan tambahan dalam perjalanan Survival-mu." },
  { img: '/icons/banner.webp', title: "Battle Pass", desc: "Nikmati sistem progres tambahan melalui Battle Pass dan raih berbagai reward sesuai perkembangan permainan." },
  { img: '/icons/shulker-box.webp', title: "Custom Kits", desc: "Pilih kit sesuai rank yang dimiliki. Setiap kit memberikan perlengkapan awal untuk membantu memulai petualangan." },
  { img: '/icons/key-chest.webp', title: "Crate & Key System", desc: "Kunjungi area Gacha untuk mencoba mendapatkan berbagai hadiah melalui sistem crate dan key yang tersedia." },
  { img: '/icons/trophy.webp', title: "Leaderboard", desc: "Bersaing dengan pemain lain dalam berbagai kategori seperti Top Deaths, Top Balance, Top Kills, dan Top Playtime." },
  { img: '/icons/ender-chest.webp', title: "Player Vault", desc: "Simpan barang-barang berhargamu melalui sistem Player Vault untuk membantu pengelolaan inventaris." },
  { img: '/icons/ender-pearl.webp', title: "Random Teleport", desc: "Jelajahi dunia Survival dengan lebih mudah menggunakan fitur Random Teleport untuk menemukan lokasi baru dan memulai petualangan." },
  { img: '/icons/skull.webp', title: "Mob Level System", desc: "Hadapi berbagai monster dengan level berbeda dan kumpulkan pengalaman selama menjelajahi dunia Survival." },
  { img: '/icons/campfire.webp', title: "Player & Community Activities", desc: "Nikmati berbagai fasilitas tambahan, termasuk tutorial, informasi server, rules, serta sistem pendukung aktivitas pemain." },
];


export function Home() {
  const [active, setActive] = useState<number | null>(null);
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;

  return (
    <div className="space-y-16 md:space-y-24 pb-20 bg-ornament overflow-x-hidden w-full relative">
      <FloatingParticles count={isMobile ? 6 : 20} />

      {/* Hero Section - Full-width Cinematic Video */}
            <section className="relative w-full min-h-[calc(100vh-5rem)] flex items-center justify-center !mt-0">
              {/* Full-width video background - starts from top of page, behind navbar */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <HeroVideo />
                {/* Thin dark overlay for text readability */}
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030201] via-transparent to-transparent" />
              </div>

              {/* Hero Content - centered, minimalist */}
              <div className="relative z-20 w-full max-w-full mx-auto px-4 py-12 md:py-20 text-center">
                <m.div
                            className="mx-auto max-w-7xl px-4"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                          >
                  <ServerStatus />

                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-[1.1] mx-auto">
                    Your Adventure,<br />
                    <span className="shimmer-text text-emerald-400 mx-auto">Your World, Your Story.</span>
                  </h1>

                  <p className="text-lg md:text-xl text-slate-300 max-w-xl mx-auto leading-relaxed">
                    {SITE.description}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 mx-auto">
                    <SpringButton to="/store" className="w-full sm:w-auto">
                      Mulai Petualangan
                    </SpringButton>
                    <a
                      href={SITE.discordInvite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-discord-outline inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold"
                    >
                      <DiscordIcon className="h-5 w-5" /> Gabung Discord
                    </a>
                    <CopyButton label="Salin IP" />
                  </div>

                  {/* IP Info - compact, aligned with buttons above */}
              <div className="flex flex-col sm:flex-row items-stretch justify-center gap-4 pt-4 border-t border-white/10 mx-auto max-w-md">
                <CopyChip label="Java" display={SITE.ip} copyValue={SITE.ip} />
                <div className="hidden sm:block w-px h-full bg-white/10 self-stretch" />
                <CopyChip label="Bedrock" display={`${SITE.ip}:${SITE.bedrockPort}`} copyValue={SITE.ip} />
              </div>
                </m.div>
              </div>
            </section>

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="card p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Tentang SatuNusaMC</h2>
          <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed text-center">
            <p className="mb-4 text-justify">
              SatuNusaMC adalah server Minecraft Survival yang menghadirkan pengalaman bermain dengan berbagai fitur menarik, sistem ekonomi, eksplorasi, dan komunitas yang dapat berkembang bersama.
            </p>
            <p className="mb-4 text-justify">
              Jelajahi dunia survival yang luas, bangun base impianmu, kumpulkan sumber daya, kembangkan kemampuan karakter, dan ciptakan perjalananmu sendiri bersama pemain lainnya.
            </p>
            <p className="text-justify">
              Tidak hanya sekadar bertahan hidup, SatuNusaMC menghadirkan berbagai aktivitas yang membuat setiap petualangan terasa lebih beragam. Mulai dari membangun perlindungan melalui sistem Land Claim, menjalankan berbagai pekerjaan untuk mendapatkan penghasilan, berdagang dengan pemain lain, hingga menyelesaikan quest dan bersaing di leaderboard. Baik kamu pemain yang suka membangun, menjelajah, bertarung, maupun mengembangkan ekonomi, selalu ada sesuatu untuk dilakukan di SatuNusaMC.
            </p>
          </div>
        </div>
      </section>

      {/* Semi Anarchy Promo Section */}
      <section className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="card p-8 md:p-12">
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-3">
              <span className="animate-ping w-2 h-2 rounded-full bg-emerald-400" />
              SERVER TERBARU & MASIH FRESH!
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
              SatuNusaMC — <span className="text-emerald-400">Semi Anarchy Economy</span>
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto text-center">
              Bangun ekonomi, kumpulkan kekayaan, dan jadilah yang teratas!
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6">
            {[
              { img: '/icons/shop.webp', label: "Shop System" },
              { img: '/icons/gacha.webp', label: "Gacha" },
              { img: '/icons/trophy.webp', label: "Leaderboard" },
              { img: '/icons/world.webp', label: "Custom World" },
              { img: '/icons/coin.webp', label: "CoinFlip" },
              { img: '/icons/banner.webp', label: "Battle Pass" },
              { img: '/icons/clock.webp', label: "Daily Rewards" },
              { img: '/icons/mystery-box.webp', label: "Dan masih banyak lagi!" },
            ].map((item, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#1f1f23] border border-[#2a2a30] hover:border-emerald-500/30 transition-colors"
              >
                <img src={item.img} alt="" width={56} height={56} loading="lazy" draggable={false} className="w-14 h-14 object-contain mb-2" />
                <span className="text-sm font-medium text-slate-300 text-center">{item.label}</span>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery / Screenshot Placeholder Section */}
      <section className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeading
          title="Galeri Server"
          desc="Screenshot gameplay, build pemain, dan momen seru di SatuNusaMC."
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {GALLERY.map((item, i) => (
            <m.button
              key={item.src + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Perbesar gambar ${item.title || `nomor ${i + 1}`}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-[#1f1f23] bg-[#111113] text-left cursor-zoom-in transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_18px_44px_rgba(0,0,0,0.55)]"
            >
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/55 backdrop-blur text-white flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4" />
              </span>

              <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 pt-12 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                <h3 className="text-white font-semibold text-sm md:text-base">{item.title}</h3>
                <p className="text-[11px] md:text-xs text-slate-300 line-clamp-2">{item.desc}</p>
              </div>
            </m.button>
          ))}
        </div>
      </section>

      {/* Core Features Section */}
      <section className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeading
          eyebrow="FITUR"
          title="Fitur Utama"
          desc="Sistem dan fitur inti yang membuat pengalaman bermain di SatuNusaMC menjadi unik."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_FEATURES.map((f, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-16 h-16 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                <img src={f.img} alt="" width={48} height={48} loading="lazy" draggable={false} className="w-12 h-12 object-contain" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-[var(--muted)]">{f.desc}</p>
            </m.div>
          ))}
        </div>
      </section>

      {/* Gameplay Systems Section */}
      <section className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeading
          eyebrow="SISTEM"
          title="Sistem Gameplay"
          desc="Berbagai sistem pendukung yang memperkaya pengalaman Survival di server."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {GAMEPLAY_SYSTEMS.map((sys, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="card flex items-start gap-4 p-4"
            >
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                <img src={sys.img} alt="" width={36} height={36} loading="lazy" draggable={false} className="w-9 h-9 object-contain" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white mb-1">{sys.title}</h3>
                <p className="text-sm text-[var(--muted)]">{sys.desc}</p>
              </div>
            </m.div>
          ))}
        </div>
      </section>

      {/* Ranks Section */}
      <section className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeading
          eyebrow="RANK"
          title="Rank & Keuntungan"
          desc="Tingkatkan pengalaman bermainmu dengan pilihan rank yang tersedia di SatuNusaMC."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {RANKS.map((rank, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card text-center hover:-translate-y-2 transition-transform duration-300"
            >
              <h3 className={`text-2xl font-bold ${rank.theme.text} mb-2`}>{rank.name}</h3>
              <p className="text-sm text-slate-400">{rank.description}</p>
            </m.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <SpringButton to="/store" className="w-full sm:w-auto">
            Lihat Detail Rank
          </SpringButton>
        </div>
      </section>

      {/* Community Section */}
            <section className="max-w-7xl mx-auto px-4 relative z-10">
              <div className="card p-8 md:p-12 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Bergabunglah dengan Komunitas Kami</h2>
                <p className="text-slate-300 mb-6 text-center">
                  Bergabunglah dengan WhatsApp grup SatuNusaMC untuk berita terbaru, event, dan diskusi dengan pemain lainnya.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <SpringButton href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                    Join WhatsApp
                  </SpringButton>
                  <a
                    href={SITE.discordInvite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-discord inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold w-full sm:w-auto"
                  >
                    <DiscordIcon className="h-5 w-5" />
                    Gabung Discord
                  </a>
                  <SpringButton href={SITE.whatsappNumber ? `https://wa.me/${SITE.whatsappNumber}` : '#'} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                    WhatsApp Admin
                  </SpringButton>
                </div>
              </div>
            </section>

      {/* News Section */}
      <section className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeading
          eyebrow="BERITA"
          title="Berita Terbaru"
          desc="Update terbaru, informasi event, dan catatan patch server."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NEWS.map((n) => (
            <div key={n.id} className="card">
              <h3 className="text-lg font-semibold text-white mb-2">{n.title}</h3>
              <p className="text-sm text-[var(--muted)] mb-4">{n.description}</p>
              <span className="text-xs text-slate-400">{n.date}</span>
            </div>
          ))}
        </div>
      </section>

      <Lightbox items={GALLERY} index={active} onClose={() => setActive(null)} onChange={setActive} />
    </div>
  );
}