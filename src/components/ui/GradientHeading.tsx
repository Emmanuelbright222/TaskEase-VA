import clsx from 'clsx';
import type { ReactNode } from 'react';

const GradientHeading = ({ children, className }: { children: ReactNode; className?: string }) => (
  <h2
    className={clsx(
      'bg-gradient-to-r from-primary via-accent to-blue-500 bg-clip-text text-lg font-semibold uppercase tracking-[0.3em] text-transparent',
      className
    )}
  >
    {children}
  </h2>
);

export default GradientHeading;
