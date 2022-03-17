import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';
import React from 'react';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { formatNumber } from '../helpers';
import CryptoChart from './CryptoChart';

export const CryptoInfo = ({ crypto }) => {
  const marketData = crypto?.market_data;
  const currentPrice = marketData?.current_price.usd;
  const percentage =
    marketData?.market_cap_change_percentage_24h_in_currency?.usd;
  const priceChange24 = marketData?.price_change_24h_in_currency.usd;
  const marketCap = marketData?.market_cap?.usd;
  const totalVolume = marketData?.total_volume?.usd;
  const volumnDivideMarket =
    marketData?.total_volume.usd / marketData?.market_cap.usd;
  const low24H = marketData?.low_24h.usd;
  const high24H = marketData?.high_24h.usd;

  return (
    <>
      <Box>
        <LabelTag>Rank #{crypto.market_cap_rank}</LabelTag>
      </Box>
      <Flex direction={['column', 'row']} justify="space-between">
        <Flex mt={4} align="center">
          <Image mr="12px" boxSize="32px" src={crypto.image.small} />
          <Heading as="h2" size="lg">
            {crypto.name}
          </Heading>
          <LabelTag ml={2} textTransform="uppercase">
            {crypto.symbol}
          </LabelTag>
        </Flex>

        <Stack mt={[6, 0]} spacing={0} direction="column">
          <Text fontSize="sm" fontWeight="semibold" align={['start', 'end']}>
            {`${crypto.name} Price `}
            <Text as="span" textTransform="uppercase">
              ({crypto.symbol})
            </Text>
          </Text>
          <Stack
            direction="row"
            align="center"
            justify={['start', 'end']}
            spacing={4}
          >
            <Text fontSize="3xl" fontWeight="bold" as="span">
              {currentPrice ? `$${formatNumber(currentPrice)}` : '?'}
            </Text>
            <Text
              color="white"
              bg={percentage > 0 ? 'green.400' : 'red.500'}
              py={1}
              px={2}
              fontWeight="semibold"
              borderRadius="lg"
              as="span"
            >
              {percentage ? `${percentage.toFixed(1)}%` : '?'}
            </Text>
          </Stack>
        </Stack>
      </Flex>
      <Divider my={4} />
      <Grid templateColumns={{ base: '100%', lg: '60% 40%' }} mt={6} gap={4}>
        <GridItem>
          <Heading mb={6} as="h3" size="md">
            {crypto.name} to USD Chart
          </Heading>
          <CryptoChart cryptoId={crypto.id} />
        </GridItem>
        <GridItem
          ml={{ base: -4, md: 4, lg: 0 }}
          mr={{ base: -4, md: 4, lg: 4 }}
          bg={useColorModeValue('gray.50', 'gray.800')}
          p={4}
          borderRadius="3xl"
        >
          <Heading mt={2} mb={8} as="h2" size="md">
            <Text as="span" textTransform="uppercase">
              {crypto.symbol}
            </Text>
            {` Price Statistics`}
          </Heading>
          <Stack divider={<StackDivider />} fontSize="sm" fontWeight="bold">
            <Text
              color={useColorModeValue('gray.600', 'gray.500')}
              fontWeight="semibold"
            >
              {crypto.name} Price Today
            </Text>
            <Flex justify="space-between" py={2}>
              <Text color={useColorModeValue('gray.500', 'gray.400')}>
                {crypto.name} Price
              </Text>
              <Text>
                {currentPrice ? `$${formatNumber(currentPrice)}` : '?'}
              </Text>
            </Flex>
            <Flex justify="space-between" py={2}>
              <Text color={useColorModeValue('gray.500', 'gray.400')}>
                Price Change 24h
              </Text>
              <Text>
                {priceChange24 ? `$${priceChange24.toLocaleString()}` : '?'}
              </Text>
            </Flex>
            <Flex justify="space-between" py={2}>
              <Text color={useColorModeValue('gray.500', 'gray.400')}>
                Market Cap
              </Text>
              <Text>{marketCap ? `$${formatNumber(marketCap)}` : '?'}</Text>
            </Flex>
            <Flex justify="space-between" py={2}>
              <Text color={useColorModeValue('gray.500', 'gray.400')}>
                Trading Volume
              </Text>
              <Text>
                {totalVolume ? `$${totalVolume.toLocaleString()}` : '?'}
              </Text>
            </Flex>
            <Flex justify="space-between" py={2}>
              <Text color={useColorModeValue('gray.500', 'gray.400')}>
                Volume/Market Cap
              </Text>
              <Text>
                {volumnDivideMarket ? `$${volumnDivideMarket.toFixed(5)}` : '?'}
              </Text>
            </Flex>
            <Flex justify="space-between" py={2}>
              <Text color={useColorModeValue('gray.500', 'gray.400')}>
                24h Low / 24h High
              </Text>
              <Text>
                {low24H && high24H
                  ? `$${low24H.toLocaleString()}/$${high24H.toLocaleString()}`
                  : '?'}
              </Text>
            </Flex>

            <Flex justify="space-between" py={2}>
              <Text color={useColorModeValue('gray.500', 'gray.400')}>
                Market Cap Rank
              </Text>
              <Text>
                {crypto.market_cap_rank ? `#${crypto.market_cap_rank}` : '?'}
              </Text>
            </Flex>
          </Stack>
        </GridItem>
      </Grid>
    </>
  );
};

const LabelTag = ({ children, ...props }) => {
  const labelBg = useColorModeValue('gray.100', 'gray.700');
  const ligthColor = useColorModeValue('gray.600', 'gray.200');
  return (
    <Text
      as="span"
      color={ligthColor}
      bg={labelBg}
      px={2}
      py={1}
      fontSize="xs"
      fontWeight="bold"
      borderRadius="base"
      {...props}
    >
      {children}
    </Text>
  );
};

export default CryptoInfo;
