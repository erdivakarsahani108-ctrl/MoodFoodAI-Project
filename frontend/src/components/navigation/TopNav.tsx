import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/ai-insights', label: 'AI Insights' },
  { href: '/favorites', label: 'Favorites' },
  { href: '/orders', label: 'Orders' },
];

const TopNav = () => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    const enabled = savedTheme === 'dark';
    setDarkMode(enabled);
    root.classList.toggle('dark', enabled);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void router.push('/dashboard');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-950/85">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-lg font-bold text-white shadow-lg shadow-emerald-500/25">
              M
            </div>
            <div>
              <div className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">MoodFood AI</div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Nutrition OS</div>
            </div>
          </Link>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${router.pathname === link.href ? 'text-slate-900 dark:text-white' : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-3">
          <form onSubmit={handleSearch} className="hidden min-w-[220px] max-w-xs flex-1 md:block">
            <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 shadow-sm transition focus-within:border-sky-400 dark:border-slate-700 dark:bg-slate-900">
              <span className="text-slate-400">⌕</span>
              <input
                type="search"
                placeholder="Search foods, plans, recipes"
                className="w-full border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-200"
              />
            </label>
          </form>

          <button
            type="button"
            aria-label="Toggle theme"
            onClick={() => setDarkMode((current) => !current)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-lg transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-lg transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
          >
            🔔
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">3</span>
          </button>

          <button
            type="button"
            aria-label="Settings"
            className="hidden h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-lg transition hover:border-slate-300 hover:bg-slate-100 sm:flex dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
          >
            ⚙️
          </button>

          <Link href="/profile" className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-2 py-1.5 transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-sm font-bold text-white">
              AS
            </div>
            <div className="hidden text-left sm:block">
              <div className="text-sm font-semibold text-slate-900 dark:text-white">Aarav S.</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Premium</div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
