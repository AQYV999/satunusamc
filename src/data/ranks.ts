export type RankTheme = {
  accent: string;
  glow: string;
  solid: string;
  onSolid: string;
  text: string;
  iconBox: string;
  check: string;
};

export type Rank = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: string | null;
  inherits?: string;
  benefits: string[];
  popular?: boolean;
  solidCta?: boolean;
  image: string;
  theme: RankTheme;
};

export const RANKS: Rank[] = [
  {
    id: 'rookie', name: 'ROOKIE', tagline: 'Awal petualangan', image: '/icons/rookie.png', price: 'Rp 15.000',
    description: 'Mulai perjalananmu dengan perlengkapan tambahan untuk Survival.',
    benefits: ['5 Max Home', 'Akses /enderchest', 'Akses /craft', '500 Claim Block', 'Kit [rookie]'],
    theme: { 
      accent: 'rgba(74,222,128,0.55)',  // Hijau (Minecraft §a)
      glow: 'rgba(74,222,128,0.14)', 
      solid: '#4ade80', 
      onSolid: '#052e16',
      text: 'text-green-300', 
      iconBox: 'bg-green-500/15 text-green-300', 
      check: 'text-green-400' 
    },
  },
  {
    id: 'knight', name: 'KNIGHT', tagline: 'Pilihan favorit', image: '/icons/knight.png', price: 'Rp 25.000',
    inherits: 'ROOKIE', solidCta: true, popular: true,
    description: 'Tingkatkan perjalananmu dengan akses ke kit rank Knight.',
    benefits: ['8 Max Home', 'Akses /nick', 'Akses /repair', 'Akses /hat', '2000 Claim Block'],
    theme: { 
      accent: 'rgba(34,211,238,0.65)',  // Cyan (Minecraft §b)
      glow: 'rgba(34,211,238,0.2)', 
      solid: '#22d3ee', 
      onSolid: '#083344',
      text: 'text-cyan-300', 
      iconBox: 'bg-cyan-500/15 text-cyan-300', 
      check: 'text-cyan-400' 
    },
  },
  {
    id: 'lord', name: 'LORD', tagline: 'Bangsawan server', image: '/icons/lord.png', price: 'Rp 45.000',
    inherits: 'KNIGHT',
    description: 'Kit rank Lord dan keuntungan lebih besar untuk pemain aktif.',
    benefits: ['10 Max Home', 'Akses /fly', 'Akses /heal', 'Akses /feed', 'Akses /repair all', '5000 Claim Block'],
    theme: { 
      accent: 'rgba(250,204,21,0.65)',  // Kuning (Minecraft §e)
      glow: 'rgba(250,204,21,0.2)', 
      solid: '#facc15', 
      onSolid: '#422006',
      text: 'text-yellow-300', 
      iconBox: 'bg-yellow-500/15 text-yellow-300', 
      check: 'text-yellow-400' 
    },
  },
  {
    id: 'eternal', name: 'ETERNAL', tagline: 'Rank tertinggi', image: '/icons/eternal.png', price: 'Rp 85.000',
    inherits: 'LORD', solidCta: true,
    description: 'Untuk pemain yang ingin keuntungan eksklusif dan prioritas penuh.',
    benefits: ['15 Max Home', 'Akses /anvil', 'Akses /grindstone', '10000 Claim Block'],
    theme: { 
      accent: 'rgba(232,121,249,0.7)',  // Magenta/Pink (Minecraft §d)
      glow: 'rgba(232,121,249,0.24)', 
      solid: '#e879f9', 
      onSolid: '#4a044e',
      text: 'text-fuchsia-300', 
      iconBox: 'bg-fuchsia-500/15 text-fuchsia-300', 
      check: 'text-fuchsia-400' 
    },
  },
];
