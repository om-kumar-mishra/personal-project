import { useState } from "react";

const usePagination = (data:any, itemsPerPage:number) => {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const currentPageData = data.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const previousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  //   const jumpToPage = ()=>{
  //     setCurrentPage(pageNumber);
  //   }

  return {
    currentPageData,
    currentPage,
    totalPages,
    nextPage,
    previousPage,
    setCurrentPage
  };
};

export default usePagination;
