import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Layout from '../components/Layout';
import Button from '../components/ui/Button';
import { pushToast } from '../components/ui/Toast';

const featurePills = ['Mood-aware meals', 'AI nutrition guidance', 'Disease-safe habits'];

const metrics = [
  { value: '100+', label: 'Vegetarian foods' },
  { value: '50+', label: 'Disease profiles' },
  { value: 'AI', label: 'Recommendations' },
  { value: '24/7', label: 'Smart assistant' },
];

const cards = [
  { emoji: '😊', label: 'Happy', accent: 'from-yellow-400 to-amber-500' },
  { emoji: '😔', label: 'Sad', accent: 'from-blue-400 to-indigo-500' },
  { emoji: '😰', label: 'Stress', accent: 'from-rose-400 to-pink-500' },
  { emoji: '😴', label: 'Tired', accent: 'from-violet-400 to-purple-500' },
  { emoji: '💪', label: 'Energetic', accent: 'from-emerald-400 to-teal-500' },
  { emoji: '🧘', label: 'Relaxed', accent: 'from-cyan-400 to-sky-500' },
];

const filters = ['Mood', 'Diet goal', 'Age', 'Disease'];

const HomePage = () => {
  const router = useRouter();
  const [selectedMood, setSelectedMood] = useState<string | null>('Energetic');

  const continueGuest = () => {
    localStorage.setItem('guest_mode', 'true');
    localStorage.removeItem('auth_token');
    pushToast('Guest mode enabled', 'You can explore the dashboard without logging in.', 'info');
    void router.push('/dashboard');
  };

  return (
    <Layout>
      <section className="relative overflow-hidden rounded-[32px] border border-slate-200/80 bg-white/80 p-6 shadow-soft backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-900/80 sm:p-10 lg:p-14">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-gradient-to-l from-emerald-500/10 via-cyan-500/5 to-transparent lg:block" />
        <div className="relative grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
              Premium AI nutrition intelligence
            </span>

            <h1 className="mt-6 max-w-xl text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
              Personalized meals that match how you feel.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              AI Mood-Based Food Recommendation System for healthier vegetarian choices, tailored to your mood, disease profile, sleep, and lifestyle patterns.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/login">
                <Button className="rounded-full px-6 py-3 shadow-lg shadow-sky-500/20">Login</Button>
              </Link>
              <Button variant="secondary" className="rounded-full px-6 py-3" onClick={continueGuest}>
                Continue as Guest
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {featurePills.map((pill) => (
                <span key={pill} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
                  {pill}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-5 top-10 h-24 w-24 rounded-full bg-emerald-400/20 blur-3xl" />
            <div className="absolute -bottom-10 right-0 h-24 w-24 rounded-full bg-sky-400/20 blur-3xl" />

            <div className="relative rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-950 to-slate-800 p-5 shadow-2xl dark:border-slate-700">
              <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3 backdrop-blur-sm">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Today</p>
                  <h2 className="mt-1 text-xl font-semibold text-white">High energy plan</h2>
                </div>
                <div className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-300">89% score</div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {cards.map((card) => (
                  <button
                    key={card.label}
                    type="button"
                    onClick={() => setSelectedMood(card.label)}
                    className={`rounded-2xl border p-4 text-left transition ${selectedMood === card.label ? 'border-emerald-400/60 bg-white/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
                  >
                    <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${card.accent} text-xl`}>
                      {card.emoji}
                    </div>
                    <div className="text-sm text-slate-200">{card.label}</div>
                  </button>
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-white/5 p-4">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>Daily nutrition mix</span>
                  <span>Balanced</span>
                </div>
                <div className="mt-4 space-y-3">
                  {[
                    { label: 'Protein', value: 78 },
                    { label: 'Carbs', value: 62 },
                    { label: 'Fiber', value: 88 },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="mb-1 flex justify-between text-xs text-slate-400">
                        <span>{item.label}</span>
                        <span>{item.value}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-700">
                        <div className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" style={{ width: `${item.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((item) => (
            <div key={item.label} className="rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900/80">
              <div className="text-3xl font-black text-slate-900 dark:text-white">{item.value}</div>
              <div className="mt-2 text-sm text-slate-500 dark:text-slate-400">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-[32px] border border-slate-200 bg-white/80 p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900/80">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Build your AI wellness profile</h2>
          <span className="text-sm text-slate-500 dark:text-slate-400">Tailored meal recommendations</span>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {filters.map((filter) => (
            <div key={filter} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950/40">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">{filter}</div>
              <div className="mt-3 text-lg font-semibold text-slate-800 dark:text-slate-200">Select</div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/dashboard">
            <Button className="rounded-full px-6 py-3">Get AI Recommendation</Button>
          </Link>
          <Link href="/login">
            <Button variant="secondary" className="rounded-full px-6 py-3">Create account</Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
