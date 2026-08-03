import type { ReactNode } from 'react';

import TopNav from './navigation/TopNav';
import { ToastViewport } from './ui/Toast';

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
    <TopNav />
    <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">{children}</main>
    <footer className="border-t border-slate-200/80 bg-white/80 py-6 text-center text-sm text-slate-500 backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-950/80 dark:text-slate-400">
      © 2026 MoodFood AI • Enterprise wellness intelligence
    </footer>
    <ToastViewport />
  </div>
);

export default Layout;
