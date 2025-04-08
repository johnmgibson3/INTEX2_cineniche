import React, { useEffect, useState } from 'react';
import MovieCarousel from '../components/Movie/MovieCarousel';
import { fetchAllMovies } from '../api/MoviesAPI';
import { Movie } from '../types/Movie';

const genreKeys: { key: keyof Movie; label: string }[] = [
  { key: 'action', label: 'Action & Adventure' },
  { key: 'animeSeriesInternationalTvShows', label: 'Anime & Intl. TV Shows' },
  {
    key: 'britishTvShowsDocuseriesInternationalTvShows',
    label: 'British/Intl. TV',
  },
  { key: 'children', label: 'Children & Family' },
  { key: 'comedies', label: 'Comedies' },
  { key: 'comediesDramasInternationalMovies', label: 'Comedies/Dramas Intl.' },
  { key: 'comediesInternationalMovies', label: 'Comedies Intl.' },
  { key: 'comediesRomanticMovies', label: 'Romantic Comedies' },
  { key: 'crimeTvShowsDocuseries', label: 'Crime & Docuseries' },
  { key: 'documentaries', label: 'Documentaries' },
  { key: 'documentariesInternationalMovies', label: 'Docs Intl.' },
  { key: 'docuseries', label: 'Docuseries' },
  { key: 'dramas', label: 'Dramas' },
  { key: 'dramasInternationalMovies', label: 'Dramas Intl.' },
  { key: 'dramasRomanticMovies', label: 'Romantic Dramas' },
  { key: 'familyMovies', label: 'Family Movies' },
  { key: 'fantasy', label: 'Fantasy' },
  { key: 'horrorMovies', label: 'Horror' },
  { key: 'internationalMoviesThrillers', label: 'Intl. Thrillers' },
  {
    key: 'internationalTvShowsRomanticTvShowsTvDramas',
    label: 'Intl. Romance/Drama TV',
  },
  { key: 'kidsTv', label: 'Kids TV' },
  { key: 'languageTvShows', label: 'Language TV Shows' },
  { key: 'musicals', label: 'Musicals' },
  { key: 'natureTv', label: 'Nature TV' },
  { key: 'realityTv', label: 'Reality TV' },
  { key: 'spirituality', label: 'Spirituality' },
  { key: 'tvAction', label: 'TV Action' },
  { key: 'tvComedies', label: 'TV Comedies' },
  { key: 'tvDramas', label: 'TV Dramas' },
  { key: 'talkShowsTvComedies', label: 'Talk Shows / Comedies' },
  { key: 'thrillers', label: 'Thrillers' },
];

const MoviePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetchAllMovies().then(setMovies);
  }, []);

  return (
    <div className="page-wrapper bg-dark text-white">
      <div className="container py-4">
        {genreKeys.map(({ key, label }) => (
          <MovieCarousel
            key={key}
            title={label}
            filter={(movie) => movie[key] === 1}
          />
        ))}
      </div>
    </div>
  );
};

export default MoviePage;
