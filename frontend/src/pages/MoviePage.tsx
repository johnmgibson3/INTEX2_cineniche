// MoviePage.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { fetchAllMovies } from '../api/MoviesAPI';
import { fetchAllHybridRecommendationsSecure } from '../api/HybridAPI.ts';
import { Recommend } from '../types/HybridRecommender.ts';
import MovieCarousel from '../components/Movie/MovieCarousel';
import MovieFilterBar from '../components/Movie/MovieFilterBar';
import '../css/MoviePage.css';
import { Movie } from '../types/Movie';
import { genreMap } from '../constants/genreMap';
import Paginator from '../components/Movie/Paginator';

const useInView = () => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
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

const MoviePage: React.FC = () => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterApplied, setFilterApplied] = useState(false);
  const itemsPerPage = 12;
  const [recommendations, setRecommendations] = useState<Recommend[]>([]);

  useEffect(() => {
    const load = async () => {
      const movies = await fetchAllMovies();
      
      setAllMovies(movies ?? []);
      //Benji Code
      const recommendationsData = await fetchAllHybridRecommendationsSecure();
      if (movies) {
        setAllMovies(movies);
      }
      if (recommendationsData) {
        setRecommendations(recommendationsData);
      }
    //Regular code
    };
    load();
  }, []);

  

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterApplied
    ? filteredMovies.slice(indexOfFirstItem, indexOfLastItem)
    : filteredMovies;
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
            {Object.entries(genreMap).map(([key, label]) => {
              const { ref, isVisible } = useInView();

              const genreMovies = useMemo(() => {
                return allMovies.filter(
                  (movie) => movie[key as keyof Movie] === 1
                );
              }, [allMovies]);

              return (
                <div
                  ref={ref}
                  key={key}
                  style={{ minHeight: '200px', marginBottom: '2rem' }}
                >
                  {isVisible && genreMovies.length > 0 && (
                    <MovieCarousel
                      title={label}
                      filter={(movie) => movie[key as keyof Movie] === 1}
                    />
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default MoviePage;
