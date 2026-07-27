import type { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const Input = ({ label, className = '', ...props }: InputProps) => (
  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
    <span>{label}</span>
    <input
      className={`mt-2 block w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition duration-200 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 ${className}`}
      {...props}
    />
  </label>
);

export default Input;
