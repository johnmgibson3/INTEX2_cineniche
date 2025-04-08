import React, { useEffect, useRef, useState } from 'react';
import MoviePoster from './MoviePoster';
import MovieDetails from './MovieDetails';
import { Movie } from '../../types/Movie';
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

  useEffect(() => {
    const load = async () => {
      const movies = await fetchAllMovies();
      const filtered = filter ? movies.filter(filter) : movies;
      setAllMovies(filtered);
    };
    load();
  }, [filter]);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + chunkSize);
  };

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
        <div
          className="arrow-icon ms-2"
          style={{ cursor: 'pointer', fontSize: '1.5rem' }}
          onClick={handleShowMore}
        >
          <i className="bi bi-arrow-right-circle" />
        </div>
      </div>

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
