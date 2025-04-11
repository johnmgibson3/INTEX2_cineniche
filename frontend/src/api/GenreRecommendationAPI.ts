import { GenreRecommendation } from '../types/GenreRecommendation';
import { getUserIdFromHeader } from './AuthApi';
import { Movie } from '../types/Movie';
import { getMovie } from './MoviesAPI';
import * as XLSX from 'xlsx';

// This function loads recommendations from the Excel file
export const loadGenreRecommendations = async (): Promise<
  GenreRecommendation[]
> => {
  try {
    // Load Excel file from assets directory
    // If your file is in public folder:
    const response = await fetch('GenreRecommender.xlsx');
    // Or if in assets:
    // import genreRecommenderPath from '../assets/GenreRecommender.xlsx';
    // const response = await fetch(genreRecommenderPath);

    const fileData = await response.arrayBuffer();

    // Parse with SheetJS
    const workbook = XLSX.read(fileData, { type: 'array' });

    // Get the first sheet
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];

    // Convert to JSON with headers
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    // Transform data to match our interface
    const recommendations: GenreRecommendation[] = jsonData.map((row: any) => ({
      userId: row['\\\\'] ? row['\\\\'].toString() : '',
      topGenre1: row['top_genre_1'] || '',
      showId1: row['show_id_1'] || '',
      topGenre2: row['top_genre_2'] || '',
      showId2: row['show_id_2'] || '',
      topGenre3: row['top_genre_3'] || '',
      showId3: row['show_id_3'] || '',
    }));

    console.log(`Loaded ${recommendations.length} genre recommendations`);
    return recommendations;
  } catch (error) {
    console.error('Error loading genre recommendations:', error);

    // Fallback to hardcoded data for development
    return [
      {
        userId: '1',
        topGenre1: 'Comedies',
        showId1: 's10',
        topGenre2: 'Adventure',
        showId2: 's144',
        topGenre3: 'Horror Movies',
        showId3: 's8623',
      },
      {
        userId: '10',
        topGenre1: 'Comedies',
        showId1: 's10',
        topGenre2: 'Fantasy',
        showId2: 's8623',
        topGenre3: 'Horror Movies',
        showId3: 's8623',
      },
      {
        userId: '100',
        topGenre1: 'Dramas',
        showId1: 's1690',
        topGenre2: 'Dramas Romantic Movies',
        showId2: 's1690',
        topGenre3: 'Comedies',
        showId3: 's10',
      },
      {
        userId: '101',
        topGenre1: 'Reality TV',
        showId1: 's1597',
        topGenre2: 'Comedies',
        showId2: 's10',
        topGenre3: 'Adventure',
        showId3: 's144',
      },
      {
        userId: '102',
        topGenre1: 'Comedies',
        showId1: 's10',
        topGenre2: 'Adventure',
        showId2: 's144',
        topGenre3: 'TV Comedies',
        showId3: 's1717',
      },
      {
        userId: '103',
        topGenre1: 'Horror Movies',
        showId1: 's8623',
        topGenre2: 'Adventure',
        showId2: 's144',
        topGenre3: 'Fantasy',
        showId3: 's8623',
      },
      {
        userId: '104',
        topGenre1: 'Dramas',
        showId1: 's1690',
        topGenre2: 'TV Dramas',
        showId2: 's426',
        topGenre3: 'Comedies',
        showId3: 's10',
      },
      {
        userId: '105',
        topGenre1: 'Documentaries',
        showId1: 's231',
        topGenre2: 'Musicals',
        showId2: 's173',
        topGenre3: 'Adventure',
        showId3: 's144',
      },
      {
        userId: '106',
        topGenre1: 'Dramas',
        showId1: 's1690',
        topGenre2: 'TV Dramas',
        showId2: 's426',
        topGenre3: 'Comedies',
        showId3: 's10',
      },
      {
        userId: '107',
        topGenre1: 'Comedies',
        showId1: 's10',
        topGenre2: 'Family Movies',
        showId2: 's1454',
        topGenre3: 'Reality TV',
        showId3: 's1597',
      },
      {
        userId: '108',
        topGenre1: 'Adventure',
        showId1: 's144',
        topGenre2: 'Dramas',
        showId2: 's1690',
        topGenre3: 'TV Dramas',
        showId3: 's426',
      },
      {
        userId: '109',
        topGenre1: 'Comedies',
        showId1: 's10',
        topGenre2: 'Family Movies',
        showId2: 's1454',
        topGenre3: 'Horror Movies',
        showId3: 's8623',
      },
      {
        userId: '11',
        topGenre1: 'Thrillers',
        showId1: 's1087',
        topGenre2: 'Family Movies',
        showId2: 's1454',
        topGenre3: 'Dramas',
        showId3: 's1690',
      },
      {
        userId: '110',
        topGenre1: 'Thrillers',
        showId1: 's1087',
        topGenre2: 'Dramas',
        showId2: 's1690',
        topGenre3: 'Musicals',
        showId3: 's173',
      },
      {
        userId: '111',
        topGenre1: 'Dramas',
        showId1: 's1690',
        topGenre2: 'Adventure',
        showId2: 's144',
        topGenre3: 'TV Action',
        showId3: 's7647',
      },
      {
        userId: '112',
        topGenre1: 'Dramas',
        showId1: 's1690',
        topGenre2: 'TV Dramas',
        showId2: 's426',
        topGenre3: 'Reality TV',
        showId3: 's1597',
      },
      {
        userId: '113',
        topGenre1: 'Comedies',
        showId1: 's10',
        topGenre2: 'TV Comedies',
        showId2: 's1717',
        topGenre3: '',
        showId3: 's8623',
      },
      {
        userId: '114',
        topGenre1: 'Reality TV',
        showId1: 's1597',
        topGenre2: 'Comedies',
        showId2: 's10',
        topGenre3: 'TV Comedies',
        showId3: 's1717',
      },
      {
        userId: '115',
        topGenre1: 'Documentaries',
        showId1: 's231',
        topGenre2: 'Adventure',
        showId2: 's144',
        topGenre3: 'Family Movies',
        showId3: 's1454',
      },
      {
        userId: '116',
        topGenre1: 'Horror Movies',
        showId1: 's8623',
        topGenre2: 'Thrillers',
        showId2: 's1087',
        topGenre3: 'Comedies',
        showId3: 's10',
      },
      {
        userId: '117',
        topGenre1: 'Adventure',
        showId1: 's144',
        topGenre2: 'Comedies',
        showId2: 's10',
        topGenre3: 'TV Comedies',
        showId3: 's1717',
      },
      {
        userId: '118',
        topGenre1: 'Documentaries',
        showId1: 's231',
        topGenre2: 'Comedies',
        showId2: 's10',
        topGenre3: 'Dramas',
        showId3: 's1690',
      },
      {
        userId: '119',
        topGenre1: 'Dramas',
        showId1: 's1690',
        topGenre2: 'TV Dramas',
        showId2: 's426',
        topGenre3: 'Adventure',
        showId3: 's144',
      },
      {
        userId: '12',
        topGenre1: 'Dramas',
        showId1: 's1690',
        topGenre2: 'Adventure',
        showId2: 's144',
        topGenre3: 'TV Action',
        showId3: 's7647',
      },
      {
        userId: '120',
        topGenre1: 'Family Movies',
        showId1: 's1454',
        topGenre2: 'Fantasy',
        showId2: 's8623',
        topGenre3: 'Adventure',
        showId3: 's144',
      },
      {
        userId: '121',
        topGenre1: 'Adventure',
        showId1: 's144',
        topGenre2: 'Fantasy',
        showId2: 's8623',
        topGenre3: 'Comedies',
        showId3: 's10',
      },
      {
        userId: '122',
        topGenre1: 'Adventure',
        showId1: 's144',
        topGenre2: 'Dramas',
        showId2: 's1690',
        topGenre3: 'TV Action',
        showId3: 's7647',
      },
      {
        userId: '123',
        topGenre1: 'Adventure',
        showId1: 's144',
        topGenre2: 'Dramas',
        showId2: 's1690',
        topGenre3: 'TV Action',
        showId3: 's7647',
      },
      {
        userId: '124',
        topGenre1: 'Comedies',
        showId1: 's10',
        topGenre2: 'Horror Movies',
        showId2: 's8623',
        topGenre3: 'Dramas',
        showId3: 's1690',
      },
      {
        userId: '125',
        topGenre1: 'Dramas',
        showId1: 's1690',
        topGenre2: 'TV Dramas',
        showId2: 's426',
        topGenre3: 'Family Movies',
        showId3: 's1454',
      },
      {
        userId: '126',
        topGenre1: 'Comedies',
        showId1: 's10',
        topGenre2: 'Fantasy',
        showId2: 's8623',
        topGenre3: 'Horror Movies',
        showId3: 's8623',
      },
      {
        userId: '127',
        topGenre1: 'Comedies',
        showId1: 's10',
        topGenre2: 'Dramas',
        showId2: 's1690',
        topGenre3: 'TV Dramas',
        showId3: 's426',
      },
      {
        userId: '128',
        topGenre1: 'Dramas',
        showId1: 's1690',
        topGenre2: 'TV Dramas',
        showId2: 's426',
        topGenre3: 'Adventure',
        showId3: 's144',
      },
      {
        userId: '129',
        topGenre1: 'Documentaries',
        showId1: 's231',
        topGenre2: 'Horror Movies',
        showId2: 's8623',
        topGenre3: 'Dramas',
        showId3: 's1690',
      },
      {
        userId: '13',
        topGenre1: 'Adventure',
        showId1: 's144',
        topGenre2: 'Dramas',
        showId2: 's1690',
        topGenre3: 'TV Action',
        showId3: 's7647',
      },
      {
        userId: '130',
        topGenre1: 'Dramas',
        showId1: 's1690',
        topGenre2: 'TV Dramas',
        showId2: 's426',
        topGenre3: 'Comedies',
        showId3: 's10',
      },
      {
        userId: '131',
        topGenre1: 'Adventure',
        showId1: 's144',
        topGenre2: 'Comedies',
        showId2: 's10',
        topGenre3: 'Dramas',
        showId3: 's1690',
      },
      {
        userId: '132',
        topGenre1: 'Comedies',
        showId1: 's10',
        topGenre2: 'Dramas',
        showId2: 's1690',
        topGenre3: 'Thrillers',
        showId3: 's1087',
      },
    ];
  }
};

