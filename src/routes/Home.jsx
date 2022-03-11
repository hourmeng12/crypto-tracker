import React from 'react';
import {
  useGetCryptoMarketQuery,
  useGetGlobalDataQuery,
} from '../services/cryptoApi';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Flex, Heading, Link, Stack, Text } from '@chakra-ui/layout';
import { Alert, AlertIcon } from '@chakra-ui/alert';
import { Skeleton, SkeletonText } from '@chakra-ui/skeleton';
import { usePagination } from '../hooks';
import { convertToAdaptiveNumberString } from '../helpers';
import CryptoList from '../components/CryptoList';
import LoadingSpinner from '../components/LoadingSpinner';
import CryptoPagination from '../components/CryptoPagination';

const Home = () => {
  const [currentPage, setCurrentPage] = usePagination();
  const {
    data: cryptos,
    isFetching,
    isLoading,
  } = useGetCryptoMarketQuery(currentPage);
  const { data: global, isLoading: isGlobalLoading } = useGetGlobalDataQuery();
  const totalItems = global?.data?.active_cryptocurrencies ?? 1000;
  const marketCap = global?.data?.total_market_cap.usd ?? 0.0;
  const marketCapChange =
    global?.data?.market_cap_change_percentage_24h_usd ?? 0.0;
  const color = useColorModeValue('green.800', 'green.100');

  return (
    <Stack spacing={8}>
      <Stack spacing={2}>
        <Skeleton maxW="2xl" isLoaded={!isGlobalLoading} borderRadius="md">
          <Heading as="h1" fontSize={['md', 'lg', 'xl', '2xl']}>
            Cryptocurrency Prices by Market Cap
          </Heading>
        </Skeleton>

        <SkeletonText
          mt={8}
          noOfLines={2}
          isLoaded={!isGlobalLoading}
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
        <LoadingSpinner minH="50vh" />
      ) : (
        <>
          <CryptoList cryptos={cryptos} isFetching={isFetching} />
          <Flex w="full" py={6} alignItems="center" justifyContent="center">
            <CryptoPagination
              totalItems={totalItems}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </Flex>
          <Alert status="success" fontSize="sm" borderRadius="md">
            <AlertIcon />
            Api provided by&nbsp;
            <Link
              fontWeight="semibold"
              color={color}
              href="https://www.coingecko.com/"
              isExternal
            >
              CoinGecko
            </Link>
          </Alert>
        </>
      )}
    </Stack>
  );
};

export default Home;
