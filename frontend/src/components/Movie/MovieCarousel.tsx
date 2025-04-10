import React, { useEffect, useRef, useState } from 'react';
import MoviePoster from './MoviePoster';
import MovieDetails from './MovieDetails';
import { Movie } from '../../types/Movie';
import { fetchAllMovies } from '../../api/MoviesAPI';
import '../../css/MoviePage.css';

interface MovieCarouselProps {
  title: string;
  filter?: (movie: Movie) => boolean;
  chunkSize?: number;
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ title, filter }) => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Load movies
  useEffect(() => {
    const loadMovies = async () => {
      try {
        const movies = await fetchAllMovies();
        const filtered = filter ? movies.filter(filter) : movies;
        setAllMovies(filtered);
      } catch (err) {
        console.error('Failed to load movies:', err);
      }
    };

    loadMovies();
  }, [filter]);

  // Update scroll arrows
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScrollState = () => {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft + container.clientWidth < container.scrollWidth - 1
      );
    };

    container.addEventListener('scroll', updateScrollState);
    window.addEventListener('resize', updateScrollState);
    updateScrollState();

    return () => {
      container.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [allMovies]);

  // Scroll by a page
  const scrollByAmount = (direction: 'left' | 'right') => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.9;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className="movie-section my-4"
      style={{
        width: '75vw',
        paddingLeft: '.2rem',
        paddingRight: '.2rem',
      }}
    >
      <h5
        className="carousel-title text-start fw-bold mb-2"
        style={{ fontSize: '2.5rem' }}
      >
        {title}:
      </h5>

      <div className="d-flex align-items-center">
        {/* Left Arrow */}
        {canScrollLeft && (
          <div
            className="arrow-icon"
            style={{
              marginRight: '0.5rem',
              fontSize: '1.8rem',
              cursor: 'pointer',
              zIndex: 1,
            }}
            onClick={() => scrollByAmount('left')}
          >
            <i className="bi bi-arrow-left-circle" />
          </div>
        )}

        {/* Movie Row */}
        <div className="movie-row-wrapper">
          <div
            ref={containerRef}
            className="movie-row"
            style={{
              display: 'flex',
              flexWrap: 'nowrap',
              gap: '1rem',
              overflowX: 'auto',
              scrollBehavior: 'smooth',
              paddingBottom: '0.5rem',
            }}
          >
            {allMovies.map((movie, i) => (
              <MoviePoster
                key={`${movie.showId ?? 'no-id'}-${movie.title ?? 'untitled'}-${i}`}
                movie={movie}
                onClick={() => setSelectedMovie(movie)}
              />
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        {canScrollRight && (
          <div
            className="arrow-icon"
            style={{
              marginLeft: '0.5rem',
              fontSize: '1.8rem',
              cursor: 'pointer',
              zIndex: 1,
            }}
            onClick={() => scrollByAmount('right')}
          >
            <i className="bi bi-arrow-right-circle" />
          </div>
        )}
      </div>

      {/* Movie Modal */}
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
