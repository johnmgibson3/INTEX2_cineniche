import React, { useEffect, useState } from 'react';
import {
  fetchRecommendations,
  getMoviesFromRecommendations,
} from '../../api/RecommendationsAPI';
import { Movie } from '../../types/Movie';
import MoviePoster from './MoviePoster';
import MovieDetails from './MovieDetails';
import '../../css/MoviePage.css';
import { getUserIdFromHeader } from '../../api/AuthApi';

interface RecommendedMoviesProps {
  allMovies: Movie[];
}

const RecommendedMovies: React.FC<RecommendedMoviesProps> = ({ allMovies }) => {
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const containerRef = React.useRef<HTMLDivElement>(null);

  // Load recommendations when component mounts
  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        setLoading(true);

        // Get current user ID - default to "1" if not found for development
        let userId = await getUserIdFromHeader();
        console.log('RecommendedMovies - Retrieved User ID:', userId); // 👈 Add this log

        if (!userId) {
          console.warn(
            'User ID not found, using default ID "1" for development'
          );
          userId = '1';
        }
        console.log(`Loading recommendations for user: ${userId}`);

        // Fetch recommendation IDs from ML endpoint
        const recommendedIds = await fetchRecommendations(userId);
        console.log(
          `Received ${recommendedIds.length} recommendations for user ${userId}:`,
          recommendedIds
        );

        if (recommendedIds.length === 0) {
          console.warn('No recommendations found');
          setLoading(false);
          return;
        }

        // Get full movie details for the recommended IDs
        const movies = getMoviesFromRecommendations(recommendedIds, allMovies);
        console.log(
          `Found ${movies.length} matching movies from recommendations`
        );

        // If we didn't find any matching movies in our database, show some random ones
        if (movies.length === 0 && allMovies.length > 0) {
          console.warn(
            'No matching movies found for recommendations, using random selection'
          );
          const randomMovies = [...allMovies]
            .sort(() => 0.5 - Math.random())
            .slice(0, 10);
          setRecommendedMovies(randomMovies);
        } else {
          setRecommendedMovies(movies);
        }
      } catch (error) {
        console.error('Failed to load recommendations:', error);

        // Fallback to random movies on error
        if (allMovies.length > 0) {
          console.log('Using random movies as fallback');
          const randomMovies = [...allMovies]
            .sort(() => 0.5 - Math.random())
            .slice(0, 10);
          setRecommendedMovies(randomMovies);
        }
      } finally {
        setLoading(false);
      }
    };

    if (allMovies.length > 0) {
      loadRecommendations();
    }
  }, [allMovies]);

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
  }, [recommendedMovies]);

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

  // If no recommendations or still loading
  if (loading) {
    return (
      <div className="movie-section my-4">
        <h5
          className="carousel-title text-start fw-bold mb-2"
          style={{ fontSize: '2.5rem' }}
        >
          Loading Your Recommendations...
        </h5>
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (recommendedMovies.length === 0 && !loading) {
    return null;
  }

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
        Recommended For You:
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
            {recommendedMovies.map((movie, i) => (
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
          onSelectMovie={setSelectedMovie}
        />
      )}
    </div>
  );
};

export default RecommendedMovies;
