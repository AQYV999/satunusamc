export type RuleCategory = {
  title: string;
  rules: string[];
};

export type RulesData = {
  categories: RuleCategory[];
  punishment: string[];
};

// Placeholder content — owner harus menyesuaikan dengan kebijakan server asli
export const RULES: RulesData = {
  categories: [
    {
      title: 'Anti-Cheat & Exploitation',
      rules: [
        'Dilarang menggunakan X-Ray, hacked client, cheat, macro, auto-clicker, eksploitasi bug, maupun melakukan duplikasi item dan uang.',
      ],
    },
    {
      title: 'Anti-Griefing',
      rules: [
        'Hormati wilayah dan hasil kerja keras pemain lain. Jangan merusak bangunan, mengambil barang, atau mengganggu area milik pemain lain.',
      ],
    },
    {
      title: 'Fair Economy',
      rules: [
        'Dilarang melakukan penipuan, manipulasi ekonomi, penyalahgunaan bug ekonomi, dan perdagangan hasil eksploitasi.',
      ],
    },
    {
      title: 'Chat & Communication',
      rules: [
        'Jaga komunikasi tetap sopan. Hindari spam, penghinaan, provokasi, diskriminasi, dan konten yang tidak pantas.',
      ],
    },
    {
      title: 'Account & Staff Security',
      rules: [
        'Dilarang mengambil alih akun orang lain, menyebarkan informasi pribadi, mengancam pemain, menyamar sebagai staff, maupun membuat laporan palsu.',
      ],
    },
    {
      title: 'Advertisement',
      rules: [
        'Promosi server lain atau penyebaran IP server lain tanpa izin staff tidak diperbolehkan.',
      ],
    },
  ],
  punishment: [
    'Pelanggaran dapat dikenakan sanksi sesuai kebijakan staff, termasuk permanent ban untuk pelanggaran berat.',
  ],
};
