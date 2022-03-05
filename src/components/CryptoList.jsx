import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Skeleton,
  Hide,
} from '@chakra-ui/react';
import { Box, Flex, Stack, Text } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { formatNumber } from '../helpers';

const CryptoList = ({ cryptos, isFetching }) => {
  const bg = useColorModeValue('white', 'gray.900');
  const labelBg = useColorModeValue('gray.200', 'gray.800');
  const ligthColor = useColorModeValue('gray.600', 'gray.200');

  return (
    <Box overflowX="auto" className="hide-scroll">
      <Table variant="list" pos="relative" bg={bg} whiteSpace="nowrap">
        <Thead>
          <Tr>
            <Hide below="md">
              <Th bg={bg} pos="sticky" left="0" isNumeric zIndex="docked">
                #
              </Th>
            </Hide>
            <Th bg={bg} pos="sticky" left={[0, 0, '38px']} minW="8.75rem">
              Name
            </Th>
            <Th isNumeric>Price</Th>
            <Th isNumeric>1h %</Th>
            <Th isNumeric>24h %</Th>
            <Th isNumeric>7d %</Th>
            <Th isNumeric>Market Cap</Th>
            <Th isNumeric>Volume(24h)</Th>
            <Th w="auto" isNumeric>
              Circulating Supply
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {cryptos.map((crypto, index) => {
            const crytoData = {
              market_cap_rank: crypto?.market_cap_rank ?? 0,
              image: crypto?.image.replace('/large/', '/thumb/'),
              name: crypto?.name ?? '',
              symbol: crypto?.symbol ?? '',
              current_price: crypto?.current_price ?? 0,
              oneHPercentage:
                crypto?.price_change_percentage_1h_in_currency ?? 0,
              twentyFourHPercentage:
                crypto?.price_change_percentage_24h_in_currency ?? 0,
              sevenDayPercentage:
                crypto?.price_change_percentage_7d_in_currency ?? 0,
              market_cap: crypto?.market_cap ?? 0,
              total_vol: crypto?.total_volume ?? 0,
              total_circulating_supply: crypto.circulating_supply ?? 0,
            };

            return (
              <Tr key={index}>
                <Hide below="md">
                  <Td className="hide" bg={bg} pos="sticky" left="0" isNumeric>
                    <Skeleton isLoaded={!isFetching} borderRadius="md">
                      {crytoData.market_cap_rank}
                    </Skeleton>
                  </Td>
                </Hide>
                <Td
                  bg={bg}
                  pos="sticky"
                  px={['4px', '10px']}
                  left={[0, 0, '38px']}
                  zIndex="banner"
                >
                  <Skeleton isLoaded={!isFetching} borderRadius="md">
                    <Flex align="center">
                      <Image
                        mr={4}
                        boxSize="24px"
                        src={crytoData.image}
                        alt={crytoData.name}
                      />
                      <Flex
                        direction={['column', 'column', 'row']}
                        align={['start', 'start', 'center']}
                      >
                        <Text
                          mr={2}
                          fontWeight="semibold"
                          casing="capitalize"
                          whiteSpace={['normal', 'normal', 'nowrap']}
                          wordBreak={['break-word', 'break-word', 'initial']}
                        >
                          {crytoData.name}
                        </Text>
                        <Stack direction="row" spacing={1} color={ligthColor}>
                          <Hide above="md">
                            <Text
                              bg={labelBg}
                              px={1}
                              fontSize="xs"
                              borderRadius="base"
                            >
                              {crytoData.market_cap_rank}
                            </Text>
                          </Hide>
                          <Text fontSize={['xs', 'sm']} casing="uppercase">
                            {crytoData.symbol}
                          </Text>
                        </Stack>
                      </Flex>
                    </Flex>
                  </Skeleton>
                </Td>
                <Td pl={[0, '10px']} isNumeric>
                  <Skeleton isLoaded={!isFetching} borderRadius="md">
                    ${formatNumber(crytoData.current_price)}
                  </Skeleton>
                </Td>
                <Td
                  color={crytoData.oneHPercentage > 0 ? 'green.400' : 'red.500'}
                  isNumeric
                >
                  <Skeleton isLoaded={!isFetching} borderRadius="md">
                    {crytoData.oneHPercentage.toFixed(2) || '0.00'}%
                  </Skeleton>
                </Td>
                <Td
                  color={
                    crytoData.twentyFourHPercentage > 0
                      ? 'green.400'
                      : 'red.500'
                  }
                  isNumeric
                >
                  <Skeleton isLoaded={!isFetching} borderRadius="md">
                    {crytoData.twentyFourHPercentage.toFixed(2) || '0.00'}%
                  </Skeleton>
                </Td>
                <Td
                  color={
                    crytoData.sevenDayPercentage > 0 ? 'green.400' : 'red.500'
                  }
                  isNumeric
                >
                  <Skeleton isLoaded={!isFetching} borderRadius="md">
                    {crytoData.sevenDayPercentage.toFixed(2) || '0.00'}%
                  </Skeleton>
                </Td>
                <Td isNumeric>
                  <Skeleton isLoaded={!isFetching} borderRadius="md">
                    ${formatNumber(crytoData.market_cap)}
                  </Skeleton>
                </Td>
                <Td isNumeric>
                  <Skeleton isLoaded={!isFetching} borderRadius="md">
                    ${formatNumber(crytoData.total_vol)}
                  </Skeleton>
                </Td>
                <Td isNumeric>
                  <Skeleton isLoaded={!isFetching} borderRadius="md">
                    {formatNumber(crytoData.total_circulating_supply)}
                    <Text as="span" casing="uppercase">
                      &nbsp;{crytoData.symbol}
                    </Text>
                  </Skeleton>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

export default CryptoList;
