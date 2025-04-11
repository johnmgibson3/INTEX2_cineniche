import React from 'react';
import MoviePoster from './MoviePoster';
import { Movie } from '../../types/Movie';

interface AllMoviesGridProps {
  movies: Movie[];
  onPosterClick: (movie: Movie) => void;
}

const AllMoviesGrid: React.FC<AllMoviesGridProps> = ({ movies, onPosterClick }) => {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MoviePoster
          key={movie.showId}
          movie={movie}
          onClick={() => onPosterClick(movie)}
          showLibraryButton={false} // ❌ no library controls on this page
        />
      ))}
    </div>
  );
};

export default AllMoviesGrid;
