import { m } from 'framer-motion';

export function PageLoader() {
  return (
    <div role="status" aria-label="Memuat halaman" className="space-y-8">
      <div className="skeleton h-12 w-2/3 max-w-xs mx-auto" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <m.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="skeleton !rounded-2xl h-48"
          />
        ))}
      </div>
    </div>
  );
}
