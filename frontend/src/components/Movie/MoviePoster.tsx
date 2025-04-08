// src/components/Movie/MoviePoster.tsx
import React from 'react';
import { Movie } from '../../types/Movie';

interface MoviePosterProps {
  movie: Movie;
  onClick: () => void;
}

const MoviePoster: React.FC<MoviePosterProps> = ({ movie, onClick }) => {
  if (!movie || !movie.title) return null;

  const title = movie.title;
  const encodedTitle = encodeURIComponent(title);
  const posterSrc = `https://moviepostersintex11.blob.core.windows.net/intex/Movie%20Posters/${encodedTitle}.jpg`;

  return (
    <div
      className="movie-poster text-center me-2"
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <img
        src={posterSrc}
        alt={title}
        onError={(e) => {
          e.currentTarget.src = '/img/apple-touch-icon.png';
        }}
        style={{
          width: '100px',
          height: '150px',
          borderRadius: '5px',
          objectFit: 'cover',
        }}
      />
      <div className="movie-title mt-1">{title}</div>
    </div>
  );
};

export default MoviePoster;
