// components/Pagination.tsx

import React from "react";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selectedPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  currentPage,
  onPageChange,
}) => {
  return (
    <ReactPaginate
      previousLabel="Previous"
      nextLabel="Next"
      breakLabel="..."
      breakClassName="mx-3"
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={(selected) => onPageChange(selected.selected)}
      containerClassName="pagination flex justify-center my-10"
      activeClassName="active-page"
      previousClassName="px-3 py-1 border text-black rounded mr-2 bg-white hover:bg-gray-100"
      nextClassName="px-3 py-1 border text-black rounded ml-2 bg-white hover:bg-gray-100"
      pageClassName="px-3 py-1 mx-1 border text-black rounded bg-white hover:bg-gray-100"
      disabledClassName="disabled"
      forcePage={currentPage === 0 ? currentPage : currentPage - 1}
    />
  );
};

export default Pagination;
