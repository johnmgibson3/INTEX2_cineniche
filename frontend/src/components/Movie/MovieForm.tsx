import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { addMovie, updateMovie } from '../../api/MoviesAPI';
import { Movie } from '../../types/Movie';
import { genreMap } from '../../constants/genreMap';

type Props = {
  movie?: Movie;
  onSave: () => void;
  onCancel: () => void;
};

const MovieForm: React.FC<Props> = ({ movie, onSave, onCancel }) => {
  const isEditMode = !!movie;

  // Default blank movie object
  const blankMovie: Movie = {
    showId: '',
    title: '',
    releaseYear: undefined,
    director: '',
    ...Object.keys(genreMap).reduce(
      (acc, key) => {
        acc[key as keyof Movie] = 0;
        return acc;
      },
      {} as Record<keyof Movie, any>
    ),
  };

  const [form, setForm] = useState<Movie>(blankMovie);

  useEffect(() => {
    if (movie) {
      setForm({ ...blankMovie, ...movie }); // Start from blankMovie, then override with movie
    }
  }, [movie]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
            ? 1
            : 0
          : name === 'releaseYear'
            ? Number(value)
            : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateMovie(form.showId!, form); // force string (we control this)
      } else {
        await addMovie(form);
      }
      onSave();
    } catch (err) {
      alert('Error saving movie. See console for details.');
      console.error(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {!isEditMode && (
        <Form.Group className="mb-3">
          <Form.Label>Show ID</Form.Label>
          <Form.Control
            name="showId"
            value={form.showId}
            onChange={handleChange}
            required
          />
        </Form.Group>
      )}

      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Release Year</Form.Label>
        <Form.Control
          name="releaseYear"
          type="number"
          value={form.releaseYear ?? ''}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Director</Form.Label>
        <Form.Control
          name="director"
          value={form.director}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Genres</Form.Label>
        <Row>
          {Object.entries(genreMap).map(([key, label]) => (
            <Col xs={6} md={4} key={key}>
              <Form.Check
                type="checkbox"
                label={label}
                name={key}
                checked={form[key as keyof Movie] === 1}
                onChange={handleChange}
              />
            </Col>
          ))}
        </Row>
      </Form.Group>

      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {isEditMode ? 'Update' : 'Add'}
        </Button>
      </div>
    </Form>
  );
};

export default MovieForm;
