import { STAFF, skinHead } from '../data/staff';

const ROLE_STYLE: Record<string, string> = {
  Owner: 'bg-amber-500/10 text-amber-300 border-amber-500/25',
  Developer: 'bg-sky-500/10 text-sky-300 border-sky-500/25',
};
const DEFAULT_ROLE_STYLE = 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25';

export function Staff() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
        <h1 className="text-4xl font-extrabold text-white">Tim Staf Server</h1>
        <p className="text-slate-400">
          Kenali para pengurus yang siap membantu menjaga kenyamanan dan keamanan server.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-5">
        {STAFF.map((m) => (
          <div
            key={m.id}
            className="card-flat group p-5 flex flex-col items-center text-center gap-3
                       w-[calc(50%-0.625rem)] sm:w-[calc(33.333%-0.84rem)] lg:w-[calc(20%-1rem)]"
          >
            <div className="w-20 h-20 rounded-xl bg-black overflow-hidden border border-[#27272a] group-hover:border-emerald-500/50 transition-colors">
              <img
                src={skinHead(m.ign)}
                alt={`Skin ${m.username}`}
                width={80}
                height={80}
                loading="lazy"
                draggable={false}
                className="w-full h-full object-cover [image-rendering:pixelated]"
              />
            </div>
            <h2 className="font-display text-lg font-bold uppercase tracking-wide text-white leading-tight">
              {m.username}
            </h2>
            <span
              className={`px-3 py-0.5 rounded-full text-xs font-semibold border ${
                ROLE_STYLE[m.role] ?? DEFAULT_ROLE_STYLE
              }`}
            >
              {m.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}