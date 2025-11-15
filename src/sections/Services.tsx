import GradientHeading from '../components/ui/GradientHeading';
import SectionWrapper from '../components/ui/SectionWrapper';
import GlassCard from '../components/ui/GlassCard';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { motion } from 'framer-motion';

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
        {data?.services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <GlassCard className="overflow-hidden cursor-default group rounded-3xl">
            {service.imageUrl ? (
              <div className="relative h-56 w-full overflow-hidden -m-6 -mt-6 mb-4 rounded-t-3xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-blue-500/20 blur-2xl" />
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  style={{ 
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                  onError={(e) => {
                    // Fallback if image fails to load
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />
              </div>
            ) : (
              // Placeholder if no image
              <div className="relative h-56 w-full overflow-hidden -m-6 -mt-6 mb-4 rounded-t-3xl bg-gradient-to-br from-primary/20 via-accent/20 to-blue-500/20 flex items-center justify-center">
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
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Services;
