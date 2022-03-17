import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const usePagination = () => {
  const [searchParams] = useSearchParams();
  const pageSearchParams = searchParams.get('page');
  const [currentPage, setCurrentPage] = useState(
    parseInt(pageSearchParams) || 1
  );

  return [currentPage, setCurrentPage];
};

export default usePagination;
