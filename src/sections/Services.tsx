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
      <div className="grid gap-6 md:grid-cols-3">
        {data?.services.map((service) => (
          <GlassCard key={service.id} className="space-y-4 cursor-default group">
            <p className="text-lg font-semibold text-slate-900 dark:text-white transition-colors duration-300 group-hover:text-primary">
              {service.title}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-300 transition-colors duration-300 group-hover:text-slate-600 dark:group-hover:text-slate-200">
              {service.description}
            </p>
          </GlassCard>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Services;
