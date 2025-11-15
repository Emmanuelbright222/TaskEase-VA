import clsx from 'clsx';
import type { ReactNode } from 'react';

const Badge = ({ children, variant = 'default' }: { children: ReactNode; variant?: 'default' | 'outline' }) => (
  <span
    className={clsx(
      'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
      variant === 'outline'
        ? 'border border-white/30 text-slate-700 dark:text-white'
        : 'bg-primary/10 text-primary'
    )}
  >
    {children}
  </span>
);

export default Badge;
