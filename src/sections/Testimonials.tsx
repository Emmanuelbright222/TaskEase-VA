import GradientHeading from '../components/ui/GradientHeading';
import SectionWrapper from '../components/ui/SectionWrapper';
import GlassCard from '../components/ui/GlassCard';
import StarRating from '../components/ui/StarRating';
import TestimonialCarouselScroll from '../components/ui/TestimonialCarouselScroll';
import { usePortfolioData } from '../hooks/usePortfolioData';

const Testimonials = () => {
  const { data } = usePortfolioData();

  if (!data?.testimonials || data.testimonials.length === 0) {
    return (
      <SectionWrapper id="testimonials">
        <div className="space-y-3 text-center mb-12">
          <GradientHeading>Testimonials</GradientHeading>
          <h3 className="section-heading">Trusted by product-led teams</h3>
        </div>
        <div className="text-center py-12">
          <p className="text-slate-500 dark:text-slate-400">No testimonials available yet.</p>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id="testimonials">
      <div className="space-y-3 text-center mb-12">
        <GradientHeading>Testimonials</GradientHeading>
        <h3 className="section-heading">Trusted by product-led teams</h3>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          See what clients say about working with TaskEase VA
        </p>
      </div>
      <div className="relative">
        {/* Mobile: Horizontal scroll, one at a time */}
        <div className="overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth md:hidden" style={{ scrollBehavior: 'smooth' }}>
          <div className="flex gap-6 pb-4" style={{ width: 'max-content' }}>
            {data.testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-shrink-0 snap-start"
                style={{ 
                  width: 'calc(100vw - 2rem)',
                  minWidth: 'calc(100vw - 2rem)',
                  maxWidth: 'calc(100vw - 2rem)'
                }}
              >
                <GlassCard className="h-full p-6 space-y-4 cursor-default group">
                  <div className="flex items-start justify-between">
                    {testimonial.rating && (
                      <StarRating rating={testimonial.rating} size="md" />
                    )}
                    <div className="text-5xl text-primary/10 dark:text-primary/20 font-serif leading-none">
                      "
                    </div>
                  </div>
                  <p className="text-base font-medium text-slate-900 dark:text-white leading-relaxed">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                    {testimonial.avatar && (
                      <div className="relative flex-shrink-0">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/20"
                        />
                        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary/40 via-accent/40 to-blue-500/40 blur-md opacity-50" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                        {testimonial.name}
                      </p>
                      {testimonial.rating && (
                        <StarRating rating={testimonial.rating} size="sm" className="mt-1" />
                      )}
                    </div>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
        {/* Desktop: Grid layout, 3 per row with horizontal scroll */}
        <div className="hidden md:block">
          <TestimonialCarouselScroll testimonials={data.testimonials} />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Testimonials;
