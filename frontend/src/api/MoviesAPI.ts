import { Movie } from '../types/Movie';

const API_URL = 'https://cinenicheback-arfmceaefxg5dqb9.westcentralus-01.azurewebsites.net//api';

export const getMovies = async (): Promise<Movie[] | null> => {
  try {
    const res = await fetch(`${API_URL}/Movies/All`);
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
    const res = await fetch(`${API_URL}/Movies/${showId}`, {
      method: 'GET',
      credentials: 'include', // ✅ THIS FIXES THE 401
    });
    if (!res.ok) throw new Error(`Movie not found: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error('getMovie error:', error);
    return null;
  }
};

export const addMovie = async (movie: Movie): Promise<boolean> => {
  try {
    const res = await fetch(`${API_URL}/Movies/Add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
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
    const res = await fetch(`${API_URL}/Movies/Update/${showId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
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
    const res = await fetch(`${API_URL}/Movies/Delete/${showId}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    

    return res.ok;
  } catch (error) {
    console.error('deleteMovie error:', error);
    return false;
  }
};

export const fetchAllMovies = async (): Promise<Movie[] | null> => {
  try {
    const res = await fetch('https://cinenicheback-arfmceaefxg5dqb9.westcentralus-01.azurewebsites.net/api/Movies/All', {
      method: 'GET',
      credentials: 'include', // ✅ must be included
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('❌ fetchAllMovies error:', error);
    return null;
  }
};

export async function fetchMoviesByGenre(genreKey: string) {
  try {
    const res = await fetch(
      `https://cinenicheback-arfmceaefxg5dqb9.westcentralus-01.azurewebsites.net/api/Movies/ByGenre/${genreKey}`,
      {
        credentials: 'include',
      }
    );
    if (!res.ok) throw new Error('Failed to fetch genre');
    return await res.json();
  } catch (err) {
    console.error(`❌ fetchMoviesByGenre (${genreKey}):`, err);
    return [];
  }
}

export const fetchSecureData = async () => {
  const res = await fetch(
    'https://cinenicheback-arfmceaefxg5dqb9.westcentralus-01.azurewebsites.net/api/YourController/SecureEndpoint',
    {
      method: 'GET',
      credentials: 'include',
    }
  );

  if (!res.ok) throw new Error('Unauthorized');
  return res.json();
};
