import { Star } from 'lucide-react';

type StarRatingProps = {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const StarRating = ({ rating, size = 'md', className = '' }: StarRatingProps) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          className={`${sizeClasses[size]} fill-amber-400 text-amber-400`}
          strokeWidth={0}
        />
      ))}
      {hasHalfStar && (
        <div className="relative">
          <Star
            className={`${sizeClasses[size]} fill-amber-400/50 text-amber-400`}
            strokeWidth={0}
          />
          <Star
            className={`${sizeClasses[size]} fill-amber-400 text-amber-400 absolute left-0 top-0 overflow-hidden`}
            style={{ clipPath: 'inset(0 50% 0 0)' }}
            strokeWidth={0}
          />
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star
          key={`empty-${i}`}
          className={`${sizeClasses[size]} fill-none text-amber-400/30`}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
};

export default StarRating;

