// MovieAverageRating.tsx
import React, { useEffect, useState } from 'react';
import { getAverageRating } from '../../api/RatingsAPI';

interface MovieAverageRatingProps {
  showId: string;
}

const MovieAverageRating: React.FC<MovieAverageRatingProps> = ({ showId }) => {
  const [averageRating, setAverageRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const avg = await getAverageRating(showId);
        setAverageRating(avg);
      } catch (error) {
        console.error('Error fetching average rating:', error);
      }
    };

    fetchAverageRating();
  }, [showId]);

  if (averageRating === null) {
    return (
      <p className="mt-2" style={{ color: '#b8860b' }}>
        Be the first to rate this movie!
      </p>
    );
  }

  return (
    <div
      className="mt-2 d-flex align-items-center"
      style={{ fontSize: '0.95rem' }}
    >
      <strong style={{ marginRight: '0.5rem' }}>Average User Rating:</strong>
      {Array.from({ length: 5 }, (_, i) => {
        const diff = averageRating - i;
        if (diff >= 1) {
          return (
            <span key={i} style={{ color: '#ffc107' }}>
              ★
            </span>
          );
        } else if (diff >= 0.25 && diff < 0.75) {
          return (
            <span key={i} style={{ color: '#ffc107' }}>
              ⭐
            </span>
          );
        } else {
          return (
            <span key={i} style={{ color: '#ccc' }}>
              ★
            </span>
          );
        }
      })}
      <span
        style={{ marginLeft: '0.5rem', color: '#aaa', fontSize: '0.85rem' }}
      >
        ({averageRating.toFixed(1)} / 5)
      </span>
    </div>
  );
};

export default MovieAverageRating;
