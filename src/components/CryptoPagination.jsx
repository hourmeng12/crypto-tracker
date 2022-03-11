import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { useBreakpointValue } from '@chakra-ui/media-query';
import Pagination from '@choc-ui/paginator';

const CryptoPagination = ({ totalItems, currentPage, setCurrentPage }) => {
  const [, setSearchParams] = useSearchParams();
  const pageNeighbours = useBreakpointValue({ base: 1, md: 2 });

  const handleChangePage = (page) => {
    setSearchParams({ page: page });
    setCurrentPage(page);
  };

  return (
    <Pagination
      size="sm"
      total={totalItems}
      pageSize={100}
      paginationProps={{ display: 'flex', alignItems: 'center' }}
      current={currentPage}
      onChange={handleChangePage}
      pageNeighbours={pageNeighbours}
      baseStyles={{
        h: '32px',
        minW: '32px',
        p: 0,
        mx: '2px',
        bg: useColorModeValue('white', 'gray.900'),
      }}
    />
  );
};

export default CryptoPagination;
