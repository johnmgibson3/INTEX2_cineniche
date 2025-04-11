import React, { useEffect, useState } from 'react';
import MovieCarousel from '../../components/Movie/MovieCarousel';
import { Movie } from '../../types/Movie';
import { getMovie } from '../../api/MoviesAPI';

interface LibraryRowProps {
  onPosterClick: (movie: Movie) => void;
}

const LibraryRow: React.FC<LibraryRowProps> = ({ onPosterClick }) => {
  const [libraryMovies, setLibraryMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const loadLibraryMovies = async () => {
      const ids = ['s1', 's2', 's3', 's4'];
      const fetchedMovies = await Promise.all(ids.map((id) => getMovie(id)));
      const validMovies = fetchedMovies.filter(
        (movie): movie is Movie => movie !== null
      );
      setLibraryMovies(validMovies);
    };

    loadLibraryMovies();
  }, []);

  return (
    <MovieCarousel
      title="My Library"
      movies={libraryMovies}
      placeholderMessage="Click the plus to add movies to your Library"
      showEmptyPoster={true}
      showLibraryControls={true}
      onPosterClick={onPosterClick}
    />
  );
};

export default LibraryRow;
