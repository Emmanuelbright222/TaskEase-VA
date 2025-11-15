import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import { useHeroContent } from '../hooks/usePortfolioData';
import GradientHeading from '../components/ui/GradientHeading';
import { heroFallback } from '../data/defaultContent';

const Hero = () => {
  const { data: hero } = useHeroContent();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-100 via-white to-slate-200 px-4 py-24 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/30 dark:bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-accent/30 dark:bg-accent/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s', animationDuration: '3s' }} />
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-blue-500/30 dark:bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '4s' }} />
        <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-purple-500/30 dark:bg-purple-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s', animationDuration: '2.5s' }} />
        <div className="absolute top-1/3 left-1/3 w-16 h-16 bg-amber-500/20 dark:bg-amber-500/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s', animationDuration: '3.5s' }} />
        <div className="absolute bottom-1/3 right-1/3 w-28 h-28 bg-pink-500/25 dark:bg-pink-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2.5s', animationDuration: '5s' }} />
      </div>
      <div className="relative mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center z-10">
        <div className="space-y-6">
          <GradientHeading>TaskEase VA</GradientHeading>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white md:text-6xl">
              {hero?.name ?? heroFallback.name}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-200">{hero?.title ?? heroFallback.title}</p>
            <p className="text-lg text-slate-500 dark:text-slate-300">{hero?.subtitle ?? heroFallback.subtitle}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href={hero?.calendlyUrl ?? heroFallback.calendlyUrl}
              target="_blank"
              rel="noreferrer"
              className="button-primary"
            >
              {hero?.callToAction ?? heroFallback.callToAction}
              <ArrowUpRightIcon className="ml-2 h-4 w-4" />
            </a>
            <a href="#contact" className="button-secondary">
              {hero?.contactCta ?? heroFallback.contactCta}
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-r from-primary/50 via-accent/40 to-blue-500/50 blur-3xl" />
          <div className="relative rounded-[2.5rem] border border-white/20 bg-white/80 p-8 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70">
            <img
              src={hero?.avatarUrl ?? heroFallback.avatarUrl}
              alt={hero?.name ?? 'Virtual assistant'}
              className="h-96 w-full rounded-[2rem] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
