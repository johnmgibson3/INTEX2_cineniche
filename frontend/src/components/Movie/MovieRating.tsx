import React, { useEffect, useState } from 'react';
import { submitRating, getRating } from '../../api/RatingsAPI';
import { getUserIdFromHeader } from '../../api/AuthApi';

interface MovieRatingProps {
  showId: string;
}

const MovieRating: React.FC<MovieRatingProps> = ({ showId }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [hasRated, setHasRated] = useState(false);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserIdFromHeader();
      setUserId(id);
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchRating = async () => {
      if (!userId || !showId) return;
      const rating = await getRating(Number(userId), showId);
      if (rating) {
        setUserRating(rating);
        setHasRated(true);
      }
    };
    fetchRating();
  }, [userId, showId]);

  const handleSubmit = async () => {

    console.log("🚨 Submit clicked");
    console.log("➡️ userId:", userId);
    console.log("➡️ userRating:", userRating);


    if (!userId || userRating == null) return;
    setSubmitting(true);
    const success = await submitRating(showId, Number(userId), userRating);
    if (success) {
      setHasRated(true);
      setRatingSubmitted(true);
      setTimeout(() => setRatingSubmitted(false), 3000);
    }
    setSubmitting(false);
  };

  return (
    <div className="rating-section mt-3">
      {hasRated && userRating ? (
        <p>
          <strong>Your Rating:</strong> {userRating} ⭐
        </p>
      ) : (
        <p>You haven’t rated this movie yet.</p>
      )}

      <div className="d-flex align-items-center">
        <label htmlFor="rating-select" className="me-2">
          Rate this movie:
        </label>
        <select
          id="rating-select"
          className="form-select form-select-sm w-auto"
          value={userRating ?? ''}
          onChange={(e) => setUserRating(Number(e.target.value))}
        >
          <option value="" disabled>
            Select
          </option>
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <button
          className="btn btn-warning ms-3"
          disabled={userRating == null || submitting}
          onClick={handleSubmit}
        >
          {hasRated ? 'Update' : 'Submit'}
        </button>
        {ratingSubmitted && (
          <div className="ms-3 text-success fw-bold" aria-live="polite">
            Rating submitted!
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieRating;
