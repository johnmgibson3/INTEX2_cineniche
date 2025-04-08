import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../css/MoviePage.css';
import { Container } from 'react-bootstrap';
import MovieCarousel from '../components/Movie/MovieCarousel';

const movieCategories = [
  { title: 'Your Library', key: 'library' },
  { title: 'Recommended for you', key: 'recommended' },
  { title: 'Comedies', key: 'comedies' },
  { title: 'Horror', key: 'horror' },
];

// Mock example movie data
const mockMovies = [
  {
    id: 1,
    title: 'Example Movie',
    imageUrl: '/img/poster1.jpg',
    genre: 'Comedy',
  },
  {
    id: 2,
    title: 'Another One',
    imageUrl: '/img/poster2.jpg',
    genre: 'Horror',
  },
  { id: 3, title: 'Sample Film', imageUrl: '/img/poster3.jpg', genre: 'Drama' },
];

const MoviePage: React.FC = () => {
  return (
    <main className="movie-page">
      <Container>
        {/* Search & Filters */}
        <div className="search-filter">
          <div className="dropdown">
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
            >
              All
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Genre
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Director
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Year
                </a>
              </li>
            </ul>
          </div>
          <input
            className="form-control"
            type="text"
            placeholder="Search Movies..."
          />
        </div>

        {/* Movie Carousels */}
        {movieCategories.map((category) => (
          <MovieCarousel
            key={category.key}
            title={category.title}
            movies={mockMovies}
          />
        ))}
      </Container>
    </main>
  );
};

export default MoviePage;
