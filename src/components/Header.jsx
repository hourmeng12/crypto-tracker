import React from 'react';
import { Box, Flex, Heading, HStack } from '@chakra-ui/layout';
import Search from './Search';
import { useColorModeValue } from '@chakra-ui/color-mode';

const Header = () => {
  const borderColor = useColorModeValue('gray.100', 'gray.800');
  return (
    <Box borderY="1px" borderColor={borderColor}>
      <Flex
        maxW="8xl"
        mx="auto"
        px={4}
        py={2}
        align="center"
        justify="space-between"
      >
        <Heading as="h1" size="md" fontWeight="medium">
          Crypto Tracker
        </Heading>
        <HStack maxW={['50%', 'full']}>
          <Search />
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