// This function gets recommendations for the current user
export const getUserGenreRecommendations =
  async (): Promise<GenreRecommendation | null> => {
    try {
      // Get the current user ID
      const userId = await getUserIdFromHeader();

      console.log('Current user ID from auth:', userId);

      // Load all recommendations
      const allRecommendations = await loadGenreRecommendations();

      // DEBUG: Log all user IDs from recommendations to verify matches
      console.log(
        'Available user IDs in recommendations:',
        allRecommendations.map((rec) => rec.userId)
      );

      if (!userId) {
        console.warn('No user ID found, using default user ID');
        // If no user ID is found, use a default from the available data
        return allRecommendations[0] || null;
      }

      // Convert both to string for comparison and log the search
      const userIdStr = userId.toString();
      console.log(`Looking for user ID ${userIdStr} in recommendations`);

      // Find recommendations for this user - ensure both are strings for comparison
      const userRecommendations = allRecommendations.find(
        (rec) => rec.userId.toString() === userIdStr
      );

      if (!userRecommendations) {
        console.warn(
          `No recommendations found for user ${userId}, using default`
        );
        // If no recommendations for this user, return the first one available
        return allRecommendations[0] || null;
      }

      console.log(
        `Found recommendations for user ${userId}:`,
        userRecommendations
      );
      return userRecommendations;
    } catch (error) {
      console.error('Error getting user genre recommendations:', error);
      return null;
    }
  };

