import React from 'react';
import {
  Box,
  Flex,
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/layout';
import Search from './Search';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Link as RouterLink } from 'react-router-dom';

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
        <LinkBox>
          <LinkOverlay as={RouterLink} to="/">
            <Heading as="h1" size="md" fontWeight="medium">
              Crypto Tracker
            </Heading>
          </LinkOverlay>
        </LinkBox>
        <HStack maxW={['50%', 'full']}>
          <Search />
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
