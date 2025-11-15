import GradientHeading from '../components/ui/GradientHeading';
import SectionWrapper from '../components/ui/SectionWrapper';
import GlassCard from '../components/ui/GlassCard';
import { usePortfolioData } from '../hooks/usePortfolioData';

const Pricing = () => {
  const { data } = usePortfolioData();

  if (!data?.pricing.enabled) return null;

  return (
    <SectionWrapper id="pricing">
      <div className="space-y-3 text-center">
        <GradientHeading>Pricing</GradientHeading>
        <h3 className="section-heading">Choose the engagement style that fits</h3>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {data.pricing.plans.map((plan) => (
          <GlassCard key={plan.id} className="flex flex-col space-y-4 border border-white/30 cursor-default group">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500 transition-colors duration-300 group-hover:text-primary">
                {plan.title}
              </p>
              <p className="text-3xl font-semibold text-slate-900 dark:text-white transition-colors duration-300 group-hover:text-primary">
                {plan.price}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-300 transition-colors duration-300 group-hover:text-slate-600 dark:group-hover:text-slate-200">
                {plan.description}
              </p>
            </div>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-200">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 transition-colors duration-300 group-hover:text-slate-700 dark:group-hover:text-slate-100">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary transition-transform duration-300 group-hover:scale-125" />
                  {feature}
                </li>
              ))}
            </ul>
          </GlassCard>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Pricing;
