import React, { useEffect, useState } from 'react';
import { fetchAllMovies, fetchMoviesByGenre } from '../api/MoviesAPI';
import MovieCarousel from '../components/Movie/MovieCarousel';
import MovieFilterBar from '../components/Movie/MovieFilterBar';
import '../css/MoviePage.css';
import { Movie } from '../types/Movie';
import { genreMap } from '../constants/genreMap';
import Paginator from '../components/Movie/Paginator';

const useInView = () => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

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
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

// ⬇️ Each genre row section
const GenreSection: React.FC<{
  genreKey: string;
  label: string;
}> = ({ genreKey, label }) => {
  const { ref, isVisible } = useInView();
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    if (isVisible && movies.length === 0) {
      fetchMoviesByGenre(genreKey).then((res) => {
        if (res) setMovies(res);
      });
    }
  }, [isVisible, genreKey]);

  return (
    <div ref={ref} style={{ minHeight: '200px', marginBottom: '2rem' }}>
      {isVisible && movies.length > 0 && (
        <MovieCarousel
          title={label}
          filter={(movie) => movies.some((m) => m.showId === movie.showId)}
        />
      )}
    </div>
  );
};

const MoviePage: React.FC = () => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterApplied, setFilterApplied] = useState(false);

  const itemsPerPage = 12;

  useEffect(() => {
    const load = async () => {
      const movies = await fetchAllMovies();
      setAllMovies(movies);
      setFilteredMovies(movies);
    };
    load();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMovies.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);

  const handleFilterChange = ({
    searchText,
    genre,
    sortBy,
  }: {
    searchText: string;
    genre: string;
    sortBy: string;
  }) => {
    let result = [...allMovies];

    if (searchText) {
      result = result.filter((m) =>
        m.title?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (genre) {
      const genreKey = Object.entries(genreMap).find(
        ([, label]) => label === genre
      )?.[0];
      if (genreKey) {
        result = result.filter((m) => m[genreKey as keyof Movie] === 1);
      }
    }

    switch (sortBy) {
      case 'directorAZ':
        result.sort((a, b) =>
          (a.director || '').localeCompare(b.director || '')
        );
        break;
      case 'directorZA':
        result.sort((a, b) =>
          (b.director || '').localeCompare(a.director || '')
        );
        break;
      case 'yearAsc':
        result.sort((a, b) => (a.releaseYear ?? 0) - (b.releaseYear ?? 0));
        break;
      case 'yearDesc':
        result.sort((a, b) => (b.releaseYear ?? 0) - (a.releaseYear ?? 0));
        break;
    }

    setFilteredMovies(result);
    setCurrentPage(1);
    setFilterApplied(true);
  };

  const handleClear = () => {
    setFilteredMovies(allMovies);
    setCurrentPage(1);
    setFilterApplied(false);
  };

  return (
    <div className="page-wrapper bg-dark text-white">
      <div className="container py-4">
        <MovieFilterBar
          genres={Object.values(genreMap)}
          onFilterChange={handleFilterChange}
          onClear={handleClear}
        />

        {filterApplied ? (
          <>
            <MovieCarousel
              title="Filtered Movies"
              filter={(movie) =>
                currentItems.some((m) => m.showId === movie.showId)
              }
            />
            <div className="d-flex justify-content-center mt-4">
              <Paginator
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </>
        ) : (
          <>
            {Object.entries(genreMap).map(([key, label]) => (
              <GenreSection key={key} genreKey={key} label={label} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default MoviePage;
