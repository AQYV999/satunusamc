/** KONFIGURASI PUSAT — satu-satunya tempat untuk mengubah identitas server. * Semua halaman membaca nilai dari file ini; jangan hardcode di komponen. */
export const SITE = {
  name: 'SatuNusaMC',
  tagline: 'Network Minecraft Indonesia',
  description:
    'Server Minecraft Indonesia yang minimalis, stabil, dan ramah komunitas. Main bareng, bangun bareng, tumbuh bareng.',
  // PLACEHOLDER — ganti dengan alamat server yang sebenarnya
  ip: 'play.satunusa.my.id',
  edition: 'Java & Bedrock',
  // PLACEHOLDER — ganti dengan port Bedrock yang sebenarnya
  bedrockPort: 13378,
  // PLACEHOLDER — ganti dengan undangan WhatsApp yang sebenarnya (grup/komunitas)
  whatsappUrl: 'https://chat.whatsapp.com/LNYqUv2iL9xDCXLbOEXdXh',
  // PLACEHOLDER — ganti dengan nomor admin, format 62xxx tanpa '+' atau spasi
  whatsappNumber: '6285333181671',
  supportEmail: 'support@satunusamc.id',
  footerCopyright: '© 2026 SatuNusaMC. Seluruh hak dilindungi.',
} as const;

const PLACEHOLDER_WHATSAPP = '628123456789';
const PLACEHOLDER_WHATSAPP_URL = 'https://chat.whatsapp.com/xxxxxxxxxxxxxxxx';

/** False jika nomor WhatsApp masih placeholder/kosong — UI menampilkan state tidak tersedia. */
export const isWhatsAppConfigured = (): boolean => {
  const n = SITE.whatsappNumber.trim();
  return /^\d{9,15}$/.test(n) && n !== PLACEHOLDER_WHATSAPP;
};

/** False jika URL WhatsApp masih placeholder/kosong. */
export const isWhatsAppUrlConfigured = (): boolean => {
  const u = SITE.whatsappUrl.trim();
  return u.startsWith('https://') && u !== PLACEHOLDER_WHATSAPP_URL;
};

/** Bangun link Click-to-Chat WhatsApp dengan pesan ter-encode. */
export const whatsappLink = (message: string): string =>
  `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const NAVIGATION = [
  { name: 'Home', href: '/' },
  { name: 'Store', href: '/store' },
  { name: 'Vote', href: '/vote' },
  { name: 'Donatur', href: '/donatur' },
  { name: 'Rules', href: '/rules', group: 'more' },
  { name: 'News', href: '/news', group: 'more' },
  { name: 'Staff', href: '/staff', group: 'more' },
  { name: 'Support', href: '/support', group: 'more' },
  { name: 'Wiki', href: '/wiki', group: 'more' },
] as const;
