import { useRef, useEffect, useState } from 'react';
import GlassCard from './GlassCard';
import StarRating from './StarRating';
import type { Testimonial } from '../../types/portfolio';

type TestimonialCarouselMobileProps = {
  testimonials: Testimonial[];
};

const TestimonialCarouselMobile = ({ testimonials }: TestimonialCarouselMobileProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll functionality for mobile
  useEffect(() => {
    if (testimonials.length <= 1) return;
    
    const autoScrollInterval = setInterval(() => {
      if (!scrollContainerRef.current) return;
      const container = scrollContainerRef.current;
      const { scrollLeft, scrollWidth, clientWidth } = container;
      
      // Check if we can scroll right
      if (scrollLeft < scrollWidth - clientWidth - 10) {
        const cardWidth = container.clientWidth;
        const newScrollLeft = scrollLeft + cardWidth;
        
        container.scrollTo({
          left: newScrollLeft,
          behavior: 'smooth'
        });
        
        const newIndex = Math.round(newScrollLeft / cardWidth);
        setCurrentIndex(Math.max(0, Math.min(newIndex, testimonials.length - 1)));
      } else {
        // Reset to beginning
        container.scrollTo({
          left: 0,
          behavior: 'smooth'
        });
        setCurrentIndex(0);
      }
    }, 5000); // Auto-scroll every 5 seconds

    return () => clearInterval(autoScrollInterval);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  return (
    <div className="relative">
      <div 
        ref={scrollContainerRef}
        className="overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth"
        style={{ 
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
          scrollSnapType: 'x mandatory'
        }}
      >
        <div className="flex gap-6 pb-4" style={{ width: 'max-content' }}>
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex-shrink-0 snap-start"
              style={{ 
                width: 'calc(100vw - 2rem)',
                minWidth: 'calc(100vw - 2rem)',
                maxWidth: 'calc(100vw - 2rem)',
                scrollSnapAlign: 'start'
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

      {/* Dots Indicator */}
      {testimonials.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!scrollContainerRef.current) return;
                const container = scrollContainerRef.current;
                const cardWidth = container.clientWidth;
                container.scrollTo({
                  left: cardWidth * index,
                  behavior: 'smooth'
                });
                setCurrentIndex(index);
              }}
              className={`transition-all duration-300 rounded-full ${
                currentIndex === index
                  ? 'w-8 h-2 bg-primary'
                  : 'w-2 h-2 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialCarouselMobile;

