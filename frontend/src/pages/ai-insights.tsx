import Layout from '../components/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const insights = [
  {
    title: 'Mood detection accuracy',
    value: '82.6%',
    details: 'Stable predictions across text and facial emotion models.',
  },
  {
    title: 'Voice emotion model',
    value: '78.4%',
    details: 'Latest evaluation on conversational audio samples.',
  },
  {
    title: 'Fairness metrics',
    value: 'Gender parity: 94%',
    details: 'Balanced recommendation performance by user segment.',
  },
];

export default function AIInsightsPage() {
  return (
    <Layout>
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-brand-accent">AI insights</p>
              <h1 className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">Track inference quality and explainability</h1>
            </div>
            <Button variant="secondary">View explainability</Button>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {insights.map((insight) => (
              <Card key={insight.title} title={insight.title} description={insight.details}>
                <div className="text-3xl font-semibold text-slate-950 dark:text-white">{insight.value}</div>
              </Card>
            ))}
          </div>

          <Card title="Recent model versions" description="Latest deployed artifacts and retrieval signals." className="mt-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200/70 bg-slate-50 p-5 dark:border-slate-700/70 dark:bg-slate-900/80">
                <p className="font-semibold text-slate-900 dark:text-white">recommendation_v1.2</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Customer preference and mood-aware ranking.</p>
              </div>
              <div className="rounded-3xl border border-slate-200/70 bg-slate-50 p-5 dark:border-slate-700/70 dark:bg-slate-900/80">
                <p className="font-semibold text-slate-900 dark:text-white">mood_v0.9</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Hybrid NLP and vision sentiment model.</p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
