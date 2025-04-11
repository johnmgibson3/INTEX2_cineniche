import React, { useEffect, useState } from 'react';
import { getTopGenreMovies } from '../../api/GenreRecommendationAPI';
import { Movie } from '../../types/Movie';
import MoviePoster from './MoviePoster';
import MovieDetails from './MovieDetails';
import '../../css/TopGenresSection.css';

interface GenreMoviePair {
  genre: string;
  movie: Movie | null;
}

const TopGenresSection: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [topGenres, setTopGenres] = useState<{
    topGenre: GenreMoviePair;
    secondGenre: GenreMoviePair;
    thirdGenre: GenreMoviePair;
  } | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchTopGenres = async () => {
      try {
        setLoading(true);
        const genreData = await getTopGenreMovies();
        setTopGenres(genreData);
      } catch (err) {
        console.error('Failed to load top genres:', err);
        setError('Could not load your top genres. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTopGenres();
  }, []);

  if (loading) {
    return (
      <div className="top-genres-section my-4 text-center">
        <h2 className="mb-3">Loading your top genres...</h2>
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !topGenres) {
    return (
      <div className="top-genres-section my-4 text-center">
        <h2 className="mb-2">Your Top Genres</h2>
        <p className="text-muted">
          {error || 'No top genres found for your profile.'}
        </p>
      </div>
    );
  }

  return (
    <div className="top-genres-section my-4">
      <div className="container">
        <div className="section-header text-center mb-4">
          <h2 className="fw-bold">Your Top Genres</h2>
          <p className="text-muted">
            Based on your viewing history and preferences
          </p>
        </div>

        <div className="d-flex justify-content-center align-items-center gap-3">
          {/* Second Genre (Left) */}
          <div
            className="genre-column text-center"
            style={{ transform: 'scale(0.75)' }}
          >
            <div className="genre-rank">2</div>
            <h4 className="genre-title mb-2">{topGenres.secondGenre.genre}</h4>
            {topGenres.secondGenre.movie ? (
              <div className="poster-wrapper">
                <MoviePoster
                  movie={topGenres.secondGenre.movie}
                  onClick={() => setSelectedMovie(topGenres.secondGenre.movie)}
                  style={{ height: '320px', width: '200px' }}
                />
                <div className="view-details">
                  <button
                    className="btn btn-sm btn-outline-light mt-2"
                    onClick={() =>
                      setSelectedMovie(topGenres.secondGenre.movie)
                    }
                  >
                    View Details
                  </button>
                </div>
              </div>
            ) : (
              <div className="no-movie-placeholder">
                <p>No movie available</p>
              </div>
            )}
          </div>

          {/* Top Genre (Center) */}
          <div
            className="genre-column text-center primary-genre"
            style={{ transform: 'scale(0.9)', zIndex: 2 }}
          >
            <div className="genre-rank">1</div>
            <h4 className="genre-title mb-2 fw-bold">
              {topGenres.topGenre.genre}
            </h4>
            {topGenres.topGenre.movie ? (
              <div className="poster-wrapper">
                <div className="spotlight-effect"></div>
                <MoviePoster
                  movie={topGenres.topGenre.movie}
                  onClick={() => setSelectedMovie(topGenres.topGenre.movie)}
                  style={{ height: '350px', width: '220px' }}
                />
                <div className="view-details">
                  <button
                    className="btn btn-sm btn-warning mt-2"
                    onClick={() => setSelectedMovie(topGenres.topGenre.movie)}
                  >
                    View Details
                  </button>
                </div>
                <div className="top-badge">
                  <span className="badge bg-warning text-dark mt-2">
                    Top Pick
                  </span>
                </div>
              </div>
            ) : (
              <div className="no-movie-placeholder">
                <p>No movie available</p>
              </div>
            )}
          </div>

          {/* Third Genre (Right) */}
          <div
            className="genre-column text-center"
            style={{ transform: 'scale(0.75)' }}
          >
            <div className="genre-rank">3</div>
            <h4 className="genre-title mb-2">{topGenres.thirdGenre.genre}</h4>
            {topGenres.thirdGenre.movie ? (
              <div className="poster-wrapper">
                <MoviePoster
                  movie={topGenres.thirdGenre.movie}
                  onClick={() => setSelectedMovie(topGenres.thirdGenre.movie)}
                  style={{ height: '320px', width: '200px' }}
                />
                <div className="view-details">
                  <button
                    className="btn btn-sm btn-outline-light mt-2"
                    onClick={() => setSelectedMovie(topGenres.thirdGenre.movie)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ) : (
              <div className="no-movie-placeholder">
                <p>No movie available</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Movie Details Modal */}
      {selectedMovie && (
        <MovieDetails
          key={`top-genre-${selectedMovie.showId}`}
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onSelectMovie={(movie) => {
            setSelectedMovie(null);
            // Add a small delay to ensure smooth transition between modals
            setTimeout(() => {
              setSelectedMovie(movie);
            }, 100);
          }}
        />
      )}
    </div>
  );
};

export default TopGenresSection;
