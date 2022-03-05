import React from 'react';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Spinner, Center, Skeleton, SkeletonText } from '@chakra-ui/react';
import { Heading, Stack, Text } from '@chakra-ui/layout';
import {
  useGetCrytoMarketQuery,
  useGetGlobalDataQuery,
} from '../services/crypto';
import { useBreakpointValue } from '@chakra-ui/media-query';
import { usePagination } from '@ajna/pagination';
import Pagination from './CryptoPagination';
import CryptoList from './CryptoList';
import { convertToAdaptiveNumberString } from '../helpers';

const Content = () => {
  const emptyColor = useColorModeValue('gray.200', 'gray.800');
  const inner = useBreakpointValue({ base: 1, md: 2 });
  const { pages, pagesCount, currentPage, setCurrentPage } = usePagination({
    total: 12978,
    limits: {
      outer: 1,
      inner: inner,
    },
    initialState: {
      pageSize: 100,
      currentPage: 1,
    },
  });
  const {
    data: cryptos,
    isFetching,
    isLoading,
  } = useGetCrytoMarketQuery(currentPage);
  const { data: global, isLoading: isGlobalDataLoading } =
    useGetGlobalDataQuery();

  const globalData = {
    total_market_cap: global?.data?.total_market_cap.usd ?? 0.0,
    market_cap_change:
      global?.data?.market_cap_change_percentage_24h_usd ?? 0.0,
  };

  return (
    <Stack minH="100vh" maxW="7xl" mx="auto" px={4} py={6}>
      <Stack mb={6} spacing={2}>
        <Skeleton maxW="2xl" isLoaded={!isGlobalDataLoading} borderRadius="md">
          <Heading as="h1" fontSize={['md', 'lg', 'xl', '2xl']}>
            Cryptocurrency Prices by Market Cap
          </Heading>
        </Skeleton>

        <SkeletonText
          mt={8}
          noOfLines={2}
          isLoaded={!isGlobalDataLoading}
          borderRadius="md"
        >
          <Text
            color={useColorModeValue('gray.500', 'gray.400')}
            fontSize={['sm', 'md']}
          >
            {'The global crypto market cap is '}
            <Text as="span" fontWeight="semibold">
              ${convertToAdaptiveNumberString(globalData.total_market_cap)}
            </Text>
            {', a '}
            <Text as="span" color="red.500" fontWeight="semibold">
              {globalData.market_cap_change.toFixed(2)}%
            </Text>
            {` change in the last 24 hours.`}
          </Text>
        </SkeletonText>
      </Stack>
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
          <Pagination
            itemsPerPage={2}
            pages={pages}
            pagesCount={pagesCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </Stack>
  );
};

export default Content;
