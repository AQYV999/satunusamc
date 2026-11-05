export type VoteSite = {
  id: string;
  name: string;
  description: string;
  url: string; // placeholder, owner harus mengisi URL voting asli
  reward?: string;
};

// Placeholder content — URL voting belum tersedia, ganti dengan link asli
export const VOTE_SITES: VoteSite[] = [
  {
    id: 'minecraft-mp',
    name: 'Minecraft-MP',
    description: 'Situs voting terpopuler untuk server Minecraft.',
    url: 'https://minecraft-mp.com/server/365846/vote/',
    reward: 'Hadiah voting akan diterapkan melalui NuVotifier.',
  },
  {
    id: 'minecraft-server-list',
    name: 'Minecraft Server List',
    description: 'Daftarkan dan vote server favoritmu.',
    url: '#',
    reward: 'Hadiah voting akan diterapkan melalui NuVotifier.',
  },
  {
    id: 'topg',
    name: 'TopG',
    description: 'Platform voting server game terkemuka.',
    url: '#',
    reward: 'Hadiah voting akan diterapkan melalui NuVotifier.',
  },
];
