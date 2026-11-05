export type StaffMember = {
  id: string;
  username: string; // nama yang tampil di web
  ign: string;      // username Minecraft Java (untuk skin kepala)
  role: string;
};

export const skinHead = (ign: string, size = 128) =>
  `https://mc-heads.net/avatar/${encodeURIComponent(ign)}/${size}`;

export const STAFF: StaffMember[] = [
  { id: 'itzby',  username: 'ItzBy',  ign: 'ItzBy',  role: 'Owner' },
  { id: 'litch',  username: 'litch',  ign: 'litch',  role: 'Developer' },
  { id: 'panwc',  username: 'Panwc',  ign: 'Panwc',  role: 'Staff' },
  { id: 'lanna',  username: 'Lanna',  ign: 'Lanna',  role: 'Staff' },
  { id: 'bamzyy', username: 'Bamzyy', ign: 'Bamzyy', role: 'Staff' },
];