import { Movie } from '../types/Movie';

// Use our proxy endpoint to avoid CORS issues
const RECOMMENDATION_URL = 'https://localhost:5000/api/Proxy/recommendations';

/**
 * Fetches movie recommendations for a user
 * @param userId The ID of the user
 * @param watchedMovies Optional array of movie IDs the user has watched (defaults to sample movies)
 * @returns Array of recommended movie IDs
 */
// In src/api/RecommendationsAPI.ts

export const fetchRecommendations = async (
  userId: string,
  watchedMovies: string[] = ['s8381', 's3466', 's3181']
): Promise<string[]> => {
  try {
    // Create the input data for the recommendation endpoint
    const data = {
      Inputs: {
        web_service_input: watchedMovies.map((showId) => ({
          user_id: userId, // Make sure userId is used here
          show_id: showId,
        })),
      },
    };


    // Set up headers for the proxy - no need for Authorization as our backend handles it
    const headers = {
      'Content-Type': 'application/json',
    };

    console.log(
      'Sending recommendation request with data:',
      JSON.stringify(data)
    );

    // Make the API call through our proxy
    const response = await fetch(RECOMMENDATION_URL, {
      method: 'POST',
      headers: headers,
      credentials: 'include', // Include cookies for authentication with our backend
      body: JSON.stringify(data),
    });

    // Log response status for debugging
    

    if (!response.ok) {
      // Try to read the error response text
      const errorText = await response.text();
      console.error('Error response from recommendation API:', errorText);
      throw new Error(`Failed to fetch recommendations: ${response.status}`);
    }

    // Get the raw text first to inspect
    const responseText = await response.text();
    console.log('Raw response:', responseText.substring(0, 200) + '...');

    // Check if the response looks like HTML
    if (
      responseText.trim().toLowerCase().startsWith('<!doctype') ||
      responseText.trim().toLowerCase().startsWith('<html')
    ) {
      console.error(
        'API returned HTML instead of JSON. Possible CORS or authentication issue.'
      );
      // Return default recommendations
      return getDefaultRecommendations();
    }

    try {
      // Parse the response as JSON
      const result = JSON.parse(responseText);

      // Check if the response has the expected structure
      if (
        !result.Results ||
        !result.Results.WebServiceOutput0 ||
        !result.Results.WebServiceOutput0[0]
      ) {
        console.error('Unexpected response structure:', result);
        return getDefaultRecommendations();
      }

      // Extract the recommended movie IDs
      const recommendations = result.Results.WebServiceOutput0[0];

      // Convert the recommendation object into an array of movie IDs
      const recommendedMovies: string[] = [];
      for (let i = 1; i <= 10; i++) {
        const movieId = recommendations[`Recommended Item ${i}`];
        if (movieId) {
          recommendedMovies.push(movieId);
        }
      }

      // If we didn't get any recommendations, use defaults
      if (recommendedMovies.length === 0) {
        console.warn('API returned empty recommendations, using defaults');
        return getDefaultRecommendations();
      }

      return recommendedMovies;
    } catch (jsonError) {
      console.error('Error parsing JSON response:', jsonError);
      return getDefaultRecommendations();
    }
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return getDefaultRecommendations();
  }
};

// Function to return default recommendation data when API fails
function getDefaultRecommendations(): string[] {
  console.log('Using default recommendation data');
  return [
    's8381',
    's3466',
    's3181',
    's4760',
    's1819',
    's8807',
    's7629',
    's2768',
    's5357',
    's3011',
  ];
}

/**
 * Helper function to get full movie objects from recommendation IDs
 * @param recommendationIds Array of recommended movie IDs
 * @param allMovies Array of all available movies
 * @returns Array of Movie objects matching the recommendation IDs
 */
export const getMoviesFromRecommendations = (
  recommendationIds: string[],
  allMovies: Movie[]
): Movie[] => {
  return recommendationIds
    .map((id) => allMovies.find((movie) => movie.showId === id))
    .filter((movie): movie is Movie => !!movie);
};
