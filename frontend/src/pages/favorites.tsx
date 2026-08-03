import Link from 'next/link';

import Layout from '../components/Layout';
import ProtectedRoute from '../components/auth/ProtectedRoute';

const FavoritesPage = () => (
  <ProtectedRoute>
    <Layout>
      <div className="mx-auto max-w-5xl rounded-[32px] border border-slate-200 bg-white/80 p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900/80">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Favorites</p>
            <h1 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">Your saved foods</h1>
          </div>
          <Link href="/dashboard" className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">Back to dashboard</Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { name: 'Chia Oat Bowl', emoji: '🥣' },
            { name: 'Green Smoothie', emoji: '🥤' },
            { name: 'Quinoa Salad', emoji: '🥗' },
            { name: 'Avocado Bowl', emoji: '🥑' },
          ].map((item) => (
            <div key={item.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950/40">
              <div className="text-3xl">{item.emoji}</div>
              <div className="mt-3 text-sm font-semibold text-slate-800 dark:text-slate-200">{item.name}</div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  </ProtectedRoute>
);

export default FavoritesPage;
