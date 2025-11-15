import clsx from 'clsx';
import type { InputHTMLAttributes } from 'react';

export type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

const InputField = ({ label, error, className, ...props }: InputFieldProps) => (
  <label className="space-y-2 text-sm font-medium text-slate-600 dark:text-slate-200">
    <span>{label}</span>
    <input
      {...props}
      className={clsx(
        'w-full rounded-2xl border-2 border-slate-300/60 bg-white/70 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-600/60 dark:bg-slate-900/40 dark:text-white dark:focus:border-primary',
        error && 'border-rose-400 focus:border-rose-400 focus:ring-rose-400/20',
        className
      )}
    />
    {error && <p className="text-xs text-rose-400">{error}</p>}
  </label>
);

export default InputField;
