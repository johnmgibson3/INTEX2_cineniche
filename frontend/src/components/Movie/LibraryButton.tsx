import React from 'react';
import { Movie } from '../../types/Movie';
import { BookmarkPlus, BookmarkCheck } from 'lucide-react';

interface LibraryButtonProps {
  movie: Movie;
  isInLibrary: boolean;
  onToggle: (movie: Movie) => void;
}

const LibraryButton: React.FC<LibraryButtonProps> = ({
  movie,
  isInLibrary,
  onToggle,
}) => {
  return (
    <button
      className="library-button"
      onClick={(e) => {
        e.stopPropagation();
        onToggle(movie);
      }}
      title={isInLibrary ? 'Remove from Library' : 'Add to Library'}
    >
      {isInLibrary ? <BookmarkCheck size={22} /> : <BookmarkPlus size={22} />}
    </button>
  );
};

export default LibraryButton;
