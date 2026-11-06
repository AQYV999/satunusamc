export type NewsItem = {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  content?: string;
};

// Berita terbaru di urutan paling atas
export const NEWS: NewsItem[] = [
  {
    id: 'maintenance-migrasi-hosting',
    title: 'Maintenance: Migrasi Hosting',
    date: '6 November 2026',
    category: 'Maintenance',
    description: 'Server sedang menjalani migrasi hosting. Mohon tunggu — perkembangan terbaru diumumkan di grup.',
    content: 'SatuNusaMC sedang melakukan MAINTENANCE MIGRASI HOSTING. Selama proses ini, server bisa jadi tidak bisa diakses untuk sementara. Migrasi ini supaya server lebih stabil dan nyaman dimainkan. Pantau grup untuk info kapan server sudah kembali online. Terima kasih atas pengertiannya!',
  },
  {
    id: 'fix-bug-bedrock',
    title: 'Fix Bug Bedrock: Kini Bisa Join Lagi!',
    date: '31 Oktober 2026',
    category: 'Perbaikan',
    description: 'Bedrock kini sudah bisa join kembali seperti biasa. Mohon maaf atas ketidaknyamanannya.',
    content: '🔧 Fix Bug Bedrock — Bedrock kini sudah bisa join kembali seperti biasa! Mohon maaf atas ketidaknyamanannya. Sebelumnya terdapat kendala akibat pembaruan sistem Bedrock yang memengaruhi koneksi ke server. Sekarang sudah normal kembali — silakan langsung tes masuk!',
  },
  {
    id: 'ip-baru-bedrock-sementara',
    title: 'IP Baru Sementara untuk Player Bedrock',
    date: '31 Oktober 2026',
    category: 'Pengumuman',
    description: 'Untuk sementara, player Bedrock login pakai IP berikut: lovelace.nexuscloud.id Port 13378.',
    content: 'Untuk sementara, player Bedrock pakai IP ini:\nIP: lovelace.nexuscloud.id\nPORT: 13378\nSimpan alamat ini, dan pantau pengumuman berikutnya kalau IP sudah kembali ke alamat utama.',
  },
];
