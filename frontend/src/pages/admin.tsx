import Layout from '../components/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const metrics = [
  { label: 'Active users', value: '1,248' },
  { label: 'AI model accuracy', value: '89.2%' },
  { label: 'Daily recommendations', value: '4,321' },
  { label: 'Engagement score', value: '78.4%' },
];

export default function AdminPage() {
  return (
    <Layout>
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-brand-accent">Admin dashboard</p>
              <h1 className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">Platform analytics & model health</h1>
            </div>
            <Button variant="secondary">Export report</Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {metrics.map((item) => (
              <Card key={item.label} title={item.label} description="Latest operational status">
                <div className="text-3xl font-semibold text-slate-950 dark:text-white">{item.value}</div>
              </Card>
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[2fr_1fr]">
            <Card title="Recommendation performance" description="Review evaluation metrics and usage trends.">
              <div className="space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                <p>Precision: 78%</p>
                <p>Recall: 65%</p>
                <p>Coverage: 92%</p>
                <p>Model version: recommendation_v1.2</p>
              </div>
            </Card>
            <Card title="Alerts and audits" description="Priority items for review.">
              <div className="space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                <p className="text-slate-900 dark:text-white">01. Monitor new user onboarding funnel.</p>
                <p className="text-slate-900 dark:text-white">02. Review bias metrics for regional recommendations.</p>
                <p className="text-slate-900 dark:text-white">03. Verify GDPR consent workflow updates.</p>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
