import GradientHeading from '../components/ui/GradientHeading';
import SectionWrapper from '../components/ui/SectionWrapper';
import TestimonialCarouselScroll from '../components/ui/TestimonialCarouselScroll';
import TestimonialCarouselMobile from '../components/ui/TestimonialCarouselMobile';
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
        <div className="md:hidden">
          <TestimonialCarouselMobile testimonials={data.testimonials} />
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
