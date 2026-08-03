import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

import Layout from '../components/Layout';
import { pushToast } from '../components/ui/Toast';

interface RegisterForm {
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

const initialForm: RegisterForm = {
  fullName: '',
  email: '',
  mobile: '',
  password: '',
  confirmPassword: '',
  terms: false,
};

const RegisterPage = () => {
  const router = useRouter();
  const [form, setForm] = useState<RegisterForm>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordStrength = useMemo(() => {
    const password = form.password;
    let score = 0;

    if (password.length >= 6) score += 1;
    if (password.length >= 10) score += 1;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    const labels = ['Very weak', 'Weak', 'Fair', 'Strong', 'Very strong'];
    const colors = ['bg-rose-500', 'bg-orange-500', 'bg-yellow-500', 'bg-sky-500', 'bg-emerald-500'];

    return {
      score: Math.min(score, 4),
      label: labels[Math.min(score, 4)],
      width: `${((Math.min(score, 4) + 1) / 5) * 100}%`,
      color: colors[Math.min(score, 4)],
    };
  }, [form.password]);

  const handleChange = (field: keyof RegisterForm, value: string | boolean) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: '' }));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!form.fullName.trim()) nextErrors.fullName = 'Full name is required.';
    if (!form.email.trim()) nextErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) nextErrors.email = 'Please enter a valid email.';
    if (!form.mobile.trim()) nextErrors.mobile = 'Mobile number is required.';
    else if (!/^\d{10}$/.test(form.mobile)) nextErrors.mobile = 'Use a valid 10-digit mobile number.';
    if (!form.password) nextErrors.password = 'Password is required.';
    else if (form.password.length < 6) nextErrors.password = 'Password must be at least 6 characters.';
    if (!form.confirmPassword) nextErrors.confirmPassword = 'Please confirm your password.';
    else if (form.confirmPassword !== form.password) nextErrors.confirmPassword = 'Passwords do not match.';
    if (!form.terms) nextErrors.terms = 'You must accept the terms to continue.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => window.setTimeout(resolve, 900));
      pushToast('Account created', 'Your profile has been successfully created.', 'success');
      void router.push('/login');
    } catch {
      pushToast('Registration failed', 'Please verify your details and try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="mx-auto flex min-h-[80vh] max-w-6xl items-center justify-center py-10">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-[32px] border border-slate-200 bg-white/80 shadow-soft backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/80 lg:grid-cols-2">
          <div className="hidden bg-gradient-to-br from-violet-500 via-indigo-500 to-sky-500 p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-100">Join MoodFood AI</div>
              <h1 className="mt-6 text-4xl font-black leading-tight">Start your smarter nutrition journey.</h1>
            </div>
            <div className="rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
              <div className="text-2xl font-bold">4.9/5</div>
              <div className="mt-2 text-sm text-violet-100">Average member satisfaction</div>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <div className="mb-8 text-center">
              <div className="text-4xl">✨</div>
              <h2 className="mt-3 text-3xl font-black text-slate-900 dark:text-white">Create account</h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Build a healthier daily routine with AI support.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Full name</label>
                <input
                  id="fullName"
                  value={form.fullName}
                  onChange={(event) => handleChange('fullName', event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                  placeholder="Aarav Sharma"
                />
                {errors.fullName && <div className="mt-1 text-xs text-rose-600 dark:text-rose-300">{errors.fullName}</div>}
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Email</label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(event) => handleChange('email', event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                  placeholder="you@example.com"
                />
                {errors.email && <div className="mt-1 text-xs text-rose-600 dark:text-rose-300">{errors.email}</div>}
              </div>

              <div>
                <label htmlFor="mobile" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Mobile</label>
                <input
                  id="mobile"
                  type="tel"
                  value={form.mobile}
                  onChange={(event) => handleChange('mobile', event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                  placeholder="9876543210"
                />
                {errors.mobile && <div className="mt-1 text-xs text-rose-600 dark:text-rose-300">{errors.mobile}</div>}
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={(event) => handleChange('password', event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-slate-800 outline-none transition focus:border-sky-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    aria-label="Toggle password visibility"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-lg text-slate-400"
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {form.password && (
                  <div className="mt-2">
                    <div className="mb-1 flex justify-between text-[11px] uppercase tracking-[0.18em] text-slate-400">
                      <span>Password strength</span>
                      <span>{passwordStrength.label}</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700">
                      <div className={`h-2 rounded-full ${passwordStrength.color}`} style={{ width: passwordStrength.width }} />
                    </div>
                  </div>
                )}
                {errors.password && <div className="mt-1 text-xs text-rose-600 dark:text-rose-300">{errors.password}</div>}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Confirm password</label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={form.confirmPassword}
                    onChange={(event) => handleChange('confirmPassword', event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-slate-800 outline-none transition focus:border-sky-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    aria-label="Toggle confirm password visibility"
                    onClick={() => setShowConfirmPassword((current) => !current)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-lg text-slate-400"
                  >
                    {showConfirmPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {errors.confirmPassword && <div className="mt-1 text-xs text-rose-600 dark:text-rose-300">{errors.confirmPassword}</div>}
              </div>

              <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-950">
                <input
                  type="checkbox"
                  checked={form.terms}
                  onChange={(event) => handleChange('terms', event.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                />
                <span className="text-sm text-slate-600 dark:text-slate-300">I agree to the terms of service and privacy policy.</span>
              </label>
              {errors.terms && <div className="text-xs text-rose-600 dark:text-rose-300">{errors.terms}</div>}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-violet-500 to-sky-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-80"
              >
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
              Already have an account?{' '}
              <button type="button" onClick={() => void router.push('/login')} className="font-semibold text-cyan-600 dark:text-cyan-400">
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
