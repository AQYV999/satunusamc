import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, MessageCircle, Phone } from 'lucide-react';
import { SITE, isWhatsAppConfigured, isWhatsAppUrlConfigured, whatsappLink } from '../config/site';
import { DiscordIcon } from '../components/icons/DiscordIcon';

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: 'Bagaimana cara bergabung ke server?',
    a: <>Buka Minecraft, pilih Multiplayer, klik Add Server, masukkan IP: <code className="font-mono bg-slate-800 px-1 rounded">{SITE.ip}</code>. Bedrock gunakan port {SITE.bedrockPort}.</>,
  },
  {
    q: 'Apakah server crossplay Java & Bedrock?',
    a: <>Ya, SatuNusaMC mendukung crossplay Java Edition dan Bedrock Edition (PE/Win10/Consol). Gunakan IP yang sama, port Bedrock: {SITE.bedrockPort}.</>,
  },
  {
    q: 'Bagaimana cara beli rank?',
    a: <>Kunjungi halaman <Link to="/store" className="text-emerald-400 underline">Store</Link> dan hubungi admin untuk pembayaran dan aktivasi rank.</>,
  },
  {
    q: 'Apa yang harus dilakukan jika mengalami bug/lag?',
    a: <>Lapor di WhatsApp grup komunitas atau hubungi admin via WhatsApp. Sertakan screenshot/video dan koordinat jika memungkinkan.</>,
  },
];

export function Support() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-4 py-24 space-y-12">
      <h1 className="text-4xl md:text-7xl font-extrabold text-white text-center mb-8">
        Bantuan & Dukungan
      </h1>

      {/* Contact Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href={SITE.discordInvite}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-discord inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold w-full sm:w-auto"
        >
          <DiscordIcon className="h-5 w-5" />
          Gabung Discord
        </a>
        {isWhatsAppUrlConfigured() ? (
          <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sky">
            Gabung WhatsApp
          </a>
        ) : (
          <button
            className="btn w-full sm:w-auto"
            style={{ border: '2px dashed #2A231A', color: '#7D7466', cursor: 'not-allowed', background: 'rgba(255,255,255,0.03)' }}
            disabled
          >
            <MessageCircle className="w-5 h-5" /> WhatsApp Grup (Belum dikonfigurasi)
          </button>
        )}
        {isWhatsAppConfigured() ? (
          <a
            href={whatsappLink('Halo admin SatuNusaMC, saya butuh bantuan.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary inline-flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <Phone className="w-5 h-5" /> Chat Admin
          </a>
        ) : (
          <button
            className="btn w-full sm:w-auto"
            style={{ border: '2px dashed #2A231A', color: '#7D7466', cursor: 'not-allowed', background: 'rgba(255,255,255,0.03)' }}
            disabled
          >
            <Phone className="w-5 h-5" /> Chat Admin (Belum dikonfigurasi)
          </button>
        )}
      </div>

      {/* FAQ Section */}
      <section>
        <h2 className="text-3xl font-bold text-white text-center mb-8">Pertanyaan Umum (FAQ)</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const panelId = `faq-panel-${idx}`;
            const buttonId = `faq-button-${idx}`;
            return (
              <div key={idx} className="card">
                <button
                  id={buttonId}
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex items-center justify-between w-full text-left p-4 rounded-xl"
                  aria-expanded={openFaq === idx}
                  aria-controls={panelId}
                >
                  <span className="text-lg font-semibold text-white">{faq.q}</span>
                  <ChevronDown
                    aria-hidden="true"
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === idx && (
                    <m.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden px-4 pb-4"
                    >
                      <div className="text-slate-300 text-sm leading-relaxed text-center">{faq.a}</div>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}