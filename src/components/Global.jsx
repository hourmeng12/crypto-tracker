import React from 'react';
import { Flex, HStack, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';
import { useGetGlobalDataQuery } from '../services/cryptoApi';
import { Skeleton } from '@chakra-ui/skeleton';

const Global = () => {
  const { data: global, isLoading } = useGetGlobalDataQuery();
  const { colorMode, toggleColorMode } = useColorMode();
  const color = useColorModeValue('gray.700', 'gray.400');

  const globalData = {
    total_coins: global?.data?.active_cryptocurrencies ?? 0,
    markets: global?.data?.markets ?? 0,
    market_cap: global?.data?.total_market_cap?.usd ?? 0,
    total_vol: global?.data?.total_volume?.usd ?? 0,
    dominance: {
      btc: global?.data?.market_cap_percentage?.btc ?? 0,
      eth: global?.data?.market_cap_percentage?.eth ?? 0,
    },
  };

  return (
    <Flex
      maxW="8xl"
      mx="auto"
      px={4}
      py={1}
      align="center"
      justify="space-between"
    >
      <HStack
        spacing={4}
        fontSize="xs"
        overflowX="auto"
        whiteSpace="nowrap"
        className="hide-scroll"
        color={color}
        fontWeight="semibold"
      >
        <Skeleton isLoaded={!isLoading} borderRadius="md">
          <Text>
            Coins:&nbsp;
            <Text as="span" color="brand.500">
              {globalData.total_coins.toLocaleString()}
            </Text>
          </Text>
        </Skeleton>
        <Skeleton isLoaded={!isLoading} borderRadius="md">
          <Text>
            Markets:&nbsp;
            <Text as="span" color="brand.500">
              {globalData.markets.toLocaleString()}
            </Text>
          </Text>
        </Skeleton>
        <Skeleton isLoaded={!isLoading} borderRadius="md">
          <Text display="inline">
            Market Cap:&nbsp;
            <Text as="span" color="brand.500">
              ${globalData.market_cap.toLocaleString()}
            </Text>
          </Text>
        </Skeleton>
        <Skeleton isLoaded={!isLoading} borderRadius="md">
          <Text>
            24h Vol:&nbsp;
            <Text as="span" color="brand.500">
              ${globalData.total_vol.toLocaleString()}
            </Text>
          </Text>
        </Skeleton>
        <Skeleton isLoaded={!isLoading} borderRadius="md">
          <Text>
            Dominance:&nbsp;
            <Text as="span" color="brand.500">
              BTC {globalData.dominance.btc.toFixed(1)}% ETH{' '}
              {globalData.dominance.eth.toFixed(1)}%
            </Text>
          </Text>
        </Skeleton>
      </HStack>
      <Button ml={4} size="sm" variant="ghost" onClick={toggleColorMode}>
        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      </Button>
    </Flex>
  );
};

export default Global;
