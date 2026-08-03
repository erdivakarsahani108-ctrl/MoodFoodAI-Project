import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Layout from '../components/Layout';
import { pushToast } from '../components/ui/Toast';
import {
  aiInsights,
  favoriteFoods,
  nutritionDistribution,
  moodTrend,
  orderHistory,
  recentActivity,
  recommendedFoods,
  recommendedRecipes,
  recommendedRestaurants,
  savedPlans,
  statCards,
  waterIntake,
  weeklyCalories,
} from '../lib/dashboard-data';

const sidebarItems = [
  { label: 'Overview', icon: '🏠', active: true },
  { label: 'AI Recommendations', icon: '✨' },
  { label: 'Nutrition', icon: '🥗' },
  { label: 'Favorites', icon: '💙' },
  { label: 'Orders', icon: '🧾' },
  { label: 'Settings', icon: '⚙️' },
];

const getCurrentDate = () =>
  new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

const DashboardPage = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const hasToken = Boolean(localStorage.getItem('auth_token'));
    const guestMode = localStorage.getItem('guest_mode') === 'true';
    setIsAuthenticated(hasToken || guestMode);
  }, []);

  const ensureAuth = (path: string, action: string) => {
    if (typeof window === 'undefined') {
      return;
    }

    const hasToken = Boolean(localStorage.getItem('auth_token'));
    const guestMode = localStorage.getItem('guest_mode') === 'true';

    if (!hasToken && !guestMode) {
      pushToast('Authentication required', `Please sign in to ${action.toLowerCase()}.`, 'error');
      void router.push('/login');
      return;
    }

    void router.push(path);
  };

  const handleSavePlan = () => {
    if (typeof window === 'undefined') {
      return;
    }

    const hasToken = Boolean(localStorage.getItem('auth_token'));
    const guestMode = localStorage.getItem('guest_mode') === 'true';

    if (!hasToken && !guestMode) {
      pushToast('Save unavailable', 'Please sign in to save your plan.', 'info');
      void router.push('/login');
      return;
    }

    pushToast('Plan saved', 'Your personalized dashboard plan has been saved.', 'success');
  };

  const maxCalories = Math.max(...weeklyCalories.map((item) => item.value));
  const moodPath = moodTrend
    .map((item, index) => `${index === 0 ? 'M' : 'L'} ${55 + index * 72} ${120 - item.value / 2}`)
    .join(' ');

  return (
    <Layout>
      <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="rounded-[28px] bg-slate-950 p-5 text-white shadow-soft">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold">MoodFood AI</div>
            <div className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-300">
              {isAuthenticated ? 'Logged in' : 'Guest mode'}
            </div>
          </div>

          <div className="mt-8 space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                type="button"
                className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-medium transition ${item.active ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-8 rounded-[24px] bg-gradient-to-br from-emerald-500 to-cyan-500 p-4 text-white shadow-lg shadow-emerald-500/20">
            <div className="text-xs uppercase tracking-[0.2em] text-emerald-100">AI insight</div>
            <div className="mt-2 text-2xl font-black">89%</div>
            <div className="mt-2 text-sm text-emerald-50">Your current wellness score is trending upward.</div>
          </div>
        </aside>

        <div className="space-y-6">
          <motion.header
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-soft backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/80"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">{getCurrentDate()}</div>
                <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white">Welcome back, Aarav.</h1>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleSavePlan}
                  className="rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20"
                >
                  Save plan
                </button>
                <button
                  type="button"
                  onClick={() => ensureAuth('/favorites', 'Favorites')}
                  className="rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                >
                  View favorites
                </button>
              </div>
            </div>
          </motion.header>

          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
          >
            {statCards.map((card) => (
              <div key={card.id} className={`rounded-[28px] bg-gradient-to-br ${card.gradient} p-[1px] shadow-soft`}>
                <div className="h-full rounded-[27px] bg-slate-950/95 p-5 text-white backdrop-blur-xl">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm text-slate-200">{card.title}</div>
                      <div className="mt-3 text-3xl font-black">{card.value}</div>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl">{card.icon}</div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm">
                    <span className={card.positive ? 'text-emerald-300' : 'text-rose-300'}>{card.positive ? '↗' : '↘'}</span>
                    <span className="text-slate-200">{card.change}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]"
          >
            <div className="rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900/80">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">AI food recommendations</h2>
                <button type="button" onClick={() => ensureAuth('/favorites', 'Favorites')} className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">
                  See all
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {recommendedFoods.map((food) => (
                  <div key={food.id} className={`rounded-[24px] bg-gradient-to-br ${food.accent} p-[1px]`}>
                    <div className="h-full rounded-[23px] bg-white/90 p-4 dark:bg-slate-950/90">
                      <div className="flex items-center justify-between">
                        <div className="text-3xl">{food.emoji}</div>
                        <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                          {food.mood}
                        </span>
                      </div>
                      <div className="mt-4 text-lg font-bold text-slate-900 dark:text-white">{food.name}</div>
                      <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{food.subtitle}</div>
                      <div className="mt-4 flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
                        <span>{food.calories}</span>
                        <span>{food.protein}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900/80">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recommended recipes</h3>
                <div className="mt-4 space-y-3">
                  {recommendedRecipes.map((recipe) => (
                    <div key={recipe.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950/40">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 text-xl">{recipe.emoji}</div>
                        <div>
                          <div className="font-semibold text-slate-800 dark:text-slate-200">{recipe.name}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">{recipe.time} • {recipe.difficulty}</div>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{recipe.calories}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900/80">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Nearby healthy spots</h3>
                <div className="mt-4 space-y-3">
                  {recommendedRestaurants.map((restaurant) => (
                    <div key={restaurant.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950/40">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-xl">{restaurant.emoji}</div>
                        <div>
                          <div className="font-semibold text-slate-800 dark:text-slate-200">{restaurant.name}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">{restaurant.category} • {restaurant.distance}</div>
                        </div>
                      </div>
                      <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">{restaurant.rating}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="grid gap-6 xl:grid-cols-2"
          >
            <div className="rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900/80">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Weekly calories</h3>
                <span className="text-sm text-emerald-600 dark:text-emerald-400">On target</span>
              </div>
              <svg viewBox="0 0 560 220" className="h-52 w-full">
                {weeklyCalories.map((day, index) => {
                  const barHeight = (day.value / maxCalories) * 135;
                  const x = 30 + index * 72;
                  return (
                    <g key={day.day}>
                      <rect x={x} y={190 - barHeight} width={36} height={barHeight} rx={12} fill="url(#barGradient)" />
                      <text x={x + 18} y={210} textAnchor="middle" fontSize="12" fill="#94a3b8">{day.day}</text>
                    </g>
                  );
                })}
                <defs>
                  <linearGradient id="barGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900/80">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Nutrition distribution</h3>
                <span className="text-sm text-slate-500 dark:text-slate-400">Macro balance</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="relative h-40 w-40 rounded-full bg-[conic-gradient(#10b981_0_35%,#8b5cf6_35%_65%,#f59e0b_65%_85%,#38bdf8_85%_100%)]">
                  <div className="absolute inset-4 rounded-full bg-white dark:bg-slate-900" />
                  <div className="absolute inset-0 flex items-center justify-center text-lg font-black text-slate-900 dark:text-white">72%</div>
                </div>
                <div className="flex-1 space-y-3">
                  {nutritionDistribution.map((nutrient) => (
                    <div key={nutrient.label} className="flex items-center gap-3">
                      <span className={`h-3 w-3 rounded-full ${nutrient.color}`} />
                      <span className="flex-1 text-sm text-slate-600 dark:text-slate-300">{nutrient.label}</span>
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{nutrient.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16 }}
            className="grid gap-6 xl:grid-cols-2"
          >
            <div className="rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900/80">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Mood trend</h3>
                <span className="text-sm text-cyan-600 dark:text-cyan-400">+18% this week</span>
              </div>
              <svg viewBox="0 0 520 200" className="h-48 w-full">
                <path d={moodPath} fill="none" stroke="url(#moodGradient)" strokeWidth="4" strokeLinecap="round" />
                {moodTrend.map((point, index) => (
                  <circle key={point.day} cx={55 + index * 72} cy={120 - point.value / 2} r="5" fill="#0ea5e9" />
                ))}
                <defs>
                  <linearGradient id="moodGradient" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="100%" stopColor="#0ea5e9" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900/80">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Water intake</h3>
                <span className="text-sm text-sky-600 dark:text-sky-400">Goal: 3.0 L</span>
              </div>
              <div className="flex h-48 items-end gap-3">
                {waterIntake.map((value) => (
                  <div key={value.label} className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex w-full items-end justify-center rounded-t-2xl bg-gradient-to-t from-sky-500 to-cyan-300" style={{ height: `${Math.max((value.value / 3) * 130, 30)}px` }} />
                    <span className="text-xs text-slate-500 dark:text-slate-400">{value.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="grid gap-6 xl:grid-cols-2"
          >
            <div className="rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900/80">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Favorite foods</h3>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {favoriteFoods.map((food) => (
                  <div key={food.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950/40">
                    <div className="text-2xl">{food.emoji}</div>
                    <div className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-200">{food.name}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900/80">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Saved diet plans</h3>
              <div className="mt-4 space-y-3">
                {savedPlans.map((plan) => (
                  <div key={plan.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950/40">
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-slate-200">{plan.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{plan.duration} • {plan.goal}</div>
                    </div>
                    <button type="button" className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                      Active
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.24 }}
            className="grid gap-6 xl:grid-cols-2"
          >
            <div className="rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900/80">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recent activity</h3>
              <div className="mt-4 space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950/40">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 text-lg">{activity.icon}</div>
                    <div className="flex-1">
                      <div className="text-xs uppercase tracking-[0.18em] text-slate-400">{activity.time}</div>
                      <div className="mt-1 text-sm text-slate-700 dark:text-slate-200">{activity.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900/80">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Order history</h3>
              <div className="mt-4 space-y-3">
                {orderHistory.map((order) => (
                  <div key={order.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950/40">
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-slate-200">{order.item}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{order.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">{order.amount}</div>
                      <div className="text-xs text-emerald-600 dark:text-emerald-400">{order.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.28 }}
            className="grid gap-6 xl:grid-cols-3"
          >
            {aiInsights.map((insight) => (
              <div key={insight.id} className="rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900/80">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-xl">{insight.icon}</div>
                  <div className="text-lg font-bold text-slate-900 dark:text-white">{insight.title}</div>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{insight.text}</p>
              </div>
            ))}
          </motion.section>

          <div className="flex justify-center pb-6">
            <Link href="/ai-insights">
              <button type="button" className="rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200">
                Open full AI insights
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
