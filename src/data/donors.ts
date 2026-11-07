export type Donor = {
  id: string;
  name: string;       // nama tampilan di web
  ign: string;        // username Minecraft Java (untuk skin kepala)
  amount: number;     // total donasi dalam rupiah
  anonymous?: boolean; // true = tampil sebagai "Anonim"
};

// Isi dengan link CSV dari Google Sheet (File > Bagikan > Publikasikan ke web > CSV).
// Kalau kosong, halaman memakai data manual DONORS di atas.