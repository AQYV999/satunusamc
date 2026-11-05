import { m } from 'framer-motion';
import { SpringButton } from '../components/SpringButton';

export function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20">
      <m.p
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="shimmer-text text-8xl md:text-9xl font-extrabold text-white mb-6"
      >
        404
      </m.p>
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Halaman tidak ditemukan
      </h1>
      <p className="text-slate-400 mb-8 max-w-md">
        Sepertinya kamu tersesat di Nether…
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <SpringButton to="/">Kembali ke Home</SpringButton>
        <SpringButton to="/support" className="btn-secondary">
          Hubungi Bantuan
        </SpringButton>
      </div>
    </div>
  );
}
