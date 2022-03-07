import React, { forwardRef, useState } from 'react';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Spinner, Center, Skeleton, SkeletonText } from '@chakra-ui/react';
import { Flex, Heading, Stack, Text } from '@chakra-ui/layout';
import {
  useGetCryptoMarketQuery,
  useGetGlobalDataQuery,
} from '../services/cryptoApi';
import { useBreakpointValue } from '@chakra-ui/media-query';
import CryptoList from './CryptoList';
import { convertToAdaptiveNumberString } from '../helpers';
import Pagination from '@choc-ui/paginator';

const Content = () => {
  const emptyColor = useColorModeValue('gray.200', 'gray.800');
  const buttonBg = useColorModeValue('white', 'gray.900');
  const pageNeighbours = useBreakpointValue({ base: 1, md: 2 });
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: cryptos,
    isFetching,
    isLoading,
  } = useGetCryptoMarketQuery(currentPage);
  const { data: global, isLoading: isGlobalDataLoading } =
    useGetGlobalDataQuery();

  const totalItems = global?.data?.active_cryptocurrencies ?? 1200;
  const marketCap = global?.data?.total_market_cap.usd ?? 0.0;
  const marketCapChange =
    global?.data?.market_cap_change_percentage_24h_usd ?? 0.0;

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
              ${convertToAdaptiveNumberString(marketCap)}
            </Text>
            {', a '}
            <Text as="span" color="red.500" fontWeight="semibold">
              {marketCapChange.toFixed(2)}%
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
        </>
      )}
    </Stack>
  );
};

export default Content;
