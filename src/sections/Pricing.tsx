import GradientHeading from '../components/ui/GradientHeading';
import SectionWrapper from '../components/ui/SectionWrapper';
import GlassCard from '../components/ui/GlassCard';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { CheckIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

const Pricing = () => {
  const { data } = usePortfolioData();

  if (!data?.pricing.enabled) return null;

  const plans = data.pricing.plans;
  const recommendedIndex = Math.floor(plans.length / 2); // Middle plan is recommended

  return (
    <SectionWrapper id="pricing">
      <div className="space-y-3 text-center mb-12">
        <GradientHeading>Pricing</GradientHeading>
        <h3 className="section-heading">Choose the engagement style that fits</h3>
      </div>
      <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
        {plans.map((plan, index) => {
          const isRecommended = index === recommendedIndex;
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0, margin: '-150px 0px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              {isRecommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <span className="inline-flex items-center rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-1 text-xs font-semibold text-white shadow-lg">
                    Recommended
                  </span>
                </div>
              )}
              <GlassCard
                className={`flex flex-col h-full space-y-6 p-6 md:p-8 cursor-default group transition-all duration-300 rounded-3xl ${
                  isRecommended
                    ? 'border-2 border-amber-400/50 dark:border-amber-400/30 shadow-2xl md:scale-105 hover:scale-[1.07] hover:border-amber-400/70'
                    : 'border-2 border-white/20 hover:border-white/40 hover:scale-[1.02]'
                }`}
              >
                <div className="space-y-3">
                  <p className="text-sm uppercase tracking-[0.2em] font-semibold text-slate-500 dark:text-slate-400">
                    {plan.title}
                  </p>
                  <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                    {plan.price}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {plan.description}
                  </p>
                </div>
                <ul className="flex-1 space-y-3 text-sm text-slate-700 dark:text-slate-200">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckIcon className="h-5 w-5 text-amber-500 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
};

export default Pricing;
