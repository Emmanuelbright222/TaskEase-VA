import type { ReactNode } from 'react';

const AdminSectionCard = ({ title, description, children }: { title: string; description?: string; children: ReactNode }) => (
  <section className="space-y-4 rounded-3xl border border-white/10 bg-white/80 p-6 shadow-2xl backdrop-blur-xl dark:bg-slate-900/60">
    <div>
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h2>
      {description && <p className="text-sm text-slate-500 dark:text-slate-300">{description}</p>}
    </div>
    {children}
  </section>
);

export default AdminSectionCard;
