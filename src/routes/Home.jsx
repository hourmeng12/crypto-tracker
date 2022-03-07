import React, { useState } from 'react';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Spinner, Center } from '@chakra-ui/react';
import { Flex, Stack } from '@chakra-ui/layout';
import {
  useGetCryptoMarketQuery,
  useGetGlobalDataQuery,
} from '../services/cryptoApi';
import { useBreakpointValue } from '@chakra-ui/media-query';
import Pagination from '@choc-ui/paginator';
import CryptoList from '../components/CryptoList';
import ApiAttribution from '../components/ApiAttribution';
import CryptoHeader from '../components/CryptoHeader';

const Home = () => {
  const emptyColor = useColorModeValue('gray.200', 'gray.800');
  const buttonBg = useColorModeValue('white', 'gray.900');
  const pageNeighbours = useBreakpointValue({ base: 1, md: 2 });
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: cryptos,
    isFetching,
    isLoading,
  } = useGetCryptoMarketQuery(currentPage);
  const { data: global } = useGetGlobalDataQuery();
  const totalItems = global?.data?.active_cryptocurrencies ?? 1000;

  return (
    <Stack minH="100vh" maxW="7xl" mx="auto" px={4} py={6}>
      <CryptoHeader />
      {isLoading ? (
        <Center py={12}>
          <Spinner
            thickness="5px"
            speed="0.65s"
            emptyColor={emptyColor}
            color="brand.500"
            size="xl"
          />
        </Center>
      ) : (
        <>
          <CryptoList cryptos={cryptos} isFetching={isFetching} />
          <Flex w="full" py={6} alignItems="center" justifyContent="center">
            <Pagination
              size="sm"
              total={totalItems}
              pageSize={100}
              paginationProps={{ display: 'flex', alignItems: 'center' }}
              current={currentPage}
              onChange={(page) => setCurrentPage(page)}
              pageNeighbours={pageNeighbours}
              baseStyles={{
                h: '32px',
                minW: '32px',
                p: 0,
                mx: '2px',
                bg: buttonBg,
              }}
            />
          </Flex>
          <ApiAttribution />
        </>
      )}
    </Stack>
  );
};

export default Home;
