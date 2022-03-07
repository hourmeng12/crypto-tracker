import React from 'react';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { Box, Flex, LinkBox, LinkOverlay, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';
import { useColorModeValue } from '@chakra-ui/color-mode';

const CryptoNews = () => {
  const { data: newsData, isLoading } = useGetCryptoNewsQuery();
  const ligthColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Flex className="hide-scroll" w="full" overflow="auto" whiteSpace="nowrap">
      {!isLoading &&
        newsData.articles.map((news, index) => (
          <LinkBox
            key={index}
            display="inline-block"
            minW="280px"
            fontWeight="semibold"
            _notFirst={{ ml: 8 }}
          >
            <Box mb={4} h="136px" w="full">
              <Image
                borderRadius="md"
                loading="eager"
                h="full"
                w="full"
                objectFit="cover"
                src={news.urlToImage}
              />
            </Box>
            <Text color={ligthColor} fontSize="sm">
              {news.source.name}
            </Text>
            <Text noOfLines={2} fontSize="sm" whiteSpace="normal">
              <LinkOverlay href={news.url} isExternal>
                {news.title}
              </LinkOverlay>
            </Text>
          </LinkBox>
        ))}
    </Flex>
  );
};

export default CryptoNews;
