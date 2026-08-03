import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Layout from '../components/Layout';
import { pushToast } from '../components/ui/Toast';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('demo@moodfood.ai');
  const [password, setPassword] = useState('demo1234');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const hasToken = Boolean(localStorage.getItem('auth_token'));
    const guestMode = localStorage.getItem('guest_mode') === 'true';
    if (hasToken || guestMode) {
      void router.push('/dashboard');
    }
  }, [router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => window.setTimeout(resolve, 800));
      localStorage.setItem('auth_token', 'demo-jwt-token');
      localStorage.removeItem('guest_mode');
      pushToast('Welcome back', 'You are now signed in.', 'success');
      void router.push('/dashboard');
    } catch {
      setError('Unable to sign in right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = () => {
    localStorage.setItem('guest_mode', 'true');
    localStorage.removeItem('auth_token');
    pushToast('Guest mode enabled', 'You can preview the dashboard without signing in.', 'info');
    void router.push('/dashboard');
  };

  return (
    <Layout>
      <div className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center py-12">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-[32px] border border-slate-200 bg-white/80 shadow-soft backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/80 lg:grid-cols-2">
          <div className="hidden bg-gradient-to-br from-emerald-500 via-teal-500 to-sky-500 p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-100">MoodFood AI</div>
              <h1 className="mt-6 text-4xl font-black leading-tight">Your health data, reimagined.</h1>
            </div>
            <div className="rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
              <div className="text-2xl font-bold">89 / 100</div>
              <div className="mt-2 text-sm text-emerald-100">Current wellness score</div>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <div className="mb-8 text-center">
              <div className="text-4xl">🥗</div>
              <h2 className="mt-3 text-3xl font-black text-slate-900 dark:text-white">Welcome back</h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Sign in to personalize your meal plan.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-slate-800 outline-none transition focus:border-sky-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-slate-400"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              {error && <div className="rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-200">{error}</div>}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-80"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-400">
              <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
              OR
              <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
            </div>

            <button
              type="button"
              onClick={handleGuest}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
            >
              Continue as Guest
            </button>

            <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
              No account yet?{' '}
              <button type="button" onClick={() => void router.push('/register')} className="font-semibold text-cyan-600 dark:text-cyan-400">
                Create one
              </button>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
