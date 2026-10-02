import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface PaginationProps {
  previousPage: () => void;
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  totalData: number;
  btnClass?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  previousPage,
  currentPage,
  totalPages,
  nextPage,
  totalData,
  btnClass,
}) => {
  return (
    <div className="pagination-container">
      <FontAwesomeIcon
        size="xl"
        className={`pagination-button ${btnClass ?? ""} ${
          currentPage === 0 ? "disabled-icon" : ""
        }`}
        onClick={previousPage}
        icon={faCaretLeft}
      />
      <span className="pagination-page-info">
        Page {currentPage + 1} of {totalPages}
      </span>
      <FontAwesomeIcon
        size="xl"
        className={`pagination-button ${btnClass ?? ""} ${
          currentPage === totalPages - 1 ? "disabled-icon" : ""
        }`}
        onClick={nextPage}
        icon={faCaretRight}
      />
      <b>Total Record: {totalData}</b>
    </div>
  );
};

export default Pagination;
