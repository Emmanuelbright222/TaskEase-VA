import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { heroFallback } from '../../data/defaultContent';
import { useHeroContent } from '../../hooks/usePortfolioData';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Projects' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#blog', label: 'Blog' }
];

const Navbar = () => {
  const { data: hero } = useHeroContent();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-white/70 backdrop-blur-xl transition dark:border-white/5 dark:bg-slate-950/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-lg font-semibold tracking-tight">
          TaskEase <span className="text-primary">VA</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-200 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-primary">
              {link.label}
            </a>
          ))}
          <button
            onClick={toggleTheme}
            className="rounded-full border border-slate-200/60 p-2 text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:text-white dark:hover:bg-white/10"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>
          <a
            className="button-primary"
            href={hero?.calendlyUrl ?? heroFallback.calendlyUrl}
            target="_blank"
            rel="noreferrer"
          >
            Book a Call
          </a>
        </nav>
        <div className="md:hidden">
          <a
            className="button-primary text-xs"
            href={hero?.calendlyUrl ?? heroFallback.calendlyUrl}
            target="_blank"
            rel="noreferrer"
          >
            Book
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
