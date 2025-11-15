import clsx from 'clsx';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const SectionWrapper = ({ id, children, className }: { id?: string; children: ReactNode; className?: string }) => (
  <section id={id} className={clsx('mx-auto max-w-6xl px-4 py-16', className)}>
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="space-y-6"
    >
      {children}
    </motion.div>
  </section>
);

export default SectionWrapper;
