import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Movie } from '../../types/Movie';

interface MovieDetailsProps {
  movie: Movie;
  onClose: () => void;
}

const genreLabels: Record<string, string> = {
  action: 'Action',
  adventure: 'Adventure',
  animeSeriesInternationalTvShows: 'Anime/Intl. TV',
  britishTvShowsDocuseriesInternationalTvShows: 'British/Intl. TV Shows',
  children: 'Children & Family',
  comedies: 'Comedies',
  comediesDramasInternationalMovies: 'Comedies/Dramas Intl.',
  comediesInternationalMovies: 'Comedies Intl.',
  comediesRomanticMovies: 'Romantic Comedies',
  crimeTvShowsDocuseries: 'Crime & Docuseries',
  documentaries: 'Documentaries',
  documentariesInternationalMovies: 'Docs Intl.',
  docuseries: 'Docuseries',
  dramas: 'Dramas',
  dramasInternationalMovies: 'Dramas Intl.',
  dramasRomanticMovies: 'Romantic Dramas',
  familyMovies: 'Family Movies',
  fantasy: 'Fantasy',
  horrorMovies: 'Horror',
  internationalMoviesThrillers: 'Intl. Thrillers',
  internationalTvShowsRomanticTvShowsTvDramas: 'Intl. Romance/Drama TV',
  kidsTv: 'Kids TV',
  languageTvShows: 'Language TV',
  musicals: 'Musicals',
  natureTv: 'Nature TV',
  realityTv: 'Reality TV',
  spirituality: 'Spirituality',
  tvAction: 'TV Action',
  tvComedies: 'TV Comedies',
  tvDramas: 'TV Dramas',
  talkShowsTvComedies: 'Talk Shows/Comedies',
  thrillers: 'Thrillers',
};

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, onClose }) => {
  const posterUrl = `https://moviepostersintex11.blob.core.windows.net/intex/Movie%20Posters/${encodeURIComponent(movie.title ?? 'default')}.jpg`;

  const genres = Object.entries(movie)
    .filter(([key, value]) => genreLabels[key] && value === 1)
    .map(([key]) => genreLabels[key]);

  return (
    <Modal show onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{movie.title ?? 'Untitled'}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex gap-4">
        <img
          src={posterUrl}
          alt={movie.title}
          style={{ height: '300px', borderRadius: '8px', objectFit: 'cover' }}
          onError={(e) => {
            e.currentTarget.src = '/img/apple-touch-icon.png';
          }}
        />
        <div>
          {movie.showId && (
            <p>
              <strong>ID:</strong> {movie.showId}
            </p>
          )}
          {movie.type && (
            <p>
              <strong>Type:</strong> {movie.type}
            </p>
          )}
          {movie.director && (
            <p>
              <strong>Director:</strong> {movie.director}
            </p>
          )}
          {movie.releaseYear && (
            <p>
              <strong>Release Year:</strong> {movie.releaseYear}
            </p>
          )}
          {movie.rating && (
            <p>
              <strong>Rating:</strong> {movie.rating}
            </p>
          )}
          {movie.duration && (
            <p>
              <strong>Duration:</strong> {movie.duration}
            </p>
          )}
          {movie.cast && (
            <p>
              <strong>Cast:</strong> {movie.cast}
            </p>
          )}
          {movie.country && (
            <p>
              <strong>Country:</strong> {movie.country}
            </p>
          )}
          {genres.length > 0 && (
            <p>
              <strong>Genres:</strong> {genres.join(', ')}
            </p>
          )}
          {movie.description && (
            <p className="mt-3" style={{ whiteSpace: 'pre-line' }}>
              {movie.description}
            </p>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MovieDetails;
