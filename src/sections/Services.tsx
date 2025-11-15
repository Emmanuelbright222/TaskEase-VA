import GradientHeading from '../components/ui/GradientHeading';
import SectionWrapper from '../components/ui/SectionWrapper';
import GlassCard from '../components/ui/GlassCard';
import { usePortfolioData } from '../hooks/usePortfolioData';

const Services = () => {
  const { data } = usePortfolioData();

  return (
    <SectionWrapper id="services">
      <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
        <div className="space-y-4">
          <GradientHeading>Services</GradientHeading>
          <h3 className="section-heading">Calm, proactive support for modern operators</h3>
          <p className="text-slate-600 dark:text-slate-300">
            Mix and match retainer or sprint-based projects. Everything is async-first with crystal-clear documentation.
          </p>
        </div>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {data?.services.map((service) => (
          <GlassCard key={service.id} className="overflow-hidden cursor-default group rounded-3xl">
            {service.imageUrl ? (
              <div className="relative h-48 w-full overflow-hidden -m-6 mb-4 rounded-t-3xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-blue-500/20 blur-2xl" />
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="relative h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    // Fallback if image fails to load
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              </div>
            ) : (
              // Placeholder if no image
              <div className="relative h-48 w-full overflow-hidden -m-6 mb-4 rounded-t-3xl bg-gradient-to-br from-primary/20 via-accent/20 to-blue-500/20 flex items-center justify-center">
                <div className="text-4xl opacity-30">📋</div>
              </div>
            )}
            <div className="space-y-4 p-6">
              <p className="text-lg font-semibold text-slate-900 dark:text-white transition-colors duration-300 group-hover:text-primary">
                {service.title}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-300 transition-colors duration-300 group-hover:text-slate-600 dark:group-hover:text-slate-200 leading-relaxed">
                {service.description}
              </p>
            </div>
          </GlassCard>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Services;
