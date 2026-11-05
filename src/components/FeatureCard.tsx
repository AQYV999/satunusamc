export function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="card">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}