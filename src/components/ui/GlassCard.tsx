import clsx from 'clsx';
import type { ReactNode } from 'react';

const GlassCard = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={clsx('glass-panel border border-white/20 bg-white/10 shadow-glass dark:bg-white/5', className)}>{children}</div>
);

export default GlassCard;
