import clsx from 'clsx';
import type { ReactNode } from 'react';

const GlassCard = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div
    className={clsx(
      'glass-panel border border-white/20 bg-white/10 shadow-glass transition-all duration-300 hover:scale-[1.02] hover:border-white/30 hover:bg-white/20 hover:shadow-xl dark:bg-white/5 dark:hover:bg-white/10',
      className
    )}
  >
    {children}
  </div>
);

export default GlassCard;
