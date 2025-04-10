import React from 'react';
import { Pagination, Form } from 'react-bootstrap';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
};

const Paginator: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
}) => {
  const pageWindow = 2; // how many pages on either side of current page

  const pages: number[] = [];

  const startPage = Math.max(2, currentPage - pageWindow);
  const endPage = Math.min(totalPages - 1, currentPage + pageWindow);

  if (totalPages > 1) pages.push(1); // always show first page

  if (startPage > 2) pages.push(-1); // -1 will be the "..." before current

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (endPage < totalPages - 1) pages.push(-2); // -2 will be "..." after current

  if (totalPages > 1) pages.push(totalPages); // always show last page

  return (
    <div className="d-flex align-items-center gap-3 flex-wrap justify-content-center">
      <Pagination className="mb-0">
        <Pagination.Prev
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {pages.map((page, index) =>
          page === -1 || page === -2 ? (
            <Pagination.Ellipsis key={index} disabled />
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
