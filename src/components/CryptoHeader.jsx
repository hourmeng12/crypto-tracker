import { useColorModeValue } from '@chakra-ui/color-mode';
import { Heading, Stack, Text } from '@chakra-ui/layout';
import { Skeleton, SkeletonText } from '@chakra-ui/skeleton';
import React from 'react';
import { convertToAdaptiveNumberString } from '../helpers';
import { useGetGlobalDataQuery } from '../services/cryptoApi';

const CryptoHeader = () => {
  const { data: global, isLoading } = useGetGlobalDataQuery();
  const marketCap = global?.data?.total_market_cap.usd ?? 0.0;
  const marketCapChange =
    global?.data?.market_cap_change_percentage_24h_usd ?? 0.0;

  return (
    <Stack spacing={2}>
      <Skeleton maxW="2xl" isLoaded={!isLoading} borderRadius="md">
        <Heading as="h1" fontSize={['md', 'lg', 'xl', '2xl']}>
          Cryptocurrency Prices by Market Cap
        </Heading>
      </Skeleton>

      <SkeletonText
        mt={8}
        noOfLines={2}
        isLoaded={!isLoading}
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
  );
};

export default CryptoHeader;
