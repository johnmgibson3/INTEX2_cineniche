import React, { useEffect, useState } from 'react';
import MovieCarousel from './MovieCarousel';
import {
  fetchRecommendations,
  getMoviesFromRecommendations,
} from '../../api/RecommendationsAPI';
import { getUserIdFromHeader } from '../../api/AuthApi';
import { Movie } from '../../types/Movie';

interface RecommendedMoviesProps {
  allMovies: Movie[];
}

const RecommendedMovies: React.FC<RecommendedMoviesProps> = ({ allMovies }) => {
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        setLoading(true);

        let userId = await getUserIdFromHeader();
        if (!userId) userId = '1'; // fallback for dev

        const recommendedIds = await fetchRecommendations(userId);

        if (recommendedIds.length === 0) {
          console.warn('No recommendations found');
          setLoading(false);
          return;
        }

        const movies = getMoviesFromRecommendations(recommendedIds, allMovies);

        if (movies.length === 0 && allMovies.length > 0) {
          const randomMovies = [...allMovies]
            .sort(() => 0.5 - Math.random())
            .slice(0, 10);
          setRecommendedMovies(randomMovies);
        } else {
          setRecommendedMovies(movies);
        }
      } catch (err) {
        console.error('Failed to load recommendations:', err);
        if (allMovies.length > 0) {
          const fallback = [...allMovies]
            .sort(() => 0.5 - Math.random())
            .slice(0, 10);
          setRecommendedMovies(fallback);
        }
      } finally {
        setLoading(false);
      }
    };

    if (allMovies.length > 0) loadRecommendations();
  }, [allMovies]);

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

  if (recommendedMovies.length === 0) return null;

  return (
    <MovieCarousel
      title="Recommended For You"
      filter={(movie) => recommendedMovies.some((m) => m.showId === movie.showId)} movies={[]}    />
  );
};

export default RecommendedMovies;
