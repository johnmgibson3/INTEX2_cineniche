import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Movie } from '../../types/Movie';
import { Recommend } from '../../types/HybridRecommender.ts'
import axios from 'axios';
import MoviePoster from './MoviePoster';

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
  const [recommendations, setRecommendations] = useState<Recommend | null>(null);
  const [recommendationMovies, setRecommendationMovies] = useState<Movie[]>([]);

  // Fetch recommendations when the component mounts
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(`/api/Hybrid/${movie.showId}`);
        setRecommendations(response.data);
        
        // Convert recommendation titles to Movie objects for the MoviePoster component
        if (response.data) {
          const recMovies: Movie[] = [];
          
          for (let i = 1; i <= 5; i++) {
            const titleKey = `rec${i}Title` as keyof Recommend;
            const title = response.data[titleKey] as string;
            
            if (title) {
              recMovies.push({
                title: title,
                showId: `rec-${i}`, // We don't have the actual showId, using placeholder
                // Other fields can be left undefined
              });
            }
          }
          
          setRecommendationMovies(recMovies);
        }
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    if (movie.showId) {
      fetchRecommendations();
    }
  }, [movie.showId]);

  const posterUrl = `https://moviepostersintex11.blob.core.windows.net/intex/Movie%20Posters/${encodeURIComponent(movie.title ?? 'default')}.jpg`;

  const genres = Object.entries(movie)
    .filter(([key, value]) => genreLabels[key] && value === 1)
    .map(([key]) => genreLabels[key]);

  // Prepare recommendation titles
  const recommendationTitles = recommendations 
  ? [
      recommendations.rec1Title, 
      recommendations.rec2Title, 
      recommendations.rec3Title, 
      recommendations.rec4Title, 
      recommendations.rec5Title
    ].filter(title => title) // Remove any undefined titles
  : [];

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
        <div className="d-flex flex-column justify-content-center w-100">
          <h6 className="text-center mb-3 text-black">If you enjoy this movie, you may enjoy:</h6>
          <div className="d-flex justify-content-center gap-3">
            {recommendationMovies.length > 0 ? (
              recommendationMovies.map((recMovie, index) => (
                <div key={index} style={{ marginLeft: '8px', marginRight: '8px' }}>
                  <MoviePoster
                    movie={recMovie}
                    onClick={() => {
                      // Could navigate to the recommended movie detail in the future
                      console.log(`Clicked recommendation: ${recMovie.title}`);
                    }}
                  />
                </div>
              ))
            ) : (
              <div className="text-center text-muted">
                Loading recommendations...
              </div>
            )}
          </div>
        </div>
      </Modal.Footer>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MovieDetails;