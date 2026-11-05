import { SITE, isWhatsAppConfigured, whatsappLink } from '../config/site';
export function WhatsAppButton({ rankName, label = 'Beli Rank' }: { rankName: string; label?: string }) {
  if (!isWhatsAppConfigured()) {
    return <button disabled className="btn btn-disabled">WhatsApp Belum Tersedia</button>;
  }
  const msg = `Halo, saya ingin membeli rank ${rankName} di ${SITE.name}. Mohon info pembayaran.`;
  return (
    <a href={whatsappLink(msg)} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
      {label}
    </a>
  );
}