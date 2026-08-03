import Layout from '../components/Layout';
import ProtectedRoute from '../components/auth/ProtectedRoute';

const ProfilePage = () => (
  <ProtectedRoute>
    <Layout>
      <div className="mx-auto max-w-5xl rounded-[32px] border border-slate-200 bg-white/80 p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900/80">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Profile</p>
            <h1 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">Aarav Sharma</h1>
          </div>
          <div className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300">Premium member</div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { label: 'BMI', value: '22.4' },
            { label: 'BMR', value: '1,540 kcal' },
            { label: 'Hydration', value: '2.1 L' },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950/40">
              <div className="text-sm text-slate-500 dark:text-slate-400">{item.label}</div>
              <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  </ProtectedRoute>
);

export default ProfilePage;
