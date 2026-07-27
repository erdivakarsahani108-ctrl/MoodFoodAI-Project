import { ReactNode } from 'react';

type CardProps = {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

const Card = ({ title, description, children, className = '' }: CardProps) => (
  <div className={`overflow-hidden rounded-3xl border border-slate-200/60 bg-white/90 shadow-soft backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/80 ${className}`}>
    <div className="space-y-2 border-b border-slate-200/80 px-6 py-5 dark:border-slate-700/80">
      {title && <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>}
      {description && <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">{description}</p>}
    </div>
    <div className="p-6">{children}</div>
  </div>
);

export default Card;
