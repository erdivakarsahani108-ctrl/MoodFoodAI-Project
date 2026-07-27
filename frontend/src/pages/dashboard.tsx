import Layout from '../components/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const stats = [
  { label: 'Daily Recommendations', value: '23', description: 'Personalized meal suggestions delivered today' },
  { label: 'Mood score', value: '86%', description: 'AI-derived sentiment confidence for current session' },
  { label: 'Calories target', value: '1840 kcal', description: 'Daily calorie guidance for your activity level' },
  { label: 'Risk index', value: 'Low', description: 'Health risk profile based on your latest inputs' },
];

const recommendations = [
  {
    title: 'Grilled Chicken Salad',
    description: 'Balanced protein with leafy greens and seasonal dressing.',
    details: '220 kcal · 28g protein · low-carb',
  },
  {
    title: 'Masala Dosa',
    description: 'Comforting South Indian breakfast with a protein twist.',
    details: '150 kcal · 4g protein · vegetarian',
  },
  {
    title: 'Paneer Tikka',
    description: 'Low-carb snack with essential calcium and savory flavors.',
    details: '320 kcal · 18g protein · vegetarian',
  },
];

export default function DashboardPage() {
  return (
    <Layout>
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-brand-accent">User Dashboard</p>
              <h1 className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">Your personalized wellness center</h1>
              <p className="mt-3 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
                Monitor your daily nutrition, review AI recommendations, and keep your diet aligned with mood, health, and lifestyle goals.
              </p>
            </div>
            <Button variant="secondary">View latest plan</Button>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => (
              <Card key={item.label} title={item.label} description={item.description} className="p-6">
                <div className="text-4xl font-semibold text-slate-950 dark:text-white">{item.value}</div>
              </Card>
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <Card title="Daily recommendation summary" description="AI curated meals based on emotional, seasonal, and health signals.">
              <div className="space-y-4">
                {recommendations.map((item) => (
                  <div key={item.title} className="rounded-3xl border border-slate-200/70 bg-slate-50 p-5 dark:border-slate-700/70 dark:bg-slate-900/80">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.description}</p>
                      </div>
                      <span className="rounded-full bg-brand-accent/10 px-3 py-1 text-xs font-semibold uppercase text-brand-accent">Recommendation</span>
                    </div>
                    <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">{item.details}</p>
                  </div>
                ))}
              </div>
            </Card>
            <Card title="Health summary" description="Track key wellness indicators for smarter decisions.">
              <div className="space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-900/80">
                  <p className="font-semibold text-slate-900 dark:text-white">BMI</p>
                  <p className="mt-2">22.8 · Healthy weight range</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-900/80">
                  <p className="font-semibold text-slate-900 dark:text-white">BMR</p>
                  <p className="mt-2">1560 kcal · Baseline calorie estimate</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-900/80">
                  <p className="font-semibold text-slate-900 dark:text-white">Mood</p>
                  <p className="mt-2">Positive mood detected from recent text and image analysis.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
