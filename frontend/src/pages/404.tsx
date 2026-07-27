import Link from 'next/link';
import Layout from '../components/Layout';
import Button from '../components/ui/Button';

export default function NotFoundPage() {
  return (
    <Layout>
      <section className="grid min-h-[calc(100vh-96px)] place-items-center px-6 py-16">
        <div className="max-w-2xl rounded-[2rem] border border-slate-200/80 bg-white/90 p-12 text-center shadow-soft backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-950/80">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-accent">Page not found</p>
          <h1 className="mt-6 text-5xl font-semibold text-slate-950 dark:text-white">404</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
            The page you are looking for does not exist, or has been moved. Return to the dashboard to continue exploring.
          </p>
          <Link href="/">
            <Button className="mt-8">Return Home</Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
