import { ReactNode } from 'react';
import TopNav from './navigation/TopNav';

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
    <TopNav />
    <main>{children}</main>
    <footer className="border-t border-slate-200/70 bg-white/80 py-6 text-center text-sm text-slate-500 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/80 dark:text-slate-400">
      © 2026 MoodFood AI. Built for enterprise wellness and nutrition personalization.
    </footer>
  </div>
);

export default Layout;
