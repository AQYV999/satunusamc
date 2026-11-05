export type Donor = {
  id: string;
  name: string;       // nama tampilan di web
  ign: string;        // username Minecraft Java (untuk skin kepala)
  amount: number;     // total donasi dalam rupiah
  anonymous?: boolean; // true = tampil sebagai "Anonim"
};

// PLACEHOLDER — ganti dengan data donatur asli sebelum website dipublikasikan.
// Urutan di sini bebas, halaman otomatis mengurutkan dari nominal terbesar.
export const DONORS: Donor[] = [
  { id: 'd1', name: 'Donatur Satu',  ign: 'DonaturSatu',  amount: 250000 },
  { id: 'd2', name: 'Donatur Dua',   ign: 'DonaturDua',   amount: 150000 },
  { id: 'd3', name: 'Donatur Tiga',  ign: 'DonaturTiga',  amount: 100000 },
  { id: 'd4', name: 'Donatur Empat', ign: 'DonaturEmpat', amount: 75000 },
  { id: 'd5', name: 'Donatur Lima',  ign: 'DonaturLima',  amount: 50000, anonymous: true },
];

// Isi dengan link CSV dari Google Sheet (File > Bagikan > Publikasikan ke web > CSV).
// Kalau kosong, halaman memakai data manual DONORS di atas.