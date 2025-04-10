import React from 'react';
import { Pagination, Form } from 'react-bootstrap';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
};

const getVisiblePages = (
  currentPage: number,
  totalPages: number,
  windowSize: number = 2
): (number | '...')[] => {
  const pages: (number | '...')[] = [];

  const start = Math.max(currentPage - windowSize, 2);
  const end = Math.min(currentPage + windowSize, totalPages - 1);

  pages.push(1); // Always show first page

  if (start > 2) {
    pages.push('...');
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < totalPages - 1) {
    pages.push('...');
  }

  if (totalPages > 1) {
    pages.push(totalPages); // Always show last page
  }

  return pages;
};

const Paginator: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
}) => {
  const pages = getVisiblePages(currentPage, totalPages);

  return (
    <div className="d-flex align-items-center gap-3 flex-wrap justify-content-center">
      <Pagination className="mb-0">
        <Pagination.Prev
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {pages.map((page, index) =>
          page === '...' ? (
            <Pagination.Ellipsis key={`ellipsis-${index}`} disabled />
          ) : (
            <Pagination.Item
              key={page}
              active={page === currentPage}
              onClick={() => onPageChange(page)}
            >
              {page}
            </Pagination.Item>
          )
        )}
        <Pagination.Next
          onClick={() =>
            currentPage < totalPages && onPageChange(currentPage + 1)
          }
          disabled={currentPage === totalPages}
        />
      </Pagination>

      <Form.Select
        value={pageSize}
        onChange={(e) => onPageSizeChange(parseInt(e.target.value))}
        style={{ width: 'auto' }}
      >
        {[5, 10, 20, 50, 100].map((size) => (
          <option key={size} value={size}>
            Show {size}
          </option>
        ))}
      </Form.Select>
    </div>
  );
};

export default Paginator;
