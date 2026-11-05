import type { Voter } from '../data/voters';
import { parseCsv } from './csv';

export async function fetchVotersFromSheet(url: string): Promise<Voter[]> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const rows = parseCsv(await res.text());
  if (rows.length < 2) return [];

  const head = rows[0].map((h) => h.trim().toLowerCase());
  const col = (...keys: string[]) => head.findIndex((h) => keys.includes(h));
  const iName = col('name', 'nama', 'ign');
  const iVotes = col('votes', 'vote', 'jumlah');
  if (iName < 0 || iVotes < 0) throw new Error('Kolom sheet tidak sesuai');

  const merged = new Map<string, Voter>();
  rows.slice(1).forEach((r, idx) => {
    const name = (r[iName] ?? '').trim();
    const votes = Number((r[iVotes] ?? '').replace(/\D/g, ''));
    if (!name || !votes) return;
    const key = name.toLowerCase();
    const prev = merged.get(key);
    if (prev) {
      prev.votes += votes;
    } else {
      merged.set(key, { id: String(idx), name, votes });
    }
  });
  return [...merged.values()];
}
