import GradientHeading from '../components/ui/GradientHeading';
import SectionWrapper from '../components/ui/SectionWrapper';
import TestimonialCarousel from '../components/ui/TestimonialCarousel';
import { usePortfolioData } from '../hooks/usePortfolioData';

const Testimonials = () => {
  const { data } = usePortfolioData();

  return (
    <SectionWrapper id="testimonials">
      <div className="space-y-3 text-center mb-12">
        <GradientHeading>Testimonials</GradientHeading>
        <h3 className="section-heading">Trusted by product-led teams</h3>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          See what clients say about working with TaskEase VA
        </p>
      </div>
      <div className="max-w-4xl mx-auto px-4">
        {data?.testimonials && data.testimonials.length > 0 ? (
          <TestimonialCarousel testimonials={data.testimonials} />
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-500 dark:text-slate-400">No testimonials available yet.</p>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
};

export default Testimonials;
