import React, { useRef, useEffect, useState } from 'react';
import { Movie } from '../../types/Movie';

interface MoviePosterProps {
  movie: Movie;
  onClick: () => void;
}

const MoviePoster: React.FC<MoviePosterProps> = ({ movie, onClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  const encodedTitle = encodeURIComponent(movie.title ?? 'default');
  const posterSrc = `https://moviepostersintex11.blob.core.windows.net/intex/Movie%20Posters/${encodedTitle}.jpg`;

  return (
    <div
      className="movie-poster text-center me-2"
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      {isVisible ? (
        <img
          ref={imgRef}
          src={hasError ? '/img/apple-touch-icon.png' : posterSrc}
          alt={movie.title ?? 'Movie poster'}
          onError={() => setHasError(true)}
          loading="lazy"
          style={{
            width: '100px',
            height: '150px',
            borderRadius: '5px',
            objectFit: 'cover',
          }}
        />
      ) : (
        <div
          ref={imgRef}
          style={{
            width: '100px',
            height: '150px',
            borderRadius: '5px',
            backgroundColor: '#333',
          }}
        />
      )}

      <div className="movie-title mt-1">{movie.title}</div>
    </div>
  );
};

export default MoviePoster;
