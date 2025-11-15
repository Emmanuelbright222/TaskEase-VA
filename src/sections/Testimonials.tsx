import GradientHeading from '../components/ui/GradientHeading';
import SectionWrapper from '../components/ui/SectionWrapper';
import GlassCard from '../components/ui/GlassCard';
import { usePortfolioData } from '../hooks/usePortfolioData';

const Testimonials = () => {
  const { data } = usePortfolioData();

  return (
    <SectionWrapper id="testimonials">
      <div className="space-y-3">
        <GradientHeading>Testimonials</GradientHeading>
        <h3 className="section-heading">Trusted by product-led teams</h3>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {data?.testimonials.map((testimonial) => (
          <GlassCard key={testimonial.id} className="space-y-4">
            <p className="text-lg font-medium text-slate-900 dark:text-white">{testimonial.quote}</p>
            <div className="flex items-center gap-3">
              {testimonial.avatar && <img src={testimonial.avatar} alt={testimonial.name} className="h-12 w-12 rounded-full object-cover" />}
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{testimonial.name}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Testimonials;
