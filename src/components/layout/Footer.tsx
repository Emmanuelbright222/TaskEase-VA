const footerLinks = [
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Notion', href: 'https://notion.so' },
  { label: 'Twitter', href: 'https://x.com' },
  { label: 'Privacy', href: '#' }
];

const Footer = () => (
  <footer className="border-t border-white/10 bg-white/60 py-10 text-sm text-slate-500 backdrop-blur-2xl dark:border-white/5 dark:bg-slate-950/60">
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="font-semibold text-slate-900 dark:text-white">TaskEase VA</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">© {new Date().getFullYear()} All rights reserved.</p>
      </div>
      <div className="flex flex-wrap gap-4">
        {footerLinks.map((link) => (
          <a key={link.label} href={link.href} className="text-slate-600 transition hover:text-primary dark:text-slate-300">
            {link.label}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
