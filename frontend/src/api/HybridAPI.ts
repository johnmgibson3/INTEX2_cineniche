import { Recommend } from '../types/HybridRecommender';

const API_URL = 'https://intex-backend7-c2cghsf3cbddhdfm.centralus-01.azurewebsites.net/api';

export const getAllHybridRecommendations = async (): Promise<Recommend[] | null> => {
  try {
    const res = await fetch(`${API_URL}/Hybrid`);
    if (!res.ok)
      throw new Error(`Failed to fetch hybrid recommendations. Status: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error('getAllHybridRecommendations error:', error);
    return null;
  }
};

export const getHybridRecommendation = async (originalMovieId: string): Promise<Recommend | null> => {
  try {
    const res = await fetch(`${API_URL}/Hybrid/${originalMovieId}`);
    if (!res.ok) throw new Error(`Hybrid recommendation not found: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error('getHybridRecommendation error:', error);
    return null;
  }
};

export const searchRecommendationsByTitle = async (title: string): Promise<Recommend[] | null> => {
  try {
    const res = await fetch(`${API_URL}/Hybrid/search?title=${encodeURIComponent(title)}`);
    if (!res.ok) throw new Error(`Search failed with status: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error('searchRecommendationsByTitle error:', error);
    return null;
  }
};

export const getTop5Recommendations = async (): Promise<Recommend[] | null> => {
  try {
    const res = await fetch(`${API_URL}/Hybrid/top5`);
    if (!res.ok) throw new Error(`Failed to fetch top recommendations. Status: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error('getTop5Recommendations error:', error);
    return null;
  }
};

export const getHighQualityRecommendations = async (minScore = 0.7): Promise<Recommend[] | null> => {
  try {
    const res = await fetch(`${API_URL}/Hybrid/high-quality?minScore=${minScore}`);
    if (!res.ok) throw new Error(`Failed to fetch high-quality recommendations. Status: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error('getHighQualityRecommendations error:', error);
    return null;
  }
};

export const fetchAllHybridRecommendationsSecure = async (): Promise<Recommend[] | null> => {
  try {
    const res = await fetch(`${API_URL}/Hybrid`, {
      method: 'GET',
      credentials: 'include', // ✅ include credentials for secure requests
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('❌ fetchAllHybridRecommendationsSecure error:', error);
    return null;
  }
};