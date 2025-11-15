import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import GlassCard from './GlassCard';
import StarRating from './StarRating';
import type { Testimonial } from '../../types/portfolio';

type TestimonialCarouselScrollProps = {
  testimonials: Testimonial[];
};

const TestimonialCarouselScroll = ({ testimonials }: TestimonialCarouselScrollProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const checkScrollability = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScrollability();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollability);
      window.addEventListener('resize', checkScrollability);
      return () => {
        container.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
      };
    }
  }, [testimonials.length]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = container.clientWidth / 3;
    const scrollAmount = cardWidth + 24; // card width + gap
    const newScrollLeft = direction === 'right' 
      ? container.scrollLeft + scrollAmount 
      : container.scrollLeft - scrollAmount;
    
    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
    
    // Update current index
    const newIndex = Math.round(newScrollLeft / scrollAmount);
    setCurrentIndex(Math.max(0, Math.min(newIndex, testimonials.length - 3)));
  };

  if (testimonials.length === 0) return null;

  return (
    <div className="relative">
      <div 
        ref={scrollContainerRef}
        className="overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth px-4"
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
                width: 'calc((100vw - 8rem) / 3)',
                minWidth: '380px',
                maxWidth: '420px',
                scrollSnapAlign: 'start'
              }}
            >
              <GlassCard className="h-full p-8 space-y-4 cursor-default group">
                <div className="flex items-start justify-between">
                  {testimonial.rating && (
                    <StarRating rating={testimonial.rating} size="md" />
                  )}
                  <div className="text-6xl text-primary/10 dark:text-primary/20 font-serif leading-none">
                    "
                  </div>
                </div>
                <p className="text-lg font-medium text-slate-900 dark:text-white leading-relaxed">
                  {testimonial.quote}
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  {testimonial.avatar && (
                    <div className="relative flex-shrink-0">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="h-14 w-14 rounded-full object-cover ring-2 ring-primary/20"
                      />
                      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary/40 via-accent/40 to-blue-500/40 blur-md opacity-50" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-base font-semibold text-slate-900 dark:text-white truncate">
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

      {/* Navigation Buttons */}
      {testimonials.length > 3 && (
        <>
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border border-white/30 dark:border-white/20 shadow-xl transition-all duration-200 hover:scale-110 active:scale-95 ${
              !canScrollLeft ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white dark:hover:bg-slate-800'
            }`}
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-5 h-5 text-slate-700 dark:text-white" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border border-white/30 dark:border-white/20 shadow-xl transition-all duration-200 hover:scale-110 active:scale-95 ${
              !canScrollRight ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white dark:hover:bg-slate-800'
            }`}
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-5 h-5 text-slate-700 dark:text-white" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {testimonials.length > 3 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!scrollContainerRef.current) return;
                const container = scrollContainerRef.current;
                const cardWidth = container.clientWidth / 3;
                const scrollAmount = (cardWidth + 24) * index * 3;
                container.scrollTo({
                  left: scrollAmount,
                  behavior: 'smooth'
                });
                setCurrentIndex(index);
              }}
              className={`transition-all duration-300 rounded-full ${
                Math.floor(currentIndex / 3) === index
                  ? 'w-8 h-2 bg-primary'
                  : 'w-2 h-2 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialCarouselScroll;

