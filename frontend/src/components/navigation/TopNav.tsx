import Link from 'next/link';
import { useState } from 'react';
import Button from '../ui/Button';

const TopNav = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const toggleMode = () => {
    const nextMode = mode === 'light' ? 'dark' : 'light';
    setMode(nextMode);
    document.documentElement.classList.toggle('dark', nextMode === 'dark');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-semibold text-slate-950 dark:text-white">
          MoodFood AI
        </Link>

        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-8 md:flex text-sm font-medium text-slate-600 dark:text-slate-300">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/ai-insights">AI Insights</Link>
            <Link href="/admin">Admin</Link>
          </nav>
          <Button variant="ghost" onClick={toggleMode} aria-label="Toggle theme">
            {mode === 'light' ? 'Dark' : 'Light'} Mode
          </Button>
          <Link href="/login">
            <Button variant="primary">Sign In</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
