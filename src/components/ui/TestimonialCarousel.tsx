import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import GlassCard from './GlassCard';
import StarRating from './StarRating';
import type { Testimonial } from '../../types/portfolio';

type TestimonialCarouselProps = {
  testimonials: Testimonial[];
};

const TestimonialCarousel = ({ testimonials }: TestimonialCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    if (newDirection === 1) {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    } else {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  if (testimonials.length === 0) {
    return (
      <div className="w-full">
        <GlassCard className="p-8 md:p-12 space-y-6">
          <p className="text-center text-slate-500 dark:text-slate-400">No testimonials available yet.</p>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-[400px]">
      <div className="relative overflow-hidden rounded-3xl h-full">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="w-full cursor-grab active:cursor-grabbing"
          >
            <GlassCard className="p-8 md:p-12 space-y-6">
              <div className="flex items-start justify-between mb-4">
                {testimonials[currentIndex].rating && (
                  <StarRating rating={testimonials[currentIndex].rating!} size="lg" />
                )}
                <div className="text-6xl md:text-7xl text-primary/10 dark:text-primary/20 font-serif leading-none">
                  "
                </div>
              </div>
              <p className="text-lg md:text-xl font-medium text-slate-900 dark:text-white leading-relaxed">
                {testimonials[currentIndex].quote}
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                {testimonials[currentIndex].avatar && (
                  <div className="relative">
                    <img
                      src={testimonials[currentIndex].avatar}
                      alt={testimonials[currentIndex].name}
                      className="h-14 w-14 md:h-16 md:w-16 rounded-full object-cover ring-4 ring-primary/20"
                    />
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary/40 via-accent/40 to-blue-500/40 blur-md opacity-50" />
                  </div>
                )}
                <div>
                  <p className="text-base font-semibold text-slate-900 dark:text-white">
                    {testimonials[currentIndex].name}
                  </p>
                  {testimonials[currentIndex].rating && (
                    <StarRating rating={testimonials[currentIndex].rating!} size="sm" className="mt-1" />
                  )}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      {testimonials.length > 1 && (
        <>
          <button
            onClick={() => paginate(-1)}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border border-white/30 dark:border-white/20 shadow-xl hover:bg-white dark:hover:bg-slate-800 transition-all duration-200 hover:scale-110 active:scale-95"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-slate-700 dark:text-white" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border border-white/30 dark:border-white/20 shadow-xl hover:bg-white dark:hover:bg-slate-800 transition-all duration-200 hover:scale-110 active:scale-95"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-slate-700 dark:text-white" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-8 h-2 bg-primary'
                    : 'w-2 h-2 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TestimonialCarousel;

