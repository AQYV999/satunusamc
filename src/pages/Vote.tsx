import { useEffect, useState } from 'react';
import { VOTE_SITES } from '../data/votes';
import { TOP_VOTERS, type Voter } from '../data/voters';
import { fetchVotersFromSheet } from '../lib/votersSheet';
import { SITE } from '../config/site';
import { TiltCard } from '../components/TiltCard';
import { SpringButton } from '../components/SpringButton';
import { Crown, Medal } from 'lucide-react';

export function Vote() {
  const [voters, setVoters] = useState<Voter[]>(SITE.votersSheetUrl ? [] : TOP_VOTERS);

  useEffect(() => {
    if (!SITE.votersSheetUrl) return;
    let alive = true;
    fetchVotersFromSheet(SITE.votersSheetUrl)
      .then((list) => { if (alive) setVoters(list); })
      .catch(console.error)
      .finally(() => { });
    return () => { alive = false; };
  }, []);

  const sortedVoters = [...voters].sort((a, b) => b.votes - a.votes);
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <h1 className="text-4xl font-extrabold text-white">Vote Server</h1>
        <p className="text-slate-400">Vote server di setiap tautan di bawah untuk mendukung SatuNusaMC dan dapatkan hadiah in-game.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {VOTE_SITES.map((site) => (
          <TiltCard key={site.id} className="card flex flex-col justify-between text-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">{site.name}</h2>
              <p className="text-sm text-slate-400">{site.description}</p>
              {site.reward && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs">
                  🎁 {site.reward}
                </div>
              )}
            </div>
            <div className="pt-6 mt-6 border-t border-[#1f1f23]">
              {site.url !== '#' ? (
                <SpringButton
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  Vote Sekarang →
                </SpringButton>
              ) : (
                <button
                  type="button"
                  className="btn btn-disabled w-full cursor-not-allowed"
                  disabled
                  title="Link voting belum dikonfigurasi oleh owner."
                >
                  Vote Sekarang →
                </button>
              )}
            </div>
          </TiltCard>
        ))}
      </div>

      {/* Top Voters Section */}
      <div className="mt-20 max-w-3xl mx-auto">
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 mb-2">
            <Crown className="w-6 h-6 text-emerald-400" aria-hidden="true" />
          </div>
          <h2 className="text-3xl font-extrabold text-white">Top Voters</h2>
          <p className="text-slate-400 text-sm">Pemain yang paling rajin mendukung server bulan ini.</p>
        </div>

        <div className="card !p-0 overflow-hidden">
          <div className="divide-y divide-white/5">
            {sortedVoters.map((voter, index) => (
              <div key={voter.id} className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                  index === 0 ? 'bg-yellow-400/20 text-yellow-400' : 
                  index === 1 ? 'bg-slate-300/20 text-slate-300' : 
                  index === 2 ? 'bg-amber-600/20 text-amber-500' : 
                  'text-slate-500 bg-transparent'
                }`}>
                  {index === 0 ? <Crown className="w-4 h-4" aria-hidden="true" /> : 
                   index === 1 || index === 2 ? <Medal className="w-4 h-4" aria-hidden="true" /> : 
                   `#${index + 1}`}
                </div>
                
                <div className="w-10 h-10 rounded-lg bg-black overflow-hidden border border-[#27272a] shrink-0 hidden sm:block">
                  <img 
                    src={`https://mc-heads.net/avatar/${encodeURIComponent(voter.name)}/64`} 
                    alt={`Skin ${voter.name}`}
                    loading="lazy"
                    draggable={false}
                    className="w-full h-full object-cover [image-rendering:pixelated]"
                  />
                </div>

                <span className="flex-1 font-semibold text-white truncate">{voter.name}</span>
                <span className="text-sm font-bold text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-full whitespace-nowrap">
                  {voter.votes} Vote{voter.votes > 1 ? 's' : ''}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
