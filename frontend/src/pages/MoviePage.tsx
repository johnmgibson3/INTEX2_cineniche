import React, { useEffect, useState } from 'react';
import { fetchAllMovies } from '../api/MoviesAPI';
import MovieCarousel from '../components/Movie/MovieCarousel';
import MovieFilterBar from '../components/Movie/MovieFilterBar';
import { Movie } from '../types/Movie';
import { genreMap } from '../constants/genreMap';
import Paginator from '../components/Movie/Paginator';

const MoviePage: React.FC = () => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    fetchAllMovies().then((data) => {
      setAllMovies(data);
      setFilteredMovies(data);
    });
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

    setCurrentPage(1);
    setFilteredMovies(result);
  };

  return (
    <div className="page-wrapper bg-dark text-white">
      <div className="container py-4">
        <MovieFilterBar
          genres={Object.values(genreMap)}
          onFilterChange={handleFilterChange}
        />

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
      </div>
    </div>
  );
};

export default MoviePage;
