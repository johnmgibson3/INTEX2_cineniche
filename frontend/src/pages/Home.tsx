import React, { useEffect, useState } from 'react';

// @ts-ignore — Vite allows raw import of CSV text
import articleCSV from '../assets/article_recommendations.csv?raw';
// @ts-ignore
import contentCSV from '../assets/recommendations_output.csv?raw';
import Recommender from '../components/recommender';

// Parses CSV text into an array of objects
function parseCSV(raw: string): any[] {
  const lines = raw.trim().split('\n');
  const headers = lines[0].split(',').map((h) => h.trim());

  return lines.slice(1).map((line) => {
    const values = line.split(',').map((v) => v.trim());
    const obj: { [key: string]: string } = {};
    headers.forEach((header, i) => {
      obj[header] = values[i] || '';
    });
    return obj;
  });
}

const Home: React.FC = () => {
  const [articleData, setArticleData] = useState<any[]>([]);
  const [contentData, setContentData] = useState<any[]>([]);

  useEffect(() => {
    setArticleData(parseCSV(articleCSV));
    setContentData(parseCSV(contentCSV));
  }, []);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {articleData.length && contentData.length ? (
        <Recommender articleData={articleData} contentData={contentData} />
      ) : (
        <p>Loading recommendation data...</p>
      )}
    </div>
  );
};

export default Home;
