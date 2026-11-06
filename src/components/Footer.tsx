import { Link } from 'react-router-dom';
import { SITE, NAVIGATION } from '../config/site';
import { DiscordIcon } from '../components/icons/DiscordIcon';

export function Footer() {
  return (
    <footer className="bg-[#0b0b0e] border-t border-[#1f1f23] text-slate-400">
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <img
              src="/logo.jpg"
              alt="SatuNusaMC Logo"
              className="w-9 h-9 rounded-xl object-cover"
            />
            <span className="text-xl font-bold font-display text-white">{SITE.name}</span>
          </div>
          <p className="text-sm max-w-sm text-slate-400 leading-relaxed">{SITE.description}</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 font-display">Navigasi</h4>
          <ul className="space-y-2.5 text-sm">
            {NAVIGATION.map((item) => (
              <li key={item.name}>
                <Link to={item.href} className="hover:text-emerald-400 transition-colors">{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 font-display">Hubungi Kami</h4>
          <p className="text-sm text-slate-400 mb-2">Email: {SITE.supportEmail}</p>
          <p className="text-sm text-slate-400">WhatsApp: <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">SatuNusaMC</a></p>
          <a href={SITE.discordInvite} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-2 text-sm text-[#BCC2FF] hover:text-white transition-colors">
            <DiscordIcon className="h-4 w-4" /> Discord
          </a>
        </div>
      </div>
      <div className="border-t border-[#1f1f23] py-6 text-center text-xs text-slate-500">
        {SITE.footerCopyright}
      </div>
    </footer>
  );
}