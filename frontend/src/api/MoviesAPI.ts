import { Movie } from '../types/Movie';

const API_URL = 'https://localhost:5000/api/Movies';

export const getMovies = async (): Promise<Movie[] | null> => {
  try {
    const res = await fetch(`${API_URL}/all`);
    if (!res.ok)
      throw new Error(`Failed to fetch movies. Status: ${res.status}`);
    const data = await res.json();
    return data.movies ?? [];
  } catch (error) {
    console.error('getMovies error:', error);
    return null;
  }
};

export const getMovie = async (showId: string): Promise<Movie | null> => {
  try {
    const res = await fetch(`${API_URL}/${showId}`);
    if (!res.ok) throw new Error(`Movie not found: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error('getMovie error:', error);
    return null;
  }
};

export const addMovie = async (movie: Movie): Promise<boolean> => {
  try {
    const res = await fetch(`${API_URL}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie),
    });

    return res.ok;
  } catch (error) {
    console.error('addMovie error:', error);
    return false;
  }
};

export const updateMovie = async (
  showId: string,
  movie: Movie
): Promise<boolean> => {
  try {
    const res = await fetch(`${API_URL}/update/${showId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie),
    });

    return res.ok;
  } catch (error) {
    console.error('updateMovie error:', error);
    return false;
  }
};

export const deleteMovie = async (showId: string): Promise<boolean> => {
  try {
    const res = await fetch(`${API_URL}/delete/${showId}`, {
      method: 'DELETE',
    });

    return res.ok;
  } catch (error) {
    console.error('deleteMovie error:', error);
    return false;
  }
};

export async function fetchAllMovies(): Promise<Movie[]> {
  const response = await fetch('/api/Movies/All');
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch movies: ${errorText}`);
  }
  return await response.json();
}
