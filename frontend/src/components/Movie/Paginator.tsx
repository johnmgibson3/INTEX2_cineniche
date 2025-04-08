import React from 'react';
import { Pagination } from 'react-bootstrap';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Paginator: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageWindow = 5;
  const startPage = Math.max(1, currentPage - pageWindow);
  const endPage = Math.min(totalPages, currentPage + pageWindow);

  const pages = [];
  for (let page = startPage; page <= endPage; page++) {
    pages.push(page);
  }

  return (
    <Pagination>
      <Pagination.Prev
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />

      {startPage > 1 && <Pagination.Ellipsis disabled />}
      {pages.map((page) => (
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Pagination.Item>
      ))}
      {endPage < totalPages && <Pagination.Ellipsis disabled />}

      <Pagination.Next
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
};

export default Paginator;
