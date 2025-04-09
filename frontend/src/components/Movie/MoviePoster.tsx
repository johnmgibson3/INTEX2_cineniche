import React, { useRef, useEffect, useState } from 'react';
import { Movie } from '../../types/Movie';
import Shimmer from './Shimmer';
import '../../css/MoviePage.css';

interface MoviePosterProps {
  movie: Movie;
  onClick: () => void;
}

// Remove punctuation but keep original spacing
const sanitizeFilename = (title: string): string => {
  return (title ?? '')
    .replace(/[^\w\s]/g, '') // Remove all special characters but keep spaces
    .trim();
};

const toTitleCase = (str: string): string =>
  str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const MoviePoster: React.FC<MoviePosterProps> = ({ movie, onClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [srcAttempted, setSrcAttempted] = useState<
    'original' | 'fallback' | 'default'
  >('original');

  const imgRef = useRef<HTMLDivElement | null>(null);

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

  const originalTitle = sanitizeFilename(movie.title ?? 'default');
  const fallbackTitle = toTitleCase(originalTitle);

  const getPosterSrc = () => {
    switch (srcAttempted) {
      case 'original':
        return `https://moviepostersintex11.blob.core.windows.net/intex/Movie%20Posters/${encodeURIComponent(originalTitle)}.jpg`;
      case 'fallback':
        return `https://moviepostersintex11.blob.core.windows.net/intex/Movie%20Posters/${encodeURIComponent(fallbackTitle)}.jpg`;
      case 'default':
      default:
        return '/img/apple-touch-icon.png';
    }
  };

  const handleImageError = () => {
    if (srcAttempted === 'original') {
      setSrcAttempted('fallback');
    } else if (srcAttempted === 'fallback') {
      setSrcAttempted('default');
      setHasError(true);
      setLoaded(true); // <- THIS is the missing piece!
    }
  };

  return (
    <div
      onClick={onClick}
      className="movie-poster"
      style={{
        flex: '0 0 auto',
        width: '250px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        ref={imgRef}
        style={{
          width: '100%',
          height: '400px',
          borderRadius: '5px',
          overflow: 'hidden',
          backgroundColor: '#333',
          position: 'relative',
        }}
      >
        {!loaded && isVisible && srcAttempted !== 'default' && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 1,
              width: '100%',
              height: '100%',
            }}
          >
            <Shimmer width="100%" height="100%" />
          </div>
        )}

        {isVisible && (
          <img
            src={getPosterSrc()}
            alt={movie.title ?? 'Movie poster'}
            onError={handleImageError}
            onLoad={() => setLoaded(true)}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '5px',
              transition: 'opacity 0.5s ease-in-out',
              opacity: loaded ? 1 : 0,
              zIndex: 2,
            }}
          />
        )}
        <div className="poster-gradient" />
        <div className="poster-title">{movie.title}</div>
      </div>

      {/* TITLE BELOW */}
      <div
        className="poster-default-title"
        style={{
          color: '#fff',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: '0.5rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxWidth: '100%',
        }}
        title={movie.title}
      >
        {movie.title}
      </div>
    </div>
  );
};

export default MoviePoster;
