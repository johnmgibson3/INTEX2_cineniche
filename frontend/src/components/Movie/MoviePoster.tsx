import React, { useRef, useEffect, useState } from 'react';
import { Movie } from '../../types/Movie';
import Shimmer from './Shimmer';
import '../../css/MoviePage.css';

interface MoviePosterProps {
  movie: Movie;
  onClick: () => void;
}

const sanitizeFilename = (title: string): string =>
  (title ?? '').replace(/[^\w\s]/g, '').trim();

const toTitleCase = (str: string): string =>
  str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const MoviePoster: React.FC<MoviePosterProps> = ({ movie, onClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [, setHasError] = useState(false);
  //const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [srcAttempted, setSrcAttempted] = useState<
    'original' | 'fallback' | 'default'
  >('original');

  const imgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
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
        return '/img/apple-touch-icon.png'; // fallback icon in public/
    }
  };

  const handleImageError = () => {
    if (srcAttempted === 'original') {
      setSrcAttempted('fallback');
    } else if (srcAttempted === 'fallback') {
      setSrcAttempted('default');
      setHasError(true);
      setLoaded(true);
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
        {isVisible && !loaded && srcAttempted !== 'default' && (
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
            key={srcAttempted} // ⬅️ force re-render on src change
            src={getPosterSrc()}
            alt={movie.title ?? 'Movie poster'}
            onLoad={() => setLoaded(true)}
            onError={handleImageError}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '5px',
              transition: 'opacity 0.5s ease-in-out',
              opacity: loaded ? 1 : 0,
              zIndex: 2,
              position: 'relative',
            }}
          />
        )}

        <div className="poster-gradient" />
        <div className="poster-title">{movie.title}</div>
      </div>

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
