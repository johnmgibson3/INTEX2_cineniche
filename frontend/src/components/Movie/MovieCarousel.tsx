import React, { useEffect, useRef, useState } from 'react';
import MoviePoster from './MoviePoster';
import MovieDetails from './MovieDetails';
import { Movie } from '../../types/Movie.ts';
import { fetchAllMovies } from '../../api/MoviesAPI';

interface MovieCarouselProps {
  title: string;
  filter?: (movie: Movie) => boolean;
  chunkSize?: number;
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({
  title,
  filter,
  chunkSize = 8,
}) => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [visibleCount, setVisibleCount] = useState(chunkSize);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load all movies and filter by genre
  useEffect(() => {
    const loadMovies = async () => {
      try {
        const movies = await fetchAllMovies();
        const filteredMovies = filter ? movies.filter(filter) : movies;
        setAllMovies(filteredMovies);
      } catch (error) {
        console.error('Error loading movies in carousel:', error);
      }
    };

    loadMovies();
  }, [filter]);

  // Show more posters when arrow is clicked
  const handleShowMore = () => {
    setVisibleCount((prev) => prev + chunkSize);
  };

  // Only render visible subset of movies
  const visibleMovies = allMovies.slice(0, visibleCount);

  return (
    <div className="movie-section px-3 my-4">
      <h5 className="carousel-title text-start fw-bold fs-4 mb-2">{title}:</h5>

      <div className="d-flex align-items-center">
        <div
          ref={containerRef}
          className="movie-row d-flex overflow-auto"
          style={{ gap: '0.75rem', flexWrap: 'nowrap' }}
        >
          {visibleMovies.map((movie, i) => (
            <MoviePoster
              key={`${movie.showId ?? 'no-id'}-${movie.title ?? 'untitled'}-${i}`}
              movie={movie}
              onClick={() => setSelectedMovie(movie)}
            />
          ))}
        </div>

        {/* Show arrow only if more movies are available */}
        {visibleCount < allMovies.length && (
          <div
            className="arrow-icon ms-2"
            style={{ cursor: 'pointer', fontSize: '1.5rem' }}
            onClick={handleShowMore}
          >
            <i className="bi bi-arrow-right-circle" />
          </div>
        )}
      </div>

      {/* Modal for showing movie details */}
      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
};

export default MovieCarousel;
