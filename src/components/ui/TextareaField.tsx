import clsx from 'clsx';
import type { TextareaHTMLAttributes } from 'react';

const TextareaField = ({ label, error, className, ...props }: { label: string; error?: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <label className="space-y-2 text-sm font-medium text-slate-600 dark:text-slate-200">
    <span>{label}</span>
    <textarea
      {...props}
      className={clsx(
        'w-full rounded-2xl border border-white/20 bg-white/70 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none dark:bg-slate-900/40 dark:text-white',
        error && 'border-rose-400',
        className
      )}
    />
    {error && <p className="text-xs text-rose-400">{error}</p>}
  </label>
);

export default TextareaField;
