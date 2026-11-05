import { ShieldAlert } from 'lucide-react';
import { RULES } from '../data/rules';

export function Rules() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-6">
      <h1 className="text-4xl md:text-7xl font-extrabold text-white text-center mb-8">
        Peraturan Server
      </h1>
      {RULES.categories.map((cat, idx) => (
        <div key={idx} className="card space-y-4">
          <div className="flex items-center gap-3 px-4 py-3">
            <ShieldAlert className="w-5 h-5 text-emerald-400" />
            <span className="text-lg font-semibold text-white">{cat.title}</span>
          </div>
          <ul className="space-y-2 text-slate-300 text-base leading-relaxed text-center px-4 pb-4">
            {cat.rules.map((r, i) => (
              <li key={i}>• {r}</li>
            ))}
          </ul>
        </div>
      ))}
      <div className="card space-y-4">
        <div className="flex items-center gap-3 px-4 py-3">
          <ShieldAlert className="w-5 h-5 text-emerald-400" />
          <span className="text-lg font-semibold text-white">Sanksi</span>
        </div>
        <ul className="space-y-2 text-slate-300 text-base leading-relaxed text-center px-4 pb-4">
          {RULES.punishment.map((p, i) => (
            <li key={i}>• {p}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}