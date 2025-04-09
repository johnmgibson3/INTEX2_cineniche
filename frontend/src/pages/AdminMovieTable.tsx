import React, { useEffect, useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { fetchAllMovies, deleteMovie } from '../api/MoviesAPI';
import MovieForm from '../components/Movie/MovieForm';
import MovieFilterBar from '../components/Movie/MovieFilterBar';
import MovieDetails from '../components/Movie/MovieDetails';
import { Movie } from '../types/Movie';
import { genreMap } from '../constants/genreMap';
import Paginator from '../components/Movie/Paginator';
import '../css/AdminMovieTable.css';

const AdminMovieTable: React.FC = () => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMovies.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);

  const loadMovies = async () => {
    try {
      const response = await fetchAllMovies();
      setAllMovies(response ?? []);
      setFilteredMovies(response ?? []);
    } catch (error) {
      console.error('Error loading movies:', error);
    }
  };

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

  const openEditModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setShowFormModal(true);
  };

  const openAddModal = () => {
    setSelectedMovie(null);
    setShowFormModal(true);
  };

  const openDeleteModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setShowDeleteModal(true);
  };

  const openDetailsModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setShowDetailsModal(true);
  };

  const handleDelete = async () => {
    if (!selectedMovie) return;
    try {
      await deleteMovie(selectedMovie.showId!);
      setShowDeleteModal(false);
      setSelectedMovie(null);
      loadMovies();
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Manage Movies</h3>
        <Button variant="success" onClick={openAddModal}>
          ➕ Add Movie
        </Button>
      </div>

      <MovieFilterBar
        genres={Object.values(genreMap)}
        onFilterChange={handleFilterChange}
      />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Movie</th>
            <th>Genres</th>
            <th>Year</th>
            <th>Director</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((movie) => {
            const genres = Object.entries(genreMap)
              .filter(([key]) => movie[key as keyof Movie] === 1)
              .map(([, label]) => label)
              .join(', ');

            return (
              <tr key={movie.showId}>
                <td>{movie.showId}</td>
                <td>{movie.title}</td>
                <td>{genres}</td>
                <td>{movie.releaseYear}</td>
                <td>{movie.director}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => openEditModal(movie)}
                  >
                    ✏️
                  </Button>{' '}
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => openDeleteModal(movie)}
                  >
                    🗑️
                  </Button>{' '}
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => openDetailsModal(movie)}
                  >
                    ⋮
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <div className="d-flex justify-content-center">
        <Paginator
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <Modal show={showFormModal} onHide={() => setShowFormModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedMovie ? 'Edit Movie' : 'Add Movie'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MovieForm
            movie={selectedMovie ?? undefined}
            onCancel={() => {
              setShowFormModal(false);
              setSelectedMovie(null);
            }}
            onSave={() => {
              setShowFormModal(false);
              setSelectedMovie(null);
              loadMovies();
            }}
          />
        </Modal.Body>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete{' '}
          <strong>{selectedMovie?.title}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
        {selectedMovie && (
          <MovieDetails
            movie={selectedMovie}
            onClose={() => setShowDetailsModal(false)}
          />
        )}
      </Modal>
    </div>
  );
};

export default AdminMovieTable;
