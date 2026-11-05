import { WIKI } from '../data/wiki';

export function Wiki() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-20 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-white">Panduan & Wiki</h1>
        <p className="text-slate-400">Dokumentasi lengkap seputar fitur, perintah, dan cara bermain di SatuNusaMC.</p>
      </div>
      <div className="space-y-10">
        {WIKI.map((section) => (
          <div key={section.id} className="card space-y-6">
            <h2 className="text-2xl font-bold text-emerald-400 border-b border-[#1f1f23] pb-3">
              {section.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.items.map((item, idx) => (
                <div key={idx} className="card-flat p-5 space-y-2">
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed text-center">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}