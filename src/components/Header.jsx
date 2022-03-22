import React from 'react';
import {
  Box,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Stack,
} from '@chakra-ui/layout';
import Search from './Search';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Link as RouterLink } from 'react-router-dom';
import { Image } from '@chakra-ui/react';
import Logo from '../assets/logo.png';

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
            <Stack direction="row" align="center">
              <Image boxSize="30px" src={Logo} />
              <Heading
                as="h1"
                size={['sm', 'md', 'lg']}
                fontWeight="bold"
                color="brand.500"
              >
                Crypto Tracker
              </Heading>
            </Stack>
          </LinkOverlay>
        </LinkBox>
        <Stack maxW={['50%', 'full']}>
          <Search />
        </Stack>
      </Flex>
    </Box>
  );
};

export default Header;
