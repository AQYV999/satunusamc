export type NewsItem = {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  content?: string;
};

// Placeholder content — owner dapat mengedit / menambahkan berita di sini
export const NEWS: NewsItem[] = [
  {
    id: 'server-launch',
    title: 'Peluncuran Server Resmi',
    date: '31 Oktober 2026',
    category: 'Pengumuman',
    description: 'Server SatuNusaMC resmi diluncurkan. Bergabunglah sekarang dan rasakan pengalaman bermain yang nyaman.',
    content: 'Kami dengan bangga mengumumkan peluncuran resmi server SatuNusaMC. Terima kasih kepada semua komunitas yang telah mendukung.',
  },
  {
    id: 'update-1-21',
    title: 'Update ke Minecraft 1.21',
    date: '25 Oktober 2026',
    category: 'Update',
    description: 'Server telah diupdate ke versi Minecraft 1.21 dengan fitur terbaru.',
    content: 'Versi Minecraft 1.21 kini tersedia di server kami. Coba fitur trial chamber dan lainnya.',
  },
  {
    id: 'maintenance',
    title: 'Jadwal Maintenance Mingguan',
    date: '20 Oktober 2026',
    category: 'Maintenance',
    description: 'Maintenance rutin akan dilakukan setiap hari Sabtu pukul 02.00 WIB.',
    content: 'Mohon maaf atas ketidaknyamanan. Server akan kembali online secepatnya setelah maintenance selesai.',
  },
];
