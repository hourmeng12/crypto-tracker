import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box, Container } from '@chakra-ui/layout';
import React from 'react';
import { Outlet } from 'react-router';
import Global from './Global';
import Header from './Header';

const Layout = () => {
  const bg = useColorModeValue('white', 'gray.900');
  const contentBg = useColorModeValue(
    'linear(to-b, gray.50 0%, white 2%)',
    'linear(to-b, gray.800 0%, gray.900 2%)'
  );
  return (
    <>
      <Box bg={bg}>
        <Global />
        <Header />
      </Box>
      <Box bgGradient={contentBg}>
        <Container maxW="8xl" minH="89vh" px={4} py={6}>
          <Outlet />
        </Container>
      </Box>
    </>
  );
};

export default Layout;
