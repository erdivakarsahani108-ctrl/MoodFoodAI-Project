'use client';

import { FormEvent, useState } from 'react';
import Layout from '../components/Layout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Link from 'next/link';
import { login } from '../lib/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await login(email, password);
      localStorage.setItem('moodfood_token', data.access_token);
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Unable to sign in. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="grid min-h-[calc(100vh-96px)] place-items-center px-6 py-16">
        <div className="w-full max-w-xl rounded-[2rem] border border-slate-200/80 bg-white/90 p-10 shadow-soft backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-950/80">
          <div className="mb-8 space-y-3 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-accent">Sign in securely</p>
            <h1 className="text-3xl font-semibold text-slate-950 dark:text-white">Welcome back to MoodFood AI</h1>
            <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">Use your email to sign in and access personalized recommendations.</p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input label="Email address" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            <Input label="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-semibold text-brand-accent hover:text-blue-600">
              Create one
            </Link>
          </p>
        </div>
      </section>
    </Layout>
  );
}
