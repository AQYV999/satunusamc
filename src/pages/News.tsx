import { NEWS } from '../data/news';
import { TiltCard } from '../components/TiltCard';

export function News() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-4xl font-extrabold text-white">Berita & Pengumuman</h1>
        <p className="text-slate-400">Update terbaru, informasi event, dan catatan patch server.</p>
      </div>
      <div className="space-y-4">
        {NEWS.map((item) => (
          <TiltCard key={item.id} className="card space-y-4 text-center">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {item.category}
              </span>
              <span className="text-xs text-slate-500">{item.date}</span>
            </div>
            <h2 className="text-2xl font-bold text-white">{item.title}</h2>
            <p className="text-slate-300 leading-relaxed">{item.content || item.description}</p>
          </TiltCard>
        ))}
      </div>
    </div>
  );
}
