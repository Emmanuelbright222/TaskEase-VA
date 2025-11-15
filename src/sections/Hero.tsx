import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import { useHeroContent } from '../hooks/usePortfolioData';
import GradientHeading from '../components/ui/GradientHeading';
import { heroFallback } from '../data/defaultContent';

const Hero = () => {
  const { data: hero } = useHeroContent();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-100 via-white to-slate-200 px-4 py-24 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
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
