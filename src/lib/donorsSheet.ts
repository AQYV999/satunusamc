import type { Donor } from '../data/donors';
import { parseCsv } from './csv';

export async function fetchDonorsFromSheet(url: string): Promise<Donor[]> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const rows = parseCsv(await res.text());
  if (rows.length < 2) return [];

  const head = rows[0].map((h) => h.trim().toLowerCase());
  const col = (...keys: string[]) => head.findIndex((h) => keys.includes(h));
  const iName = col('name', 'nama');
  const iIgn = col('ign');
  const iAmt = col('amount', 'nominal');
  const iAnon = col('anonymous', 'anonim');
  if (iAmt < 0 || (iName < 0 && iIgn < 0)) throw new Error('Kolom sheet tidak sesuai');

  const merged = new Map<string, Donor>();
  rows.slice(1).forEach((r) => {
    const name = (r[iName] ?? '').trim();
    const ign = (r[iIgn] ?? '').trim();
    const amount = Number((r[iAmt] ?? '').replace(/\D/g, ''));
    if ((!name && !ign) || !amount) return;
    const anon = ['ya', 'y', 'true', '1', 'x'].includes((r[iAnon] ?? '').trim().toLowerCase());
    const key = (ign || name).toLowerCase();
    const prev = merged.get(key);
    if (prev) {
      prev.amount += amount;
      prev.anonymous = prev.anonymous || anon;
    } else {
      merged.set(key, { id: key, name: name || ign, ign: ign || name, amount, anonymous: anon });
    }
  });
  return [...merged.values()];
}