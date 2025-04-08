import React, { useEffect, useState, useCallback } from 'react';
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
  const [visibleMovies, setVisibleMovies] = useState<Movie[]>([]);
  const [visibleCount, setVisibleCount] = useState(chunkSize);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const loadMore = useCallback(() => {
    const newCount = visibleCount + chunkSize;
    setVisibleCount(newCount);
    setVisibleMovies(allMovies.slice(0, newCount));
  }, [visibleCount, allMovies, chunkSize]);

  useEffect(() => {
    const load = async () => {
      const movies = await fetchAllMovies();
      const filtered = filter ? movies.filter(filter) : movies;
      setAllMovies(filtered);
      setVisibleMovies(filtered.slice(0, chunkSize));
    };

    load();
  }, [filter, chunkSize]);

  // 📌 Intersection with the footer
  useEffect(() => {
    const footer = document.querySelector('#footer');
    if (!footer || visibleCount >= allMovies.length) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) loadMore();
    });

    observer.observe(footer);
    return () => observer.disconnect();
  }, [loadMore, allMovies.length, visibleCount]);

  return (
    <div className="movie-section">
      <h5>{title}:</h5>
      <div className="movie-row">
        {visibleMovies.map((movie, i) => (
          <MoviePoster
            key={`${movie.showId ?? 'no-id'}-${movie.title ?? 'untitled'}-${i}`}
            movie={movie}
            onClick={() => setSelectedMovie(movie)}
          />
        ))}
        {/* Optional: scroll arrow if you want it back */}
        {visibleCount < allMovies.length && (
          <div className="arrow-icon" onClick={loadMore}>
            <i className="bi bi-arrow-right-circle"></i>
          </div>
        )}
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
