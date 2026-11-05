import { SITE, isWhatsAppUrlConfigured } from '../config/site';
export function DiscordButton({ label = 'Gabung WhatsApp' }: { label?: string }) {
  if (!isWhatsAppUrlConfigured()) {
    return <button disabled className="btn btn-disabled">WhatsApp Belum Tersedia</button>;
  }
  return (
    <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sky">
      {label}
    </a>
  );
}