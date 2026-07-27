import Link from 'next/link';
import Layout from '../components/Layout';
import Button from '../components/ui/Button';
import SectionTitle from '../components/ui/SectionTitle';

const features = [
  'Mood-driven personalized meals',
  'Nutrition analytics and diet planning',
  'Health risk-aware recommendations',
  'Image and barcode food recognition',
  'Multilingual experience: English + Hindi',
  'Dark/Light mode for modern dashboards',
];

export default function Home() {
  return (
    <Layout>
      <section className="relative overflow-hidden px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-8">
              <SectionTitle
                title="AI-driven food recommendations based on your mood, health, and lifestyle"
                subtitle="Deliver premium nutrition guidance, smart meal planning, and contextual recommendations with advanced AI models and elegant dashboards."
              />
              <p className="max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                MoodFood AI combines mood detection, nutrition science, and contextual intelligence to help users eat better, feel better, and stay healthier.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/login">
                  <Button>Get Started</Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="secondary">Explore Dashboard</Button>
                </Link>
              </div>
            </div>
            <div className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-8 shadow-soft backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-900/80">
              <div className="space-y-6">
                <div className="rounded-3xl bg-blue-600/10 p-6 text-slate-900 dark:text-white dark:bg-blue-500/15">
                  <p className="text-sm uppercase tracking-[0.3em] text-brand-accent">Next-gen AI insights</p>
                  <h3 className="mt-4 text-2xl font-semibold">Actionable recommendations in one view</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    From mood signals to dietary restrictions, the platform curates recommendations tailored to each user profile and daily context.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {features.map((feature) => (
                    <div key={feature} className="rounded-3xl border border-slate-200/80 bg-slate-50 p-5 text-sm text-slate-700 dark:border-slate-700/80 dark:bg-slate-950/80 dark:text-slate-200">
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
