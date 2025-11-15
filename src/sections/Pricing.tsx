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
          <GlassCard key={plan.id} className="flex flex-col space-y-4 border border-white/30">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{plan.title}</p>
              <p className="text-3xl font-semibold text-slate-900 dark:text-white">{plan.price}</p>
              <p className="text-sm text-slate-500 dark:text-slate-300">{plan.description}</p>
            </div>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-200">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
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
