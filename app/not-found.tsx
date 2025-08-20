'use client';

import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background:
          'radial-gradient(circle at 20% 30%, #0a0a0f, transparent 60%), radial-gradient(circle at 80% 70%, rgba(147,197,253,0.1), transparent 60%), #0a0a0f',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-center bg-[#11131c]/90 backdrop-blur-xl rounded-3xl px-12 py-16 shadow-2xl border border-white/10 max-w-xl"
      >
        <h1 className="text-7xl font-extrabold tracking-tight mb-6">
          <span className="text-blue-400">404</span>
        </h1>

        <h2 className="text-3xl font-semibold mb-4 text-neutral-100">
          Page Not Found
        </h2>

        <p className="text-base text-neutral-400 mb-10 leading-relaxed">
          The paste you&apos;re looking for might have been deleted, expired, or the
          URL is incorrect.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push('/')}
          className="cursor-pointer group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base font-medium
          text-white bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/30
          hover:shadow-blue-500/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400/60"
        >
          <Plus
            size={20}
            className="text-blue-200 group-hover:rotate-90 transition-transform duration-300"
          />
          <span>Create New Paste</span>
        </motion.button>
      </motion.div>
    </div>
  );
}
