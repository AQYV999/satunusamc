import { SITE } from '../config/site';

export type WikiSection = {
  id: string;
  title: string;
  items: { title: string; content: string }[];
};

// Placeholder content — owner dapat menambahkan tutorial lebih lanjut
export const WIKI: WikiSection[] = [
  {
    id: 'getting-started',
    title: 'Memulai',
    items: [
      {
        title: 'Apa itu SatuNusaMC?',
        content: 'SatuNusaMC adalah server Minecraft Indonesia yang menyediakan pengalaman bermain minimalist dan nyaman.',
      },
      {
        title: 'Membuat akun Minecraft',
        content: 'Kunjungi minecraft.net untuk membeli dan membuat akun Minecraft Java Edition.',
      },
    ],
  },
  {
    id: 'how-to-join',
    title: 'Cara Bergabung',
    items: [
      {
        title: 'Java Edition',
        content: `Buka Minecraft Launcher, pilih Multiplayer, lalu tambahkan server dengan alamat ${SITE.ip}.`,
      },
      {
        title: 'Bedrock Edition',
        content: `Buka Minecraft Bedrock, pilih Servers, tambahkan server baru dengan alamat ${SITE.ip} dan port ${SITE.bedrockPort}.`,
      },
    ],
  },
  {
    id: 'commands',
    title: 'Perintah Server',
    items: [
      { title: '/help', content: 'Menampilkan daftar perintah yang tersedia.' },
      { title: '/rules', content: 'Menampilkan aturan server.' },
      { title: '/tutorial', content: 'Membuka panduan tutorial server.' },
      { title: '/voting', content: 'Membuka halaman voting untuk mendapatkan reward.' },
      { title: '/ranks', content: 'Menampilkan daftar rank yang tersedia.' },
      { title: '/shop', content: 'Membuka toko server untuk membeli item dan rank.' },
      { title: '/sellgui', content: 'Membuka antarmuka menjual item.' },
      { title: '/rtp', content: 'Teleportasi acak ke lokasi baru di dunia.' },
    ],
  },
  {
    id: 'gameplay-guide',
    title: 'Panduan Gameplay',
    items: [
      { title: 'Memulai bermain', content: 'Kumpulkan sumber daya, bangun tempat tidur, dan jelajahi dunia server.' },
    ],
  },
  {
    id: 'faq',
    title: 'Pertanyaan Umum',
    items: [
      { title: 'Apakah server gratis?', content: 'Ya, bergabung ke server gratis. Fitur tambahan tersedia melalui pembelian rank.' },
    ],
  },
];