// This function fetches the movies for the user's top genres
export const getTopGenreMovies = async (): Promise<{
  topGenre: { genre: string; movie: Movie | null };
  secondGenre: { genre: string; movie: Movie | null };
  thirdGenre: { genre: string; movie: Movie | null };
} | null> => {
  try {
    const recommendations = await getUserGenreRecommendations();
    if (!recommendations) return null;

    // Fetch the movies for each genre (handle promise rejections)
    const fetchMovie = async (showId: string): Promise<Movie | null> => {
      try {
        return await getMovie(showId);
      } catch (err) {
        console.warn(`Could not fetch movie with ID ${showId}:`, err);
        return null;
      }
    };

    // Fetch all movies in parallel for better performance
    const [topGenreMovie, secondGenreMovie, thirdGenreMovie] =
      await Promise.all([
        fetchMovie(recommendations.showId1),
        fetchMovie(recommendations.showId2),
        fetchMovie(recommendations.showId3),
      ]);

    console.log('Movies fetched:', {
      top: topGenreMovie?.title || 'Not found',
      second: secondGenreMovie?.title || 'Not found',
      third: thirdGenreMovie?.title || 'Not found',
    });

    return {
      topGenre: {
        genre: recommendations.topGenre1,
        movie: topGenreMovie,
      },
      secondGenre: {
        genre: recommendations.topGenre2,
        movie: secondGenreMovie,
      },
      thirdGenre: {
        genre: recommendations.topGenre3,
        movie: thirdGenreMovie,
      },
    };
  } catch (error) {
    console.error('Error fetching top genre movies:', error);
    return null;
  }
};
