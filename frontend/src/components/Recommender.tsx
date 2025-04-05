import React, { useState } from 'react';
import './Recommender.css';

type CollaborativeRow = {
  ArticleID: string;
  ArticleTitle: string;
  Rec1: string;
  Rec2: string;
  Rec3: string;
  Rec4: string;
  Rec5: string;
};

type ContentRow = {
  ArticleID: string;
  'If you liked': string;
  'Recommendation 1': string;
  'Recommendation 2': string;
  'Recommendation 3': string;
  'Recommendation 4': string;
  'Recommendation 5': string;
};

type RecommenderProps = {
  articleData: CollaborativeRow[];
  contentData: ContentRow[];
};

const Recommender: React.FC<RecommenderProps> = ({
  articleData,
  contentData,
}) => {
  const [selectedID, setSelectedID] = useState<string>('');
  const [collabRecs, setCollabRecs] = useState<string[]>([]);
  const [contentRecs, setContentRecs] = useState<string[]>([]);

  const sharedIDs = articleData
    .map((row) => row.ArticleID)
    .filter((id) => contentData.some((c) => c.ArticleID === id));

  const handleIDChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedID(id);

    const collabRow = articleData.find((row) => row.ArticleID === id);
    const contentRow = contentData.find((row) => row.ArticleID === id);

    setCollabRecs(
      collabRow
        ? [
            collabRow.Rec1,
            collabRow.Rec2,
            collabRow.Rec3,
            collabRow.Rec4,
            collabRow.Rec5,
          ]
        : []
    );

    setContentRecs(
      contentRow
        ? [
            contentRow['Recommendation 1'],
            contentRow['Recommendation 2'],
            contentRow['Recommendation 3'],
            contentRow['Recommendation 4'],
            contentRow['Recommendation 5'],
          ]
        : []
    );
  };

  return (
    <div className="recommender-container">
      <h2>Select a Content ID</h2>
      <div className="selectors">
        <label>
          Content ID:
          <select value={selectedID} onChange={handleIDChange}>
            <option value="">--Select--</option>
            {sharedIDs.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
        </label>
      </div>

      {(collabRecs.length > 0 || contentRecs.length > 0) && (
        <div className="table-container">
          <h2>Recommendations</h2>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Article 1</th>
                <th>Article 2</th>
                <th>Article 3</th>
                <th>Article 4</th>
                <th>Article 5</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Collaborative</th>
                {collabRecs.map((title, i) => (
                  <td key={`collab-${i}`}>{title}</td>
                ))}
              </tr>
              <tr>
                <th>Content</th>
                {contentRecs.map((title, i) => (
                  <td key={`content-${i}`}>{title}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Recommender;
