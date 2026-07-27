'use client';

import { FormEvent, useState } from 'react';
import Layout from '../components/Layout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Link from 'next/link';
import { register } from '../lib/api';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState('en');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await register(email, password, fullName, language);
      setSuccess('Account created successfully. Please sign in.');
    } catch (err) {
      setError('Registration failed. Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="grid min-h-[calc(100vh-96px)] place-items-center px-6 py-16">
        <div className="w-full max-w-xl rounded-[2rem] border border-slate-200/80 bg-white/90 p-10 shadow-soft backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-950/80">
          <div className="mb-8 space-y-3 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-accent">Create an account</p>
            <h1 className="text-3xl font-semibold text-slate-950 dark:text-white">Join MoodFood AI</h1>
            <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">Start receiving health-aware food recommendations tailored to your lifestyle.</p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input label="Full name" type="text" value={fullName} onChange={(event) => setFullName(event.target.value)} required />
            <Input label="Email address" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            <Input label="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              Preferred language
              <select
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                className="mt-2 block w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition duration-200 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
              </select>
            </label>
            {error && <p className="text-sm text-red-600">{error}</p>}
            {success && <p className="text-sm text-emerald-600">{success}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating account...' : 'Create account'}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
            Already registered?{' '}
            <Link href="/login" className="font-semibold text-brand-accent hover:text-blue-600">
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </Layout>
  );
}
