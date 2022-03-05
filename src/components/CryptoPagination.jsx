import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useColorModeValue } from '@chakra-ui/color-mode';
import {
  Pagination,
  PaginationPage,
  PaginationNext,
  PaginationPrevious,
  PaginationPageGroup,
  PaginationContainer,
  PaginationSeparator,
} from '@ajna/pagination';

const CryptoPagination = ({
  pages,
  pagesCount,
  currentPage,
  setCurrentPage,
}) => {
  const bg = useColorModeValue('white', 'gray.900');
  const handlePageChange = (nextPage) => {
    setCurrentPage(nextPage);
  };

  return (
    <Pagination
      pagesCount={pagesCount}
      currentPage={currentPage}
      onPageChange={handlePageChange}
    >
      <PaginationContainer w="full" align="center" justify="center" p={4}>
        <PaginationPrevious w={10} h={8} variant="ghost">
          <ChevronLeftIcon />
        </PaginationPrevious>
        <PaginationPageGroup
          isInline
          align="center"
          separator={
            <PaginationSeparator
              bg={bg}
              fontSize="sm"
              w={9}
              h={8}
              jumpSize={11}
            />
          }
        >
          {pages.map((page) => (
            <PaginationPage
              bg={bg}
              w={9}
              h={8}
              key={`pagination_page_${page}`}
              page={page}
              fontSize="sm"
              _current={{
                color: 'white',
                bg: 'brand.500',
                _hover: {
                  bg: 'brand.600',
                },
                fontSize: 'sm',
                w: 9,
                h: 8,
              }}
            />
          ))}
        </PaginationPageGroup>
        <PaginationNext w={9} h={8} variant="ghost">
          <ChevronRightIcon />
        </PaginationNext>
      </PaginationContainer>
    </Pagination>
  );
};

export default CryptoPagination;
