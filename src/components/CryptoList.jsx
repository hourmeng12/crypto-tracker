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
  LinkBox,
} from '@chakra-ui/react';
import { Box, Flex, LinkOverlay, Text } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { formatNumber } from '../helpers';
import { Link as RouterLink } from 'react-router-dom';

const CryptoList = ({ cryptos, isFetching }) => {
  const bg = useColorModeValue('white', 'gray.900');
  const labelBg = useColorModeValue('gray.200', 'gray.800');
  const lightColor = useColorModeValue('gray.500', 'gray.200');
  const hoverBg = useColorModeValue('gray.50', 'gray.800');

  return (
    <Box overflowX="auto" className="hide-scroll">
      <Table variant="list" pos="relative" bg={bg} whiteSpace="nowrap">
        <Thead>
          <Tr>
            <Hide below="md">
              <Th bg={bg} pos="sticky" left="0" isNumeric zIndex="docked">
                <Text as="span">#</Text>
              </Th>
            </Hide>
            <Th bg={bg} pos="sticky" left={[0, 0, '38px']} minW="9.5rem">
              Name
            </Th>
            <Th isNumeric>Price</Th>
            <Th isNumeric>1h %</Th>
            <Th isNumeric>24h %</Th>
            <Th isNumeric>7d %</Th>
            <Th isNumeric>Market Cap</Th>
            <Th isNumeric>Volume(24h)</Th>
            <Th isNumeric>Circulating Supply</Th>
          </Tr>
        </Thead>
        <Tbody>
          {cryptos.map((crypto, index) => {
            const marketCapRank = crypto?.market_cap_rank ?? '?';
            const image = crypto?.image.replace('/large/', '/thumb/');
            const name = crypto?.name ?? '';
            const symbol = crypto?.symbol ?? '';
            const currentPrice = crypto?.current_price ?? 0;
            const oneHPercentage =
              crypto?.price_change_percentage_1h_in_currency;
            const twentyFourHPercentage =
              crypto?.price_change_percentage_24h_in_currency;
            const sevenDayPercentage =
              crypto?.price_change_percentage_7d_in_currency;
            const marketCap = crypto?.market_cap;
            const totalVol = crypto?.total_volume;
            const totalCirculatingSupply = crypto.circulating_supply;

            return (
              <Tr key={index} role="group" _hover={{ bgColor: hoverBg }}>
                <Hide below="md">
                  <Td
                    className="hide"
                    bg={bg}
                    pos="sticky"
                    left="0"
                    _groupHover={{ bgColor: hoverBg }}
                    isNumeric
                  >
                    <Skeleton isLoaded={!isFetching} borderRadius="md">
                      <Text as="span" color={lightColor}>
                        {marketCapRank}
                      </Text>
                    </Skeleton>
                  </Td>
                </Hide>
                <Td
                  _groupHover={{ bgColor: hoverBg }}
                  bg={bg}
                  pos="sticky"
                  px={['4px', '10px']}
                  left={[0, 0, '38px']}
                  zIndex="banner"
                >
                  <Skeleton isLoaded={!isFetching} borderRadius="md">
                    <LinkBox>
                      <Flex align="center">
                        <Image mr={4} boxSize="24px" src={image} alt={name} />
                        <Flex
                          direction={['column', 'column', 'row']}
                          align={['start', 'start', 'center']}
                        >
                          <LinkOverlay
                            as={RouterLink}
                            to={`/cryptocurrencies/${crypto.id}`}
                          >
                            <Text
                              as="span"
                              mr={2}
                              casing="capitalize"
                              noOfLines={3}
                              whiteSpace={['normal', 'normal', 'nowrap']}
                              wordBreak={[
                                'break-word',
                                'break-word',
                                'initial',
                              ]}
                            >
                              {name}
                            </Text>
                          </LinkOverlay>
                          <Flex align="center" color={lightColor}>
                            <Hide above="md">
                              <Text
                                as="span"
                                bg={labelBg}
                                px={1}
                                mr={1}
                                fontSize="xs"
                                borderRadius="base"
                              >
                                {marketCapRank}
                              </Text>
                            </Hide>
                            <Text
                              as="span"
                              noOfLines={2}
                              fontSize={['xs', 'sm']}
                              casing="uppercase"
                              whiteSpace="normal"
                            >
                              {symbol}
                            </Text>
                          </Flex>
                        </Flex>
                      </Flex>
                    </LinkBox>
                  </Skeleton>
                </Td>
                <Td pl={['0px', '10px']} isNumeric>
                  <Skeleton isLoaded={!isFetching} borderRadius="md">
                    ${formatNumber(currentPrice)}
                  </Skeleton>
                </Td>
                <Td isNumeric>
                  <Skeleton isLoaded={!isFetching} borderRadius="md">
                    {oneHPercentage ? (
                      <Text
                        color={oneHPercentage > 0 ? 'green.400' : 'red.500'}
                      >
                        {oneHPercentage.toFixed(2)}%
                      </Text>
                    ) : (
                      <Text>?</Text>
                    )}
                  </Skeleton>
                </Td>
                <Td isNumeric>
                  <Skeleton isLoaded={!isFetching} borderRadius="md">
                    {twentyFourHPercentage ? (
                      <Text
                        color={
                          twentyFourHPercentage > 0 ? 'green.400' : 'red.500'
                        }
                      >
                        {twentyFourHPercentage.toFixed(2)}%
                      </Text>
                    ) : (
                      <Text>?</Text>
                    )}
                  </Skeleton>
                </Td>
                <Td isNumeric>
                  <Skeleton isLoaded={!isFetching} borderRadius="md">
                    {sevenDayPercentage ? (
                      <Text
                        color={sevenDayPercentage > 0 ? 'green.400' : 'red.500'}
                      >
                        {sevenDayPercentage.toFixed(2)}%
                      </Text>
                    ) : (
                      <Text>?</Text>
                    )}
                  </Skeleton>
                </Td>
                <Td isNumeric>
                  <Skeleton isLoaded={!isFetching} borderRadius="md">
                    {marketCap ? (
                      <Text>${formatNumber(marketCap)}</Text>
                    ) : (
                      <Text>?</Text>
                    )}
                  </Skeleton>
                </Td>
                <Td isNumeric>
                  <Skeleton isLoaded={!isFetching} borderRadius="md">
                    {totalVol ? (
                      <Text>${formatNumber(totalVol)}</Text>
                    ) : (
                      <Text>?</Text>
                    )}
                  </Skeleton>
                </Td>
                <Td isNumeric>
                  <Skeleton isLoaded={!isFetching} borderRadius="md">
                    {totalCirculatingSupply ? (
                      <Text noOfLines={1}>
                        {formatNumber(totalCirculatingSupply)}
                        <Text as="span" casing="uppercase" whiteSpace="normal">
                          &nbsp;{symbol}
                        </Text>
                      </Text>
                    ) : (
                      <Text>?</Text>
                    )}
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
