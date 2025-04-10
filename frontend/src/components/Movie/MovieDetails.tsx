import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Movie } from '../../types/Movie';
import { getAverageRating } from '../../api/RatingsAPI';
import { getMovie } from '../../api/MoviesAPI';
import '../../css/MoviePage.css';
import { getMoviePosterUrl } from '../../constants/movieImage';
import { Recommend } from '../../types/HybridRecommender.ts'
import MoviePoster from './MoviePoster';
import MovieRating from './MovieRating';


interface MovieDetailsProps {
  movie: Movie;
  onClose: () => void;
  onSelectMovie: (movie: Movie) => void; // <-- NEW PROP. This makes it so if you click on another movie, it'll close the popup and open a new one. 
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

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, onClose, onSelectMovie }) => {

  const [averageRating, setAverageRating] = useState<number | null>(null);

  const [srcAttempted] = useState(0);
  //const [srcAttempted, setSrcAttempted] = useState(0);

  const posterUrls = getMoviePosterUrl(movie.title ?? '');
  //Benji Code
  const [recommendations, setRecommendations] = useState<Recommend | null>(null);
  const [recommendationMovies, setRecommendationMovies] = useState<Movie[]>([]);
  const [selectedRecMovie, setSelectedRecMovie] = useState<Movie | null>(null);


  // Fetch recommendations when the component mounts
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await fetch(`https://localhost:5000/api/Hybrid/${movie.showId}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
  
        const data = await res.json();
        setRecommendations(data);
  
        // Convert recommendation titles to Movie objects for the MoviePoster component
        if (data) {
          const recMovies: Movie[] = [];
  
          for (let i = 1; i <= 5; i++) {
            const titleKey = `rec${i}Title` as keyof Recommend;
            const idKey = `rec${i}Id` as keyof Recommend;
          
            const title = data[titleKey] as string;
            const showId = data[idKey] as string;
          
            if (title && showId) {
              recMovies.push({
                title,
                showId,
              });
            }
          }
  
          setRecommendationMovies(recMovies);
        }
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };
  
    fetchRecommendations();
  }, [movie.showId]);
  

  const posterUrl = `https://moviepostersintex11.blob.core.windows.net/intex/Movie%20Posters/${encodeURIComponent(movie.title ?? 'default')}.jpg`;


  const genres = Object.entries(movie)
    .filter(([key, value]) => genreLabels[key] && value === 1)
    .map(([key]) => genreLabels[key]);

   //Regular code
  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        if (movie.showId) {
          const avg = await getAverageRating(movie.showId);
          setAverageRating(avg);
        }
      } catch (error) {
        console.error('Error fetching average rating:', error);
      }
    };

    fetchAverageRating();
  }, [movie.showId]);

  return (
    <Modal show onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{movie.title ?? 'Untitled'}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex gap-4">
        <img
          src={posterUrls[srcAttempted] || posterUrls[posterUrls.length - 1]}
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
          {averageRating === null ? (
            <p className="mt-2" style={{ color: '#b8860b' }}>
              Be the first to rate this movie!
            </p>
          ) : (
            <div
              className="mt-2 d-flex align-items-center"
              style={{ fontSize: '0.95rem' }}
            >
              <strong style={{ marginRight: '0.5rem' }}>
                Average User Rating:
              </strong>
              {Array.from({ length: 5 }, (_, i) => {
                const diff = averageRating - i;
                if (diff >= 1) {
                  return (
                    <span key={i} style={{ color: '#ffc107' }}>
                      ★
                    </span>
                  );
                } else if (diff >= 0.25 && diff < 0.75) {
                  return (
                    <span key={i} style={{ color: '#ffc107' }}>
                      ⭐
                    </span>
                  );
                } else {
                  return (
                    <span key={i} style={{ color: '#ccc' }}>
                      ★
                    </span>
                  );
                }
              })}
              <span
                style={{
                  marginLeft: '0.5rem',
                  color: '#aaa',
                  fontSize: '0.85rem',
                }}
              >
                ({averageRating.toFixed(1)} / 5)
              </span>
            </div>
          )}

          {/* Inject MovieRating component here */}
          <div className="mt-3">
            {movie.showId && <MovieRating showId={movie.showId} />}
          </div>
        </div>
        
      </Modal.Body>
      <Modal.Footer
        style={{
          backgroundColor: '#fff', // White background for the footer
          paddingBottom: '0px', // Add more space at the bottom
        }}
      >
        <div className="d-flex flex-column justify-content-center w-100">
          <h6 className="text-center mb-3" style={{ color: '#000' }}> {/* Text color set to black */}
            If you enjoy this movie, you may enjoy:
          </h6>
          <div className="d-flex justify-content-center gap-3">
            {recommendationMovies.length > 0 ? (
              recommendationMovies.map((recMovie, index) => (
                <div key={index} style={{ marginLeft: '8px', marginRight: '8px', marginBottom: '20px'}}>
                  <MoviePoster
                    movie={recMovie}
                    onClick={async () => {
                      try {
                        const fullMovie = await getMovie(recMovie.showId!);
                        if (fullMovie) {
                          onClose(); // Close current modal
                          setTimeout(() => {
                            onSelectMovie(fullMovie); // Open new one with full info
                          }, 100);
                        } else {
                          console.warn("Could not load full movie data");
                        }
                      } catch (err) {
                        console.error("Error loading movie from recommendation:", err);
                      }
                    }}
                    style={{ height: '260px', width: '130px' }}
                    titleSize="1.0rem"
                    titleColor="black"
                    hoverTitleSize="20px"
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