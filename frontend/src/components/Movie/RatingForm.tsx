import React, { useState } from 'react';
import { submitRating } from '../../api/RatingsAPI';

interface RatingFormProps {
  userId: string;
  showId: string;
  hasRated: boolean;
  initialRating?: number;
  onSubmitSuccess: (newRating: number) => void;
}

const RatingForm: React.FC<RatingFormProps> = ({
  userId,
  showId,
  hasRated,
  initialRating,
  onSubmitSuccess,
}) => {
  const [userRating, setUserRating] = useState<number | null>(
    initialRating ?? null
  );
  const [submitting, setSubmitting] = useState(false);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  const handleSubmitRating = async () => {
    if (!userRating || submitting) return;
    setSubmitting(true);
    try {
      await submitRating(showId, userId, userRating);
      setRatingSubmitted(true);
      onSubmitSuccess(userRating);
      setTimeout(() => setRatingSubmitted(false), 3000);
    } catch (err) {
      alert('Failed to submit rating');
    } finally {
      setSubmitting(false);
    }
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
          onClick={handleSubmitRating}
        >
          {hasRated ? 'Update' : 'Submit'}
        </button>
        {ratingSubmitted && (
          <div
            className="ms-3 text-success"
            style={{ fontWeight: 'bold' }}
            aria-live="polite"
          >
            Rating submitted!
          </div>
        )}
      </div>
    </div>
  );
};

export default RatingForm;
