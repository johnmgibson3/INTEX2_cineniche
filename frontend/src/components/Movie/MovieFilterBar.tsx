import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

type FilterOptions = {
  searchText: string;
  genre: string;
  sortBy: 'directorAZ' | 'directorZA' | 'yearAsc' | 'yearDesc' | '';
};

type Props = {
  genres: string[]; // all unique genres from dataset
  onFilterChange: (options: FilterOptions) => void;
};

const MovieFilterBar: React.FC<Props> = ({ genres, onFilterChange }) => {
  const [searchText, setSearchText] = useState('');
  const [genre, setGenre] = useState('');
  const [sortBy, setSortBy] = useState<FilterOptions['sortBy']>('');

  const handleApply = () => {
    onFilterChange({ searchText, genre, sortBy });
  };

  const handleClear = () => {
    setSearchText('');
    setGenre('');
    setSortBy('');
    onFilterChange({ searchText: '', genre: '', sortBy: '' });
  };

  return (
    <Form className="mb-4">
      <Row className="align-items-end g-2">
        <Col md={4}>
          <Form.Label>Search by Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Col>

        <Col md={3}>
          <Form.Label>Filter by Genre</Form.Label>
          <Form.Select value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option value="">All</option>
            {genres.map((g, idx) => (
              <option key={idx} value={g}>
                {g}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col md={3}>
          <Form.Label>Sort</Form.Label>
          <Form.Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
          >
            <option value="">None</option>
            <option value="directorAZ">Director A-Z</option>
            <option value="directorZA">Director Z-A</option>
            <option value="yearAsc">Year Oldest-Newest</option>
            <option value="yearDesc">Year Newest-Oldest</option>
          </Form.Select>
        </Col>

        <Col md={2} className="d-flex gap-2">
          <Button variant="primary" onClick={handleApply}>
            Apply
          </Button>
          <Button variant="outline-secondary" onClick={handleClear}>
            Clear
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default MovieFilterBar;